import DefaultService from '../default_service'

export class AccountCommandService extends DefaultService {
    constructor() {
        super('account/command')
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

export const accountCommandService = () => new AccountCommandService()
