/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

import {BaseAdminService} from '../admin-base'

export class ActivityLogService extends BaseAdminService {
    constructor() {
        super('activity-log')
    }
}
