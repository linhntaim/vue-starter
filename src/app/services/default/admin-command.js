import AdminService from './admin'

export class CommandAdminService extends AdminService {
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

export const commandAdminService = () => new CommandAdminService()
