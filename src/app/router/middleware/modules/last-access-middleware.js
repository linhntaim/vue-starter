import {Middleware} from '@dsquare-gbu/vue-uses'
import {APP_ROUTE} from '@/app/config'

export default class LastAccessMiddleware extends Middleware {
    handle() {
        this.log('last-access', 'middleware')

        const to = this.to()
        if (to.name === APP_ROUTE.codeVerifyViaEmail.name || to.name === APP_ROUTE.codeVerifyViaPhoneNumber.name) {
            this.next()
            return
        }

        this.store().dispatch('account/updateLastAccess', {
            doneCallback: () => this.next(),
            errorCallback: () => this.next(),
        })
    }
}