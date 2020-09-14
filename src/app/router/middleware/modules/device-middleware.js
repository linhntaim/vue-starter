import {deviceCookieStore} from '../../../utils'
import {Middleware} from '@dsquare-gbu/vue-uses'
import {APP_ROUTE} from '../../../config'

export default class DeviceMiddleware extends Middleware {
    handle() {
        this.log('device', 'middleware')

        const store = this.store()

        if (store.getters['device/failed'] && this.to().name === APP_ROUTE.bad_request) {
            this.next()
            return
        }

        const session = this.session()
        const storedDevice = deviceCookieStore.retrieve()

        if (session.isNotFresh() && store.getters['device/existed']) {
            if (!storedDevice.provider || !storedDevice.secret) {
                store.dispatch('device/device')
            }
            this.next()
            return
        }

        if (session.isFresh() || !storedDevice.provider || !storedDevice.secret) {
            store.dispatch('device/current', {
                device: storedDevice,
                doneCallback: () => {
                    this.next()
                },
                errorCallback: () => {
                    store.dispatch('device/fails')
                    this.redirect({
                        name: APP_ROUTE.bad_request,
                    })
                },
            })
            return
        }

        this.next()
    }
}