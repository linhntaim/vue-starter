import axios from 'axios'
import {APP_DEFAULT_SERVICE} from '../config'

export const defaultService = 'axios'

export const services = {
    axios: {
        instance: axios.create({
            baseURL: APP_DEFAULT_SERVICE.base_url,
            headers: (() => {
                const headers = {}
                if (APP_DEFAULT_SERVICE.basic_auth) {
                    headers[APP_DEFAULT_SERVICE.headers.basic_authorization] = 'Basic ' + btoa(APP_DEFAULT_SERVICE.basic_auth)
                }
                return headers
            })(),
        }),
        instanceCallback: null,
        paramsCallback: {},
    },
}
