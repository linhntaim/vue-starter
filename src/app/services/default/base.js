/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

import {DefaultService} from '../default-service'

export class BaseService extends DefaultService {
    index(params = {}, doneCallback = null, errorCallback = null, alwaysCallback = null) {
        return this.get(
            '',
            params,
            doneCallback,
            errorCallback,
            alwaysCallback,
        )
    }

    load(params = {}, doneCallback = null, errorCallback = null, alwaysCallback = null) {
        params._load = 1
        return this.index(
            params,
            doneCallback,
            errorCallback,
            alwaysCallback,
        )
    }

    export(params = {}, doneCallback = null, errorCallback = null, alwaysCallback = null) {
        params._export = 1
        return this.index(
            params,
            doneCallback,
            errorCallback,
            alwaysCallback,
        )
    }

    import(file, doneCallback = null, errorCallback = null, alwaysCallback = null) {
        const params = new FormData
        params.append('file', file)
        params.append('_import', '1')
        return this.store(
            params,
            doneCallback,
            errorCallback,
            alwaysCallback,
        )
    }

    store(params = {}, doneCallback = null, errorCallback = null, alwaysCallback = null) {
        return this.post(
            '',
            params,
            doneCallback,
            errorCallback,
            alwaysCallback,
        )
    }

    show(id, doneCallback = null, errorCallback = null, alwaysCallback = null) {
        return this.get(
            id,
            {},
            doneCallback,
            errorCallback,
            alwaysCallback,
        )
    }

    update(id, params = {}, doneCallback = null, errorCallback = null, alwaysCallback = null) {
        return this.post(
            id,
            params,
            doneCallback,
            errorCallback,
            alwaysCallback,
        )
    }

    bulkDestroy(ids, params = {}, doneCallback = null, errorCallback = null, alwaysCallback = null) {
        return this.post(
            '',
            this.appendParams(params, {
                _delete: 1,
                ids: ids,
            }),
            doneCallback,
            errorCallback,
            alwaysCallback,
        )
    }

    destroy(id, params = {}, doneCallback = null, errorCallback = null, alwaysCallback = null) {
        return this.post(
            id,
            this.appendParams(params, {
                _delete: 1,
            }),
            doneCallback,
            errorCallback,
            alwaysCallback,
        )
    }
}
