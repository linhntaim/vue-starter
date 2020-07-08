import {passportCookieStore} from '../../../utils'
import {APP_ROUTE} from '../../../config'
import {Middleware} from '@dsquare-gbu/vue-uses'

export default class AuthMiddleware extends Middleware {
    handle() {
        this.log('auth', 'middleware')

        this.handlePassport()
    }

    handlePassport() {
        const store = this.store()
        const storedPassport = passportCookieStore.retrieve()

        if (store.getters['account/isLoggedIn']) {
            if (!storedPassport.accessToken || !storedPassport.tokenType || !storedPassport.refreshToken || !storedPassport.tokenEndTime) {
                store.dispatch('account/storePassport')
            }

            this.handleAuth()
            return
        }

        if (!storedPassport.accessToken || !storedPassport.tokenType || !storedPassport.refreshToken || !storedPassport.tokenEndTime) {
            this.handleNotAuth()
            return
        }

        if ((new Date).getTime() <= storedPassport.tokenEndTime) {
            store.commit('account/setAuth', storedPassport)
            this.handleAuth()
            return
        }

        store.dispatch('account/refreshToken', {
            refreshToken: storedPassport.refreshToken,
            doneCallback: () => {
                this.handleAuth()
            },
            errorCallback: () => {
                this.redirect(this.router().getPathByName(APP_ROUTE.bad_request))
            },
        })
    }

    handleAuth() {
        this.log('authenticated', 'auth')

        if (this.replaceRoutesIfNeeded()) return

        const router = this.router()

        if (this.middlewareManager.to.matched.some(record => record.meta.requireNotAuth)) {
            this.redirect(router.getPathByName(APP_ROUTE.redirect_path_if_authenticated))
            return
        }

        this.store().dispatch('account/current', {
            doneCallback: () => {
                super.handle()
            },
            errorCallback: err => {
                if (this.middlewareManager.to.matched.some(record => record.meta.requireAuth)) {
                    this.redirect(router.getPathByName(APP_ROUTE.unauthenticated))
                    return
                }

                this.next()
            },
        })
    }

    handleNotAuth() {
        this.log('unauthenticated', 'auth')

        if (this.replaceRoutesIfNeeded(false)) return

        if (this.middlewareManager.to.matched.some(record => record.meta.requireAuth)) {
            this.redirect(this.router().getPathByName(APP_ROUTE.redirect_path_if_unauthenticated))
            return
        }

        this.store().dispatch('account/anonymous', {
            callback: () => this.next(),
        })
    }

    replaceRoutesIfNeeded(auth = true) {
        const router = this.router()
        if (auth ? router.switchToNotAuth() : router.switchToAuth()) {
            this.log('replaced', 'routes')

            this.redirect(this.middlewareManager.to.path, this.middlewareManager.to.query, this.middlewareManager.to.hash)
            return true
        }
        return false
    }
}
