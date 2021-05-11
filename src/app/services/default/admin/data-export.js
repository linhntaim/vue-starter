/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

import {BaseAdminService} from '../admin-base'

export class DataExportService extends BaseAdminService {
    constructor() {
        super('data-export')
    }
}
