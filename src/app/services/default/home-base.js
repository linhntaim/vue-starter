/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

import BaseService from './base'

export class BaseHomeService extends BaseService {
    constructor(basePath = null) {
        super(basePath ? 'home/' + basePath : 'home')
    }
}