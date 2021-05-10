/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

import {Middleware} from '../middleware'

export class LastAccessMiddleware extends Middleware {
    handle() {
        this.log('last-access', 'middleware')

        const store = this.store()
        if (store.getters['account/isLoggedIn']) {
            const account = store.getters['account/account']
            if (account) {
                // update last accessed at every 5 minutes
                if (new Date().getTime() - account.ts_last_accessed_at * 1000 > 5 * 60 * 1000) {
                    this.store().dispatch('account/updateLastAccess', {
                        doneCallback: () => this.next(),
                        errorCallback: () => this.next(),
                    })
                    return
                }
            }
        }
        this.next()
    }
}