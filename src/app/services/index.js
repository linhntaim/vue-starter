/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

import {crypto} from '../utils'
import {defaultService, services} from './services'
import {ServiceFactory} from '@dsquare-gbu/vue-services'
import {APP_DEFAULT_SERVICE} from '../config'

export const serviceFactory = new ServiceFactory(services, defaultService)

export const defaultServiceModifyHeader = (name, value, permanent = false) => {
    serviceFactory.modify(defaultServiceInstance => defaultServiceInstance.addInstanceCallback(name, instance => {
        if (value) {
            if (typeof value !== 'string') {
                value = JSON.stringify(value)
            }

            if (name in instance.defaults.headers) {
                delete instance.defaults.headers[name]
            }
            instance.defaults.headers.common[name] =
                name === APP_DEFAULT_SERVICE.headerTokenAuthorization || APP_DEFAULT_SERVICE.headerEncryptExcepts.includes(name) ?
                    value : crypto.encrypt(value)
        } else {
            instance.defaults.headers.common[name] = null
            if (permanent) {
                instance.defaults.headers[name] = ''
            }
        }
        return instance
    }))
}