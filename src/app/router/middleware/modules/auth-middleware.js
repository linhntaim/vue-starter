/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

import {bearerTokenCookieStore, ui} from '../../../utils'
import {session} from '@linhntaim/vue-uses'
import {Middleware} from '../middleware'
import {APP_DEFAULT_SERVICE, APP_ROUTE} from '../../../config'

export class AuthMiddleware extends Middleware {
    handle() {
        this.log('auth', 'middleware')

        this.autoUnauthenticatedTimeout = null

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

            if (this.tryToRefreshToken(
                () => this.handleAuth(),
                () => {
                    bearerTokenCookieStore.remove()
                    this.errorRedirect(APP_ROUTE.badRequest)
                },
            )) {
                return
            }
        }

        this.handleNotAuth()
    }

    tryToRefreshToken(doneCallback = null, errorCallback = null, beforeRefreshCallback = null) {
        if (APP_DEFAULT_SERVICE.tokenRefreshEnabled) {
            const storedBearerToken = bearerTokenCookieStore.retrieve()
            if (storedBearerToken.refreshToken) {
                beforeRefreshCallback && beforeRefreshCallback()
                this.store().dispatch('account/refreshToken', {
                    refreshToken: storedBearerToken.refreshToken,
                    doneCallback: doneCallback,
                    errorCallback: errorCallback,
                })
                return true
            }
        }
        return false
    }

    autoLogout() {
        const bearerTokenExpiresAt = session.retrieve('bearer_token_expires_at')
        const expiresIn = bearerTokenExpiresAt - new Date().getTime() - APP_DEFAULT_SERVICE.tokenAutoRevokeBefore
        const logout = () => {
            this.autoUnauthenticatedTimeout = null

            if (this.tryToRefreshToken(
                () => this.autoLogout(),
                () => ui.reloadPage(),
            )) {
                return
            }

            this.store().dispatch('account/logout', {
                alwaysCallback: () => {
                    session.restart()
                    this.redirect(APP_ROUTE.redirectAfterUnauthenticated)
                    this.bus().emit('logout')
                },
            })
        }
        if (expiresIn <= 0) {
            logout()
            return true
        }

        if (!this.autoUnauthenticatedTimeout) {
            this.autoUnauthenticatedTimeout = setTimeout(logout, expiresIn)
        }
        return false
    }

    handleAuth() {
        this.log('authenticated', 'auth')

        if (this.autoLogout()) {
            return
        }

        if (this.replaceRoutesIfNeeded()) {
            return
        }

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

        if (this.replaceRoutesIfNeeded(false)) {
            return
        }

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
