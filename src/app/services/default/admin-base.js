import BaseService from './base'

export default class BaseAdminService extends BaseService {
    constructor(basePath) {
        super('admin/' + basePath)
    }
}
