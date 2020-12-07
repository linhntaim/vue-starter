/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

import BaseService from '@/app/services/default/base'

export class BaseCommonService extends BaseService {
    constructor(basePath = null) {
        super(basePath ? 'common/' + basePath : 'common')
    }
}