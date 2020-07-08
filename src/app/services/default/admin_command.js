import DefaultService from '../default_service'

export class AdminCommandService extends DefaultService {
    constructor() {
        super('admin/command')
    }

    run(params = {}, doneCallback = null, errorCallback = null, alwaysCallback = null) {
        this.post(
            '',
            params,
            doneCallback,
            errorCallback,
            alwaysCallback,
        )
    }
}

export const adminCommandService = () => new AdminCommandService()
