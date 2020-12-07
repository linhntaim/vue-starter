/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

import {crypto} from '@/app/utils'
import {defaultService, services} from './services'
import {ServiceFactory} from '@dsquare-gbu/vue-services'
import {APP_DEFAULT_SERVICE} from '@/app/config'

export const serviceFactory = new ServiceFactory(services, defaultService)

export const defaultServiceModifyHeader = (name, value) => {
    serviceFactory.modify(defaultServiceInstance => defaultServiceInstance.addInstanceCallback(name, instance => {
        if (typeof value !== 'string') {
            value = JSON.stringify(value)
        }
        instance.defaults.headers.common[name] =
            name === APP_DEFAULT_SERVICE.headerTokenAuthorization || APP_DEFAULT_SERVICE.headerEncryptExcepts.includes(name) ?
                value : crypto.encrypt(value)
        return instance
    }))
}