import BaseService from './base'

export default class AdminService extends BaseService {
    constructor(basePath) {
        super('admin/' + basePath)
    }
}
