/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

import {serviceFactory} from './index'
import {AxiosService, ServiceError} from '@linhntaim/vue-services'

export class DefaultServiceError extends ServiceError {
    constructor(err, extra = null) {
        super(err)

        this.extra = extra
    }

    getMessages(defaults = {}) {
        if (this.err.e) {
            const err = this.err.e
            if (err.response) {
                const response = err.response
                if (response.statusText) {
                    return [response.statusText]
                }
                switch (response.status) {
                    case 401:
                        return [defaults['401'] ? defaults['401'] : 'Unauthenticated!']
                    case 403:
                        return [defaults['403'] ? defaults['403'] : 'Forbidden error!']
                    case 404:
                        return [defaults['404'] ? defaults['404'] : 'Not found!']
                    case 500:
                        return [defaults['500'] ? defaults['500'] : 'Application error!']
                    case 503:
                        return [defaults['503'] ? defaults['503'] : 'Service unavailable!']
                }
            }
            if (err.message) {
                return [err.message]
            }
            return [defaults['0'] ? defaults['0'] : 'Something went wrong!']
        }
        return this.err.m
    }

    getExtra() {
        return this.extra
    }
}

export class DefaultService extends AxiosService {
    constructor(basePath = null) {
        super(serviceFactory.factory(), basePath)
    }

    e() {
        this.serviceInstance.addParamsCallback('e', params => this.appendParam(params, '_e', 1))
    }

    es() {
        this.serviceInstance.addParamsCallback('es', params => this.appendParam(params, '_es', 1))
    }

    d() {
        this.serviceInstance.removeParamsCallback('e')
            .removeParamsCallback('es')
    }

    done(response, doneCallback = null, errorCallback = null) {
        if (!response.data._status) {
            this.error({response: response}, errorCallback)
            return
        }
        doneCallback && doneCallback(response.data._data, response.data._extra)
    }

    error(error, errorCallback = null) {
        if (errorCallback) {
            if (error.response && error.response.data) {
                errorCallback(
                    new DefaultServiceError({
                            d: error.response.data._data,
                            m: error.response.data._messages,
                        },
                        error.response.data._extra,
                    ),
                )
            }
            else {
                errorCallback(new DefaultServiceError({e: error}))
            }
        }
    }

    always(alwaysCallback = null) {
        this.d()
        super.always(alwaysCallback)
    }
}
