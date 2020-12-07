/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

import {CommonService} from '@/app/services/default/common'

export class DeviceService extends CommonService {
    constructor(basePath = 'device') {
        super(basePath)
    }

    currentSave(provider, secret, doneCallback = null, errorCallback = null, alwaysCallback = null) {
        this.post(
            'current',
            {
                provider: provider,
                secret: secret,
            },
            doneCallback,
            errorCallback,
            alwaysCallback,
        )
    }
}
