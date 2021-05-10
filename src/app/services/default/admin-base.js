/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

import {BaseService} from './base'

export default class BaseAdminService extends BaseService {
    constructor(basePath) {
        super('admin/' + basePath)
    }
}
