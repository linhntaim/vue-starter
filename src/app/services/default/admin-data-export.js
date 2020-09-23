import AdminService from './admin'

export class DataExportAdminService extends AdminService {
    constructor() {
        super('data-export')
    }
}

export const dataExportAdminService = () => new DataExportAdminService()
