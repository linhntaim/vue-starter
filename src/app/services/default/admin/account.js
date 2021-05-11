/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

import {AdminService} from '../admin'

export class AccountService extends AdminService {
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

    updateLastAccess(doneCallback = null, errorCallback = null, alwaysCallback = null) {
        return this.update(
            {
                _last_access: 1,
            },
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

    updateInformation(params, doneCallback = null, errorCallback = null, alwaysCallback = null) {
        return this.post(
            '',
            this.appendParams(params, {
                _information: 1,
            }),
            doneCallback,
            errorCallback,
            alwaysCallback,
        )
    }

    updateAvatar(imageBlob, doneCallback = null, errorCallback = null, alwaysCallback = null, name = null) {
        const formData = new FormData
        formData.append('_avatar', '1')
        formData.append('image', imageBlob)
        if (name) {
            formData.append('name', name)
        }
        return this.post(
            '',
            formData,
            doneCallback,
            errorCallback,
            alwaysCallback,
        )
    }

    updateAvatarByHandledFile(fileId, doneCallback = null, errorCallback = null, alwaysCallback = null) {
        return this.post(
            '',
            {
                _avatar_by_handled_file: 1,
                file_id: fileId,
            },
            doneCallback,
            errorCallback,
            alwaysCallback,
        )
    }
}
