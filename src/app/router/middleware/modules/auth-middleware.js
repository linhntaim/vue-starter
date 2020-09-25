/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

import {passportCookieStore} from '../../../utils'
import {Middleware} from '@dsquare-gbu/vue-uses'
import {APP_ROUTE} from '../../../config'

export default class AuthMiddleware extends Middleware {
    handle() {
        this.log('auth', 'middleware')

        this.handlePassport()
    }

    handlePassport() {
        const store = this.store()
        const storedPassport = passportCookieStore.retrieve()

        if (store.getters['account/isLoggedIn']) {
            if (!storedPassport
                || !storedPassport.accessToken
                || !storedPassport.tokenType
                || !storedPassport.refreshToken
                || !storedPassport.tokenEndTime) {
                store.dispatch('account/storePassport')
            }

            this.handleAuth()
            return
        }

        if (!storedPassport
            || !storedPassport.accessToken
            || !storedPassport.tokenType
            || !storedPassport.refreshToken
            || !storedPassport.tokenEndTime) {
            this.handleNotAuth()
            return
        }

        if ((new Date).getTime() <= storedPassport.tokenEndTime) {
            store.commit('account/setAuthFromCookie', storedPassport)
            this.handleAuth()
            return
        }

        store.dispatch('account/refreshToken', {
            refreshToken: storedPassport.refreshToken,
            doneCallback: () => this.handleAuth(),
            errorCallback: () => this.redirect({
                name: APP_ROUTE.bad_request,
            }),
        })
    }

    handleAuth() {
        this.log('authenticated', 'auth')

        if (this.replaceRoutesIfNeeded()) return

        if (this.to().matched.some(record => record.meta.requireNotAuth)) {
            this.redirect({
                name: APP_ROUTE.redirect_path_if_authenticated,
            })
            return
        }

        this.store().dispatch('account/current', {
            doneCallback: () => this.next(),
            errorCallback: () => {
                if (this.to().matched.some(record => record.meta.requireAuth)) {
                    this.redirect({
                        name: APP_ROUTE.unauthenticated,
                    })
                    return
                }

                this.next()
            },
        })
    }

    handleNotAuth() {
        this.log('unauthenticated', 'auth')

        if (this.replaceRoutesIfNeeded(false)) return

        if (this.to().matched.some(record => record.meta.requireAuth)) {
            this.redirect({
                name: APP_ROUTE.redirect_path_if_unauthenticated,
            })
            return
        }

        this.next()
    }

    replaceRoutesIfNeeded(auth = true) {
        const router = this.router()
        if (auth ? router.switchToNotAuth() : router.switchToAuth()) {
            this.log('replaced', 'routes')

            const to = this.to()
            this.redirect({
                path: to.path,
                query: to.query,
                hash: to.hash,
            })
            return true
        }
        return false
    }
}
