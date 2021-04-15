/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

import DefaultService from '../default-service'

export class HomeService extends DefaultService {
    constructor(basePath = null) {
        super(basePath ? 'home/' + basePath : 'home')
    }
}