/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

import {BaseAdminService} from '../admin-base'

export class CommandService extends BaseAdminService {
    constructor() {
        super('command')
    }

    run(params = {}, doneCallback = null, errorCallback = null, alwaysCallback = null) {
        return this.post(
            '',
            params,
            doneCallback,
            errorCallback,
            alwaysCallback,
        )
    }
}
