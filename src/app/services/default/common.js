/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

import DefaultService from '@/app/services/default-service'

export class CommonService extends DefaultService {
    constructor(basePath = null) {
        super(basePath ? 'common/' + basePath : 'common')
    }
}