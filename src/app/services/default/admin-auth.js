import AdminService from './admin'

export class AuthAdminService extends AdminService {
    constructor(basePath) {
        super('auth/' + basePath)
    }
}