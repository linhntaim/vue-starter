/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

import {accountService} from '../services/default/account'
import {authService} from '../services/default/auth'
import {
    bearerTokenCookieStore,
    callbackWaiter,
    dateTimer,
    log,
    numberFormatter,
    settingsCookieStore,
} from '../utils'
import {localeManager} from '../locales'
import {serviceFactory} from '../services'
import {APP_DEFAULT_SERVICE} from '../config'

const setDefaultServiceSettingsHeader = settings => {
    serviceFactory.modify(defaultServiceInstance => defaultServiceInstance.addInstanceCallback('settings', instance => {
        instance.defaults.headers.common[APP_DEFAULT_SERVICE.headers.settings] = JSON.stringify({
            app_id: settings.appId,
            app_url: settings.appUrl,
            locale: settings.locale,
            country: settings.country,
            timezone: settings.timezone,
            currency: settings.currency,
            number_format: settings.numberFormat,
            first_day_of_week: settings.firstDayOfWeek,
            long_date_format: settings.longDateFormat,
            short_date_format: settings.shortDateFormat,
            long_time_format: settings.longTimeFormat,
            short_time_format: settings.shortTimeFormat,
        })
        return instance
    }))
}

const setDefaultServiceTokenAuthorizationHeader = token => {
    serviceFactory.modify(defaultServiceInstance => defaultServiceInstance.addInstanceCallback('authorization', instance => {
        instance.defaults.headers.common[APP_DEFAULT_SERVICE.headers.tokenAuthorization] = token
        return instance
    }))
}

const applySettings = (settings, action = 'all', localeCallback = null) => {
    if (action === 'all' || action === 'apply' || action === 'apply_with_locale') {
        setDefaultServiceSettingsHeader(settings)
        settingsCookieStore.store(settings)
    }
    if (action === 'all' || action === 'apply_with_locale') {
        localeManager.set(settings.locale).then(() => {
            localeCallback && localeCallback()
        })
    }
    if (action === 'all') {
        dateTimer.apply(settings)
        numberFormatter.apply(settings)
    }
}

const applyBearerToken = (bearerToken = null, action = 'all') => {
    setDefaultServiceTokenAuthorizationHeader(bearerToken ? bearerToken.tokenType + ' ' + bearerToken.accessToken : null)
    if (action !== 'apply_no_cookie') {
        bearerToken ? bearerTokenCookieStore.store(bearerToken) : bearerTokenCookieStore.remove()
    }
}

export default {
    namespaced: true,
    state: () => ({
        isLoggedIn: false,
        bearerToken: {
            accessToken: null,
            tokenType: null,
            refreshToken: null,
            expiresIn: 0,
        },
        accountMatched: false,
        account: null,
        impersonator: null,
        impersonated: false,
        settings: {},
    }),
    getters: {
        isLoggedIn: state => state.isLoggedIn,
        account: state => state.account,
        accountMatched: state => state.accountMatched,
        impersonator: state => state.impersonator,
        impersonated: state => state.impersonated,
        settings: state => state.settings,
        locale: state => state.settings.locale,
        permissions: state => state.account && state.account.permission_names ? state.account.permission_names : [],
        bearerToken: state => state.bearerToken,
        authorizationHeader: state => state.bearerToken.tokenType + ' ' + state.bearerToken.accessToken,
        authorizationQueryString: state => [
            APP_DEFAULT_SERVICE.requestParams.tokenType + '=' + state.bearerToken.tokenType,
            APP_DEFAULT_SERVICE.requestParams.accessToken + '=' + state.bearerToken.accessToken,
        ].join('&'),
    },
    mutations: {
        setAuth(state, bearerToken) {
            state.isLoggedIn = true
            state.bearerToken = {
                accessToken: bearerToken.access_token,
                tokenType: bearerToken.token_type,
                refreshToken: bearerToken.refresh_token,
                expiresIn: bearerToken.expires_in,
            }

            applyBearerToken(state.bearerToken)
        },

        setAuthFromCookie(state, bearerToken) {
            state.isLoggedIn = true
            state.bearerToken = bearerToken

            applyBearerToken(state.bearerToken, 'apply_no_cookie')
        },

        unsetAuth(state) {
            state.isLoggedIn = false
            state.bearerToken = {
                accessToken: null,
                tokenType: null,
                refreshToken: null,
                expiresIn: 0,
            }

            applyBearerToken()
        },

        setAccount(state, {account}) {
            state.accountMatched = true
            state.account = account
        },

        unsetAccount(state) {
            state.accountMatched = false
            state.account = null

            callbackWaiter.remove('account_current')
        },

        setImpersonator(state, {impersonator}) {
            state.impersonator = impersonator
            state.impersonated = true
        },

        unsetImpersonator(state) {
            state.impersonator = null
            state.impersonated = false
        },

        setSettings(state, {settings, localeCallback}) {
            state.settings = {
                appId: settings.app_id,
                appUrl: settings.app_url,
                locale: settings.locale,
                country: settings.country,
                timezone: settings.timezone,
                currency: settings.currency,
                numberFormat: settings.number_format,
                firstDayOfWeek: settings.first_day_of_week,
                longDateFormat: settings.long_date_format,
                shortDateFormat: settings.short_date_format,
                longTimeFormat: settings.long_time_format,
                shortTimeFormat: settings.short_time_format,
            }

            applySettings(state.settings, 'all', localeCallback)
        },

        setSettingsFromCookie(state, {settings, localeCallback}) {
            state.settings = settings

            applySettings(state.settings, 'all', localeCallback)
        },

        setLocale(state, {locale, callback}) {
            state.settings.locale = locale

            applySettings(state.settings, 'apply_with_locale', callback)
        },
    },
    actions: {
        storeBearerToken({state}) {
            bearerTokenCookieStore.store(state.bearerToken)
        },

        reload({dispatch}, {doneCallback, errorCallback}) {
            callbackWaiter.remove('account_current')
            dispatch('current', {
                doneCallback: doneCallback,
                errorCallback: errorCallback,
            })
        },

        current({commit, state}, {login, doneCallback, errorCallback}) {
            if (!state.account || (!state.account.id && !state.account.user_id) || login) {
                callbackWaiter.remove('account_current')
            }
            callbackWaiter.call('account_current', () => { // tricky cache
                log.send('get current', 'store.account')
                accountService().current(login, data => {
                    const settings = data.model.settings
                    delete data.model.settings
                    commit('setAccount', {
                        account: data.model,
                    })
                    commit('setSettings', {
                        settings: settings,
                    })
                    if (data.impersonator) {
                        commit('setImpersonator', {
                            impersonator: data.impersonator,
                        })
                    }
                    doneCallback()
                }, errorCallback)
            }, 10, () => {
                doneCallback({account: state.account})
            })
        },

        refreshToken({commit}, {refreshToken, doneCallback, errorCallback}) {
            authService().refreshToken(refreshToken, data => {
                commit('setAuth', data)
                doneCallback()
            }, errorCallback)
        },

        logout({commit}, {alwaysCallback}) {
            authService().logout(null, null, () => {
                commit('unsetAuth')
                commit('unsetAccount')
                commit('unsetImpersonator')

                alwaysCallback()
            })
        },

        login({commit, dispatch}, {email, password, impersonateToken, doneCallback, errorCallback}) {
            const done = data => {
                commit('setAuth', data)
                dispatch('current', {
                    login: true,
                    doneCallback: doneCallback,
                    errorCallback: errorCallback,
                })
            }
            if (impersonateToken) {
                authService().loginWithImpersonate(email, impersonateToken, done, errorCallback)
            } else {
                authService().login(email, password, done, errorCallback)
            }
        },

        loginOther({commit, dispatch}, {params, doneCallback, errorCallback}) {
            const done = data => {
                commit('setAuth', data)
                dispatch('current', {
                    login: true,
                    doneCallback: doneCallback,
                    errorCallback: errorCallback,
                })
            }
            authService().loginOther(params, done, errorCallback)
        },

        updateLastAccess({state}, {doneCallback, errorCallback}) {
            if (!state.isLoggedIn) {
                doneCallback()
                return
            }

            accountService().updateLastAccess(data => {
                state.account.last_accessed_since_6_month = data.model.last_accessed_since_6_month
                state.account.sd_st_last_accessed_at = data.model.sd_st_last_accessed_at
                doneCallback()
            }, errorCallback)
        },

        updateLocale({commit}, {locale, doneCallback}) {
            commit('setLocale', {
                locale: locale,
                callback: doneCallback,
            })
        },

        updateEmail({state}, {email, currentPassword, doneCallback, errorCallback}) {
            accountService().updateEmail(email, currentPassword, data => {
                state.account.user.email = data.model.email
                doneCallback()
            }, errorCallback)
        },

        updatePassword({state}, {password, passwordConfirmation, currentPassword, doneCallback, errorCallback}) {
            accountService().updatePassword(password, passwordConfirmation, currentPassword, data => {
                state.account.user.has_password = data.model.has_password
                doneCallback()
            }, errorCallback)
        },

        // TODO:
        //  Implement extra actions

        // TODO
    },
}
