import axios from 'axios'
import {APP_DEFAULT_SERVICE} from '../config'

export const defaultService = 'axios'

export const services = {
    axios: {
        instance: axios.create({
            baseURL: APP_DEFAULT_SERVICE.baseUrl,
            headers: (() => {
                const headers = {}
                if (APP_DEFAULT_SERVICE.hasBasicAuth) {
                    headers['Authorization'] = 'Basic ' + btoa(APP_DEFAULT_SERVICE.basicAuth)
                }
                return headers
            })(),
        }),
        instanceCallback: null,
        paramsCallback: {},
    },
}
