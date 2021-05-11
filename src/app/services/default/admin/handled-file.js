/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

import {BaseAdminService} from '../admin-base'

export class HandledFileService extends BaseAdminService {
    constructor() {
        super('handled-file')
    }

    chunkUploadInit(doneCallback = null, errorCallback = null, alwaysCallback = null) {
        return this.store(
            {_chunk_init: 1},
            doneCallback,
            errorCallback,
            alwaysCallback,
        )
    }

    chunkComplete(chunksId, params = {}, doneCallback = null, errorCallback = null, alwaysCallback = null, name = null) {
        return this.store(
            this.appendParams(params, {
                _chunk_complete: 1,
                chunks_id: chunksId,
                name: name,
            }),
            doneCallback,
            errorCallback,
            alwaysCallback,
        )
    }

    chunkUpload(chunksId, chunksTotal, chunkFile, chunkIndex, doneCallback = null, errorCallback = null, alwaysCallback = null) {
        const params = new FormData
        params.append('_chunk', '1')
        if (chunksId) {
            params.append('chunks_id', chunksId)
        }
        params.append('chunks_total', chunksTotal)
        params.append('chunk_file', chunkFile)
        params.append('chunk_index', chunkIndex)
        return this.store(
            params,
            doneCallback,
            errorCallback,
            alwaysCallback,
        )
    }

    handlePostProcessed(id, params = {}, doneCallback = null, errorCallback = null, alwaysCallback = null) {
        return this.post(
            id,
            params,
            doneCallback,
            errorCallback,
            alwaysCallback,
        )
    }
}
