/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

import {BaseAdminService} from '../admin-base'

export class AppOptionService extends BaseAdminService {
    constructor() {
        super('app-option')
    }

    save(params = {}, doneCallback = null, errorCallback = null, alwaysCallback = null) {
        return this.store(params, doneCallback, errorCallback, alwaysCallback)
    }

    saveMany(options = {}, doneCallback = null, errorCallback = null, alwaysCallback = null) {
        return this.store(
            {
                _many: 1,
                options: options,
            },
            doneCallback,
            errorCallback,
            alwaysCallback,
        )
    }
}
