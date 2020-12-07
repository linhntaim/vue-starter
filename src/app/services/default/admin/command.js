import BaseAdminService from '@/app/services/default/admin-base'

export class CommandService extends BaseAdminService {
    constructor() {
        super('command')
    }

    run(params = {}, doneCallback = null, errorCallback = null, alwaysCallback = null) {
        return this.post(
            '',
            params,
            doneCallback,
            errorCallback,
            alwaysCallback,
        )
    }
}
