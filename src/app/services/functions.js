/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

import {crypto} from '../utils'
import {serviceFactory} from './factory'
import {APP_DEFAULT_SERVICE} from '../config'

export const encryptHeader = (name, value) =>
    APP_DEFAULT_SERVICE.headerEncryptExcepts.includes(name) ?
        value : crypto.encryptBase64(value)

export const defaultServiceModifyHeader = (name, value, permanent = false) => {
    serviceFactory.modify(defaultServiceInstance => defaultServiceInstance.addInstanceCallback(name, instance => {
        if (value) {
            if (typeof value !== 'string') {
                value = JSON.stringify(value)
            }

            if (name in instance.defaults.headers) {
                delete instance.defaults.headers[name]
            }
            instance.defaults.headers.common[name] = encryptHeader(name, value)
        }
        else {
            instance.defaults.headers.common[name] = null
            if (permanent) {
                instance.defaults.headers[name] = ''
            }
        }
        return instance
    }))
}
