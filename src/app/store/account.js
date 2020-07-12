import {authService} from '../services/default/auth'
import {accountService} from '../services/default/account'
import {
    callbackWaiter,
    dateTimeHelper,
    log,
    numberFormatHelper,
    passportCookieStore,
    settingsCookieStore,
} from '../utils'
import {localeManager} from '../locales'
import {serviceFactory} from '../services/service_factory'
import {APP_DEFAULT_SERVICE, DEFAULT_SETTINGS} from '../config'

const setDefaultServiceSettingsHeader = settings => {
    serviceFactory.modify(defaultService => {
        defaultService.instance.defaults.headers.common[APP_DEFAULT_SERVICE.headers.settings] = JSON.stringify(settings)
    })
}

const applySettings = (settings, action, localeCallback = null) => {
    if (action === 'all' || action === 'store' || action === 'store_with_locale') {
        setDefaultServiceSettingsHeader(settings)
        settingsCookieStore.store(settings)
    }
    if (action === 'all' || action === 'store_with_locale') {
        localeManager.set(settings.locale).then(() => {
            localeCallback && localeCallback()
        })
    }
    if (action === 'all') {
        dateTimeHelper.localize(settings)
        numberFormatHelper.localize(settings)
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
        admin: null,
    },
    getters: {
        isLoggedIn: state => state.isLoggedIn,
        admin: state => state.admin,
        role: state => state.admin ? state.admin.role_name : null,
        permissions: state => state.admin && state.admin.permission_names ? state.admin.permission_names : [],
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
        setAuth(state, passport) {
            state.isLoggedIn = true
            state.passport = {
                accessToken: passport.access_token,
                tokenType: passport.token_type,
                refreshToken: passport.refresh_token,
                tokenEndTime: (new Date).getTime() + passport.expires_in * 1000,
            }

            serviceFactory.modify(defaultService => {
                defaultService.instance.defaults.headers.common[APP_DEFAULT_SERVICE.headers.token_authorization] = state.passport.tokenType + ' ' + state.passport.accessToken
            })
            passportCookieStore.store(state.passport)
        },

        setAuthFromCookie(state, passport) {
            state.isLoggedIn = true
            state.passport = passport

            serviceFactory.modify(defaultService => {
                defaultService.instance.defaults.headers.common[APP_DEFAULT_SERVICE.headers.token_authorization] = state.passport.tokenType + ' ' + state.passport.accessToken
            })
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

        setAdmin(state, {admin, localeCallback}) {
            state.admin = admin

            applySettings(state.admin.settings, 'all', localeCallback)
        },

        setLocale(state, {locale, callback}) {
            state.admin.settings.locale = locale

            applySettings(state.admin.settings, 'store_with_locale', callback)
        },

        setSettings(state, {settings, localeCallback}) {
            for (const key in settings) {
                state.admin.settings[key] = settings[key]
            }

            applySettings(state.admin.settings, 'all', localeCallback)
        },

        unsetAdmin(state) {
            if (state.admin && state.admin.settings) {
                state.admin = {
                    settings: state.admin.settings,
                }
            } else {
                const storedSettings = settingsCookieStore.retrieve()
                state.admin = {
                    settings: storedSettings ? storedSettings : DEFAULT_SETTINGS,
                }
            }

            applySettings(state.admin.settings, 'store')

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

            const storedSettings = settingsCookieStore.retrieve()
            commit('setAdmin', {
                admin: {
                    settings: storedSettings ? storedSettings : DEFAULT_SETTINGS,
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
            if (!state.admin || !state.admin.user_id || login) {
                callbackWaiter.remove('account_current')
            }
            callbackWaiter.call('account_current', () => { // tricky cache
                log.send('get current', 'store.account')
                accountService().current(login, (data) => {
                    commit('setAdmin', {
                        admin: data.model,
                    })
                    doneCallback()
                }, errorCallback)
            }, 10, () => {
                doneCallback({admin: state.admin})
            })
        },

        refreshToken({commit}, {refreshToken, doneCallback, errorCallback}) {
            authService().refreshToken(refreshToken, (data) => {
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

        updateLocale({commit}, {locale, doneCallback}) {
            commit('setLocale', {
                locale: locale,
                callback: doneCallback,
            })
        },

        updateAvatar({state}, {image, doneCallback, errorCallback}) {
            accountService().updateAvatar(image, (data) => {
                state.admin.url_avatar = data.model.url_avatar
                doneCallback()
            }, errorCallback)
        },

        updateInformation({state}, {params, doneCallback, errorCallback}) {
            accountService().updateInformation(params, (data) => {
                state.admin.display_name = data.model.display_name
                doneCallback()
            }, errorCallback)
        },

        updateEmail({state}, {email, currentPassword, doneCallback, errorCallback}) {
            accountService().updateEmail(email, currentPassword, (data) => {
                state.admin.email = data.model.email
                doneCallback()
            }, errorCallback)
        },

        updatePassword(store, {password, passwordConfirmation, currentPassword, doneCallback, errorCallback}) {
            accountService().updatePassword(password, passwordConfirmation, currentPassword, doneCallback, errorCallback)
        },
    },
}
