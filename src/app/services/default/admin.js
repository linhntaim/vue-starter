/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

import {DefaultService} from '../default-service'

export class AdminService extends DefaultService {
    constructor(basePath) {
        super('admin/' + basePath)
    }
}
