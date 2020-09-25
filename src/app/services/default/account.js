/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

import DefaultService from '../default-service'

export class AccountService extends DefaultService {
    constructor() {
        super('account')
    }

    current(login = false, doneCallback = null, errorCallback = null, alwaysCallback = null) {
        return this.get(
            '',
            login ? {_login: 1} : {},
            doneCallback,
            errorCallback,
            alwaysCallback,
        )
    }

    update(params, doneCallback = null, errorCallback = null, alwaysCallback = null) {
        return this.post(
            '',
            params,
            doneCallback,
            errorCallback,
            alwaysCallback,
        )
    }

    updateEmail(email, currentPassword, doneCallback = null, errorCallback = null, alwaysCallback = null) {
        return this.post(
            '',
            {
                _email: 1,
                email: email,
                current_password: currentPassword,
            },
            doneCallback,
            errorCallback,
            alwaysCallback,
        )
    }

    updatePassword(password, passwordConfirmation, currentPassword, doneCallback = null, errorCallback = null, alwaysCallback = null) {
        return this.post(
            '',
            {
                _password: 1,
                password: password,
                password_confirmation: passwordConfirmation,
                current_password: currentPassword,
            },
            doneCallback,
            errorCallback,
            alwaysCallback,
        )
    }
}

export const accountService = () => new AccountService()
