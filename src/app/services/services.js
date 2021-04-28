/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

import {encryptHeader} from './functions'
import {AxiosServiceInstance} from '@linhntaim/vue-services'
import {APP_CLIENT, APP_DEFAULT_SERVICE} from '../config'

export const defaultService = 'axios'

export const services = {
    axios: new AxiosServiceInstance({
        baseURL: APP_DEFAULT_SERVICE.baseUrl,
        headers: (() => {
            const headers = {}
            if (APP_DEFAULT_SERVICE.hasBasicAuth) {
                headers['Authorization'] = 'Basic ' + btoa(APP_DEFAULT_SERVICE.basicAuth)
            }
            if (APP_DEFAULT_SERVICE.headerClientIdEnabled) {
                headers[APP_DEFAULT_SERVICE.headers.clientId] = encryptHeader(APP_CLIENT)
            }
            return headers
        })(),
    }),
}
