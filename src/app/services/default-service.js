import {serviceFactory} from './service-factory'
import {Service, ServiceError} from './service'

class DefaultServiceError extends ServiceError {
    constructor(err, extra) {
        super(err)

        this.extra = extra
    }

    getMessages(defaults = {}) {
        if (this.err.e) {
            const err = this.err.e
            if (err.response) {
                const response = err.response
                if (response.statusText) return [response.statusText]
                switch (response.status) {
                    case 401:
                        return [defaults['401'] ? defaults['401'] : 'Unauthenticated!']
                    case 403:
                        return [defaults['403'] ? defaults['403'] : 'Forbidden error!']
                    case 404:
                        return [defaults['404'] ? defaults['404'] : 'Not found!']
                    case 500:
                        return [defaults['500'] ? defaults['500'] : 'Application error!']
                }
            }
            if (err.message) return [err.message]
            return [defaults['0'] ? defaults['0'] : 'Something went wrong!']
        }
        return this.err.m
    }

    getExtra() {
        return this.extra
    }
}

export default class DefaultService extends Service {
    constructor(basePath = null) {
        super(serviceFactory.factory(), basePath)
    }

    e() {
        this.s.paramsCallback.e = params => {
            params._e = 1
            return params
        }
    }

    es() {
        this.s.paramsCallback.es = params => {
            params._es = 1
            return params
        }
    }

    d() {
        if ('e' in this.s.paramsCallback) delete this.s.paramsCallback.e
        if ('es' in this.s.paramsCallback) delete this.s.paramsCallback.es
    }

    done(response, doneCallback = null) {
        this.d()
        if (doneCallback) doneCallback(response.data._data, response.data._extra)
    }

    error(error, errorCallback = null) {
        this.d()
        if (errorCallback) {
            if (error.response && error.response.data) {
                errorCallback(new DefaultServiceError({
                    d: error.response.data._data,
                    m: error.response.data._messages,
                }, error.response.data._extra))
            } else {
                errorCallback(new DefaultServiceError({e: error}))
            }
        }
    }

    handleRequest(request, doneCallback = null, errorCallback = null, alwaysCallback = null) {
        return request.then(response => this.done(response, doneCallback))
            .catch(error => this.error(error, errorCallback))
            .then(() => this.always(alwaysCallback))
    }

    wait(requests = [], doneCallback = null, errorCallback = null, alwaysCallback = null) {
        return this.handleRequest(
            this.service().all(requests),
            doneCallback,
            errorCallback,
            alwaysCallback,
        )
    }

    get(path, params = {}, doneCallback = null, errorCallback = null, alwaysCallback = null, cancelToken = null) {
        return this.handleRequest(
            this.service().get(this.path(path), {
                params: this.params(params),
                cancelToken: cancelToken,
            }),
            doneCallback,
            errorCallback,
            alwaysCallback,
        )
    }

    post(path, params = {}, doneCallback = null, errorCallback = null, alwaysCallback = null, cancelToken = null) {
        return this.handleRequest(
            this.service().post(this.path(path), this.params(params), {
                cancelToken: cancelToken,
            }),
            doneCallback,
            errorCallback,
            alwaysCallback,
        )
    }

    put(path, params = {}, doneCallback = null, errorCallback = null, alwaysCallback = null, cancelToken = null) {
        return this.handleRequest(
            this.service().put(this.path(path), this.params(params), {
                cancelToken: cancelToken,
            }),
            doneCallback,
            errorCallback,
            alwaysCallback,
        )
    }

    delete(path, params = {}, doneCallback = null, errorCallback = null, alwaysCallback = null, cancelToken = null) {
        return this.handleRequest(
            this.service().delete(this.path(path), {
                params: this.params(params),
                cancelToken: cancelToken,
            }),
            doneCallback,
            errorCallback,
            alwaysCallback,
        )
    }
}
