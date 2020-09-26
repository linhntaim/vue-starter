import AdminService from './admin'

export class SystemLogAdminService extends AdminService {
    constructor() {
        super('system-log')
    }
}

export const systemLogAdminService = () => new SystemLogAdminService()
