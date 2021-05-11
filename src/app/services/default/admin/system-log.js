/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

import {BaseAdminService} from '../admin-base'

export class SystemLogService extends BaseAdminService {
    constructor() {
        super('system-log')
    }
}
