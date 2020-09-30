import {AccountService} from '@/app/services/default/account'

export class AccountNotificationService extends AccountService {
    constructor() {
        super('admin/notification')
    }

    index(params = {}, doneCallback = null, errorCallback = null, alwaysCallback = null) {
        return this.get(
            '',
            params,
            doneCallback,
            errorCallback,
            alwaysCallback,
        )
    }

    read(id, doneCallback = null, errorCallback = null, alwaysCallback = null) {
        return this.post(
            id,
            {_read: 1},
            doneCallback,
            errorCallback,
            alwaysCallback,
        )
    }
}

export const accountNotificationService = () => new AccountNotificationService()
