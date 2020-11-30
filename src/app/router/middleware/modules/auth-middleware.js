/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

import {bearerTokenCookieStore} from '../../../utils'
import {session} from '@dsquare-gbu/vue-router'
import {Middleware} from '@dsquare-gbu/vue-uses'
import {APP_ROUTE} from '../../../config'

export default class AuthMiddleware extends Middleware {
    handle() {
        this.log('auth', 'middleware')

        this.handleBearerToken()
    }

    handleBearerToken() {
        const store = this.store()
        const storedBearerToken = bearerTokenCookieStore.retrieve()

        if (store.getters['account/isLoggedIn']) {
            if (!storedBearerToken
                || !storedBearerToken.accessToken
                || !storedBearerToken.tokenType
                || !storedBearerToken.expiresIn) {
                store.dispatch('account/storeBearerToken')
            }

            this.handleAuth()
            return
        }

        if (storedBearerToken) {
            if (storedBearerToken.accessToken
                && storedBearerToken.tokenType
                && storedBearerToken.expiresIn) {
                store.commit('account/setAuthFromCookie', storedBearerToken)
                this.handleAuth()
                return
            }

            if (storedBearerToken.refreshToken) {
                store.dispatch('account/refreshToken', {
                    refreshToken: storedBearerToken.refreshToken,
                    doneCallback: () => this.handleAuth(),
                    errorCallback: () => this.redirect(APP_ROUTE.badRequest),
                })
                return
            }
        }

        this.handleNotAuth()
    }

    handleAuth() {
        this.log('authenticated', 'auth')

        if (this.replaceRoutesIfNeeded()) return

        if (this.to().matched.some(record => record.meta.requireNotAuth)) {
            this.redirect(APP_ROUTE.redirectIfAuthenticated)
            return
        }

        this.store().dispatch('account/current', {
            doneCallback: () => this.next(),
            errorCallback: () => {
                if (this.to().matched.some(record => record.meta.requireAuth)) {
                    this.redirect(APP_ROUTE.unauthenticated)
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
            const rdrLocation = {
                path: this.to().fullPath,
            }
            this.log(JSON.stringify(rdrLocation), 'auth.unauthenticated.redirect_after_authenticated')
            session.flash('redirect_after_authenticated', rdrLocation)
            this.redirect(APP_ROUTE.redirectIfUnauthenticated)
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
