/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

import {deviceCookieStore} from '../../../utils'
import {Middleware} from '../middleware'
import {APP_ROUTE} from '../../../config'

export class DeviceMiddleware extends Middleware {
    handle() {
        this.log('device', 'middleware')

        const store = this.store()

        if (store.getters['device/failed'] && this.to().name === APP_ROUTE.badRequest.name) {
            this.next()
            return
        }

        const session = this.session()
        const storedDevice = deviceCookieStore.retrieve()

        if (session.isNotFreshSequence() && store.getters['device/existed']) {
            if (!storedDevice.provider || !storedDevice.secret) {
                store.dispatch('device/device')
            }
            this.next()
            return
        }

        if (session.isFreshSequence() || !storedDevice.provider || !storedDevice.secret) {
            store.dispatch('device/current', {
                device: storedDevice,
                doneCallback: () => {
                    this.next()
                },
                errorCallback: () => {
                    store.dispatch('device/fails')
                    this.errorRedirect(APP_ROUTE.badRequest)
                },
            })
            return
        }

        this.next()
    }
}