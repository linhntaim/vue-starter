import {authService} from '../../services/default/auth'
import {accountService} from '../../services/default/account'
import {callbackWaiter} from '../../utils/callback_waiter'
import {dateTimeHelper} from '../../utils/date_time_helper'
import {localizer} from '../../utils/localizer'
import {log} from '../../utils/log'
import {numberFormatHelper} from '../../utils/number_format_helper'
import {serviceFactory} from '../../services/service_factory'
import {APP_DEFAULT_SERVICE, DEFAULT_LOCALIZATION} from '../../config'
import helpers from '../../utils/helpers'
import localizationCookieStore from '../../utils/cookie_store/localization_cookie_store'
import passportCookieStore from '../../utils/cookie_store/passport_cookie_store'

const setDefaultServiceLocalizationHeader = localization => {
    serviceFactory.modify(defaultService => {
        defaultService.instance.defaults.headers.common[APP_DEFAULT_SERVICE.headers.localization] = JSON.stringify(helpers.object.only(
            [
                '_from_app',
                '_ts',
                'locale',
                'country',
                'timezone',
                'currency',
                'number_format',
                'first_day_of_week',
                'long_date_format',
                'long_time_format',
                'short_date_format',
                'short_time_format',
            ],
            localization,
        ))
    })
}

const localize = (localization, action, localeCallback = null) => {
    if (action === 'all' || action === 'store' || action === 'store_with_locale') {
        setDefaultServiceLocalizationHeader(localization)
        localizationCookieStore.store(localization)
    }
    if (action === 'all' || action === 'store_with_locale') {
        localizer.localize(localization).then(() => {
            localeCallback && localeCallback()
        })
    }
    if (action === 'all') {
        dateTimeHelper.localize(localization)
        numberFormatHelper.localize(localization)
    }
}

export default {
    namespaced: true,
    state: {
        isLoggedIn: false,
        passport: {
            accessToken: null,
            tokenType: null,
            refreshToken: null,
            tokenEndTime: 0,
        },
        user: null,
    },
    getters: {
        isLoggedIn: state => state.isLoggedIn,
        user: state => state.user,
        roles: state => state.user ? state.user.role_names : null,
        permissions: state => state.user && state.user.permission_names ? state.user.permission_names : [],
        passport: state => {
            return {
                accessToken: state.passport.accessToken,
                tokenType: state.passport.tokenType,
                refreshToken: state.passport.refreshToken,
                tokenEndTime: state.passport.tokenEndTime,
            }
        },
    },
    mutations: {
        setAuth(state, {accessToken, tokenType, refreshToken, tokenEndTime}) {
            state.isLoggedIn = true
            state.passport = {
                accessToken: accessToken,
                tokenType: tokenType,
                refreshToken: refreshToken,
                tokenEndTime: tokenEndTime,
            }

            let authorizationHeader = tokenType + ' ' + accessToken
            serviceFactory.modify(defaultService => {
                defaultService.instance.defaults.headers.common[APP_DEFAULT_SERVICE.headers.token_authorization] = authorizationHeader
            })

            passportCookieStore.store(state.passport)
        },

        unsetAuth(state) {
            state.isLoggedIn = false
            state.passport = {
                accessToken: null,
                tokenType: null,
                refreshToken: null,
                tokenEndTime: 0,
            }

            serviceFactory.modify(defaultService => {
                defaultService.instance.defaults.headers.common[APP_DEFAULT_SERVICE.headers.token_authorization] = null
            })

            passportCookieStore.remove()
        },

        setUser(state, {user, localeCallback}) {
            state.user = user

            localize(state.user.localization, 'all', localeCallback)
        },

        setLocale(state, {locale, callback}) {
            if (locale != state.user.localization.locale) {
                state.user.localization._ts = 0
            }
            state.user.localization.locale = locale

            localize(state.user.localization, 'store_with_locale', callback)
        },

        setLocalization(state, {localization, localeCallback}) {
            for (let key in localization) {
                if (key == 'locale' && localization.locale != state.user.localization.locale) {
                    state.user.localization._ts = 0
                }
                state.user.localization[key] = localization[key]
            }

            localize(state.user.localization, 'all', localeCallback)
        },

        unsetUser(state) {
            if (state.user && state.user.localization) {
                state.user = {
                    localization: state.user.localization,
                }
            } else {
                let storedLocalization = localizationCookieStore.retrieve()
                state.user = {
                    localization: storedLocalization ? storedLocalization : DEFAULT_LOCALIZATION,
                }
            }

            state.user.localization._from_app = true
            state.user.localization._ts = 0

            localize(state.user.localization, 'store')

            callbackWaiter.remove('account_current')
        },
    },
    actions: {
        storePassport({state}) {
            passportCookieStore.store(state.passport)
        },

        anonymous({commit, state}, {callback}) {
            if (state.isLoggedIn) {
                callback && callback()
                return
            }

            let storedLocalization = localizationCookieStore.retrieve()
            commit('setUser', {
                user: {
                    localization: storedLocalization ? storedLocalization : DEFAULT_LOCALIZATION,
                },
                localeCallback: callback,
            })
        },

        reload({dispatch}, {doneCallback, errorCallback}) {
            callbackWaiter.remove('account_current')
            dispatch('current', {
                doneCallback: doneCallback,
                errorCallback: errorCallback,
            })
        },

        current({commit, state}, {login, doneCallback, errorCallback}) {
            if (!state.user || !state.user.id || login) {
                callbackWaiter.remove('account_current')
            }
            callbackWaiter.call('account_current', () => { // tricky cache
                log.write('get account', 'store')
                accountService().current(login, (data) => {
                    commit('setUser', {
                        user: data.model,
                    })
                    doneCallback()
                }, errorCallback)
            }, 10, () => {
                doneCallback({user: state.user})
            })
        },

        updateLocale({commit}, {locale, doneCallback}) {
            commit('setLocale', {
                locale: locale,
                callback: doneCallback,
            })
        },

        updateAvatar({state}, {image, doneCallback, errorCallback}) {
            accountService().updateAvatar(image, (data) => {
                state.user.url_avatar = data.model.url_avatar
                doneCallback()
            }, errorCallback)
        },

        updateInformation({state}, {params, doneCallback, errorCallback}) {
            accountService().updateInformation(params, (data) => {
                state.user.display_name = data.model.display_name
                doneCallback()
            }, errorCallback)
        },

        updateEmail({state}, {email, currentPassword, doneCallback, errorCallback}) {
            accountService().updateEmail(email, currentPassword, (data) => {
                state.user.email = data.model.email
                doneCallback()
            }, errorCallback)
        },

        updatePassword(store, {password, passwordConfirmation, currentPassword, doneCallback, errorCallback}) {
            accountService().updatePassword(password, passwordConfirmation, currentPassword, doneCallback, errorCallback)
        },

        refreshToken({commit}, {refreshToken, doneCallback, errorCallback}) {
            authService().refreshToken(refreshToken, (data) => {
                commit('setAuth', passportCookieStore.convert(data))
                doneCallback()
            }, errorCallback)
        },

        logout({commit}, {alwaysCallback}) {
            authService().logout(null, null, () => {
                commit('unsetAuth')
                commit('unsetUser')

                alwaysCallback()
            })
        },

        login({commit, dispatch}, {email, password, token, doneCallback, errorCallback}) {
            let done = (data) => {
                commit('setAuth', passportCookieStore.convert(data))
                dispatch('current', {
                    login: true,
                    doneCallback: doneCallback,
                    errorCallback: errorCallback,
                })
            }
            if (token) {
                authService().loginWithToken(email, done, errorCallback)
            } else {
                authService().login(email, password, done, errorCallback)
            }
        },

        forgotPassword(store, {email, appResetPasswordPath, doneCallback, errorCallback}) {
            authService().forgotPassword(email, appResetPasswordPath, doneCallback, errorCallback)
        },

        getResetPassword(store, {email, token, doneCallback, errorCallback}) {
            authService().getResetPassword({
                email: email,
                token: token,
            }, doneCallback, errorCallback)
        },

        resetPassword(store, {email, token, password, passwordConfirmation, doneCallback, errorCallback}) {
            authService().resetPassword({
                email: email,
                token: token,
                password: password,
                password_confirmation: passwordConfirmation,
            }, doneCallback, errorCallback)
        },
    },
}
