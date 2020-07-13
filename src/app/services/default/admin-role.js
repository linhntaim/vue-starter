import AdminService from './admin'

export class RoleAdminService extends AdminService {
    constructor() {
        super('role')
    }
}

export const roleAdminService = () => new RoleAdminService()
