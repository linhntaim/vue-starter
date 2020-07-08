import DefaultService from '../default_service'

export default class BaseService extends DefaultService {
    index(params = {}, doneCallback = null, errorCallback = null, alwaysCallback = null) {
        this.get(
            '',
            params,
            doneCallback,
            errorCallback,
            alwaysCallback,
        )
    }

    store(params = {}, doneCallback = null, errorCallback = null, alwaysCallback = null) {
        this.post(
            '',
            params,
            doneCallback,
            errorCallback,
            alwaysCallback,
        )
    }

    show(id, doneCallback = null, errorCallback = null, alwaysCallback = null) {
        this.get(
            id,
            {},
            doneCallback,
            errorCallback,
            alwaysCallback,
        )
    }

    update(id, params = {}, doneCallback = null, errorCallback = null, alwaysCallback = null) {
        this.post(
            id,
            params,
            doneCallback,
            errorCallback,
            alwaysCallback,
        )
    }

    bulkDestroy(ids, params = {}, doneCallback = null, errorCallback = null, alwaysCallback = null) {
        params._delete = 1
        params.ids = ids
        this.post(
            '',
            params,
            doneCallback,
            errorCallback,
            alwaysCallback,
        )
    }

    destroy(id, params = {}, doneCallback = null, errorCallback = null, alwaysCallback = null) {
        params._delete = 1
        this.post(
            id,
            params,
            doneCallback,
            errorCallback,
            alwaysCallback,
        )
    }
}
