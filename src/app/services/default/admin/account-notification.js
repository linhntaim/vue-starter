import BaseAdminService from '@/app/services/default/admin-base'

export class AccountNotificationService extends BaseAdminService {
    constructor() {
        super('account/notification')
    }

    read(id, doneCallback = null, errorCallback = null, alwaysCallback = null) {
        return this.update(
            id,
            {_read: 1},
            doneCallback,
            errorCallback,
            alwaysCallback,
        )
    }
}
