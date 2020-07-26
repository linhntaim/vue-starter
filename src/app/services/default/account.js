import DefaultService from '../default-service'

export class AccountService extends DefaultService {
    constructor() {
        super('account/admin')
    }

    current(login = false, doneCallback = null, errorCallback = null, alwaysCallback = null) {
        this.get(
            '',
            login ? {_login: 1} : {},
            doneCallback,
            errorCallback,
            alwaysCallback,
        )
    }

    update(params, doneCallback = null, errorCallback = null, alwaysCallback = null) {
        this.post(
            '',
            params,
            doneCallback,
            errorCallback,
            alwaysCallback,
        )
    }

    updateEmail(email, currentPassword, doneCallback = null, errorCallback = null, alwaysCallback = null) {
        this.post(
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
        this.post(
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
        params._information = 1
        this.post(
            '',
            params,
            doneCallback,
            errorCallback,
            alwaysCallback,
        )
    }

    updateAvatar(imageBlob, doneCallback = null, errorCallback = null, alwaysCallback = null) {
        let formData = new FormData
        formData.append('_avatar', '1')
        formData.append('image', imageBlob)
        this.post(
            '',
            formData,
            doneCallback,
            errorCallback,
            alwaysCallback,
        )
    }

    updateAvatarByHandledFile(fileId, doneCallback = null, errorCallback = null, alwaysCallback = null) {
        this.post(
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

export const accountService = () => new AccountService()
