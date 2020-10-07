import AdminService from './admin'

export class ActivityLogAdminService extends AdminService {
    constructor() {
        super('activity-log')
    }
}

export const activityLogAdminService = () => new ActivityLogAdminService()
