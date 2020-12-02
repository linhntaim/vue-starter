import {Middleware} from '@dsquare-gbu/vue-uses'

export default class LastAccessMiddleware extends Middleware {
    handle() {
        this.log('last-access', 'middleware')

        this.store().dispatch('account/updateLastAccess', {
            doneCallback: () => this.next(),
            errorCallback: () => this.next(),
        })
    }
}