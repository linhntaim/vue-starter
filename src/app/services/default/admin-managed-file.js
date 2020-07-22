import AdminService from './admin'

export class ManagedFileAdminService extends AdminService {
    constructor() {
        super('managed-file')
    }
}

export const managedFileAdminService = () => new ManagedFileAdminService()
