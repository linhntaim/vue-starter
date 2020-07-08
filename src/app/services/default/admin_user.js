import AdminService from './admin'
import {APP_ROUTE} from '../../config'

export class UserAdminService extends AdminService {
    constructor() {
        super('user')
    }

    store(params = {}, doneCallback = null, errorCallback = null, alwaysCallback = null) {
        params.app_verify_email_path = APP_ROUTE.verify_email
        super.store(params, doneCallback, errorCallback, alwaysCallback)
    }

    update(id, params = {}, doneCallback = null, errorCallback = null, alwaysCallback = null) {
        params.app_verify_email_path = APP_ROUTE.verify_email
        super.update(id, params, doneCallback, errorCallback, alwaysCallback)
    }
}

export const userAdminService = () => new UserAdminService()
