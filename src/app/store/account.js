import {authService} from '../services/default/auth'
import {accountService} from '../services/default/account'
import {
    callbackWaiter,
    dateTimer,
    log,
    numberFormatter,
    passportCookieStore,
    settingsCookieStore,
} from '../utils'
import {localeManager} from '../locales'
import {serviceFactory} from '../services'
import {APP_DEFAULT_SERVICE} from '../config'
import {passwordAdminService} from '../services/default/admin-password'

const setDefaultServiceSettingsHeader = settings => {
    serviceFactory.modify(defaultServiceInstance => defaultServiceInstance.addInstanceCallback('settings', instance => {
        instance.defaults.headers.common[APP_DEFAULT_SERVICE.headers.settings] = JSON.stringify({
            app_name: settings.appName,
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

const applyPassport = (passport = null, action = 'all') => {
    setDefaultServiceTokenAuthorizationHeader(passport ? passport.tokenType + ' ' + passport.accessToken : null)
    if (action !== 'apply_no_cookie') {
        passport ? passportCookieStore.store(passport) : passportCookieStore.remove()
    }
}

export default {
    namespaced: true,
    state: () => ({
        isLoggedIn: false,
        passport: {
            accessToken: null,
            tokenType: null,
            refreshToken: null,
            tokenEndTime: 0,
        },
        admin: null,
        settings: {},
    }),
    getters: {
        isLoggedIn: state => state.isLoggedIn,
        admin: state => state.admin,
        settings: state => state.settings,
        locale: state => state.settings.locale,
        role: state => state.admin ? state.admin.role_name : null,
        permissions: state => state.admin && state.admin.permission_names ? state.admin.permission_names : [],
        passport: state => state.passport,
        authorizationHeader: state => state.passport.tokenType + ' ' + state.passport.accessToken,
        authorizationQueryString: state => [
            APP_DEFAULT_SERVICE.requestParams.tokenType + '=' + state.passport.tokenType,
            APP_DEFAULT_SERVICE.requestParams.accessToken + '=' + state.passport.accessToken,
        ].join('&'),
    },
    mutations: {
        setAuth(state, passport) {
            state.isLoggedIn = true
            state.passport = {
                accessToken: passport.access_token,
                tokenType: passport.token_type,
                refreshToken: passport.refresh_token,
                tokenEndTime: (new Date).getTime() + passport.expires_in * 1000,
            }

            applyPassport(state.passport)
        },

        setAuthFromCookie(state, passport) {
            state.isLoggedIn = true
            state.passport = passport

            applyPassport(state.passport, 'apply_no_cookie')
        },

        unsetAuth(state) {
            state.isLoggedIn = false
            state.passport = {
                accessToken: null,
                tokenType: null,
                refreshToken: null,
                tokenEndTime: 0,
            }

            applyPassport()
        },

        setAdmin(state, {admin}) {
            state.admin = admin
        },

        unsetAdmin(state) {
            state.admin = null

            callbackWaiter.remove('account_current')
        },

        setLocale(state, {locale, callback}) {
            state.settings.locale = locale

            applySettings(state.settings, 'apply_with_locale', callback)
        },

        setSettings(state, {settings, localeCallback}) {
            state.settings = {
                appName: settings.app_name,
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
    },
    actions: {
        storePassport({state}) {
            passportCookieStore.store(state.passport)
        },

        reload({dispatch}, {doneCallback, errorCallback}) {
            callbackWaiter.remove('account_current')
            dispatch('current', {
                doneCallback: doneCallback,
                errorCallback: errorCallback,
            })
        },

        current({commit, state}, {login, doneCallback, errorCallback}) {
            if (!state.admin || !state.admin.user_id || login) {
                callbackWaiter.remove('account_current')
            }
            callbackWaiter.call('account_current', () => { // tricky cache
                log.send('get current', 'store.account')
                accountService().current(login, data => {
                    const settings = data.model.settings
                    delete data.model.settings
                    commit('setAdmin', {
                        admin: data.model,
                    })
                    commit('setSettings', {
                        settings: settings,
                    })
                    doneCallback()
                }, errorCallback)
            }, 10, () => {
                doneCallback({admin: state.admin})
            })
        },

        refreshToken({commit}, {refreshToken, doneCallback, errorCallback}) {
            authService().refreshToken(refreshToken, data => {
                commit('setAuth', data)
                doneCallback()
            }, errorCallback)
        },

        login({commit, dispatch}, {email, password, token, doneCallback, errorCallback}) {
            const done = data => {
                commit('setAuth', data)
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

        logout({commit}, {alwaysCallback}) {
            authService().logout(null, null, () => {
                commit('unsetAuth')
                commit('unsetAdmin')

                alwaysCallback()
            })
        },

        forgotPassword(store, {email, appResetPasswordPath, doneCallback, errorCallback}) {
            passwordAdminService().forgot(email, appResetPasswordPath, doneCallback, errorCallback)
        },

        getResetPassword(store, {token, doneCallback, errorCallback}) {
            passwordAdminService().getReset({
                token: token,
            }, doneCallback, errorCallback)
        },

        resetPassword(store, {email, token, password, passwordConfirmation, doneCallback, errorCallback}) {
            passwordAdminService().reset({
                email: email,
                token: token,
                password: password,
                password_confirmation: passwordConfirmation,
            }, doneCallback, errorCallback)
        },

        updateLocale({commit}, {locale, doneCallback}) {
            commit('setLocale', {
                locale: locale,
                callback: doneCallback,
            })
        },

        updateAvatar({state}, {image, doneCallback, errorCallback}) {
            accountService().updateAvatar(image, data => {
                state.admin.avatar_url = data.model.avatar_url
                doneCallback()
            }, errorCallback)
        },

        updateAvatarByHandledFile({state}, {fileId, doneCallback, errorCallback}) {
            accountService().updateAvatarByHandledFile(fileId, data => {
                state.admin.avatar_url = data.model.avatar_url
                doneCallback()
            }, errorCallback)
        },

        updateInformation({state}, {params, doneCallback, errorCallback}) {
            accountService().updateInformation(params, data => {
                state.admin.display_name = data.model.display_name
                doneCallback()
            }, errorCallback)
        },

        updateEmail({state}, {email, currentPassword, doneCallback, errorCallback}) {
            accountService().updateEmail(email, currentPassword, data => {
                state.admin.user.email = data.model.email
                doneCallback()
            }, errorCallback)
        },

        updatePassword({state}, {password, passwordConfirmation, currentPassword, doneCallback, errorCallback}) {
            accountService().updatePassword(password, passwordConfirmation, currentPassword, data => {
                state.admin.user.has_password = data.model.has_password
                doneCallback()
            }, errorCallback)
        },
    },
}
