import {AccountService} from './account'

export class AdminAccountService extends AccountService {
    constructor() {
        super('admin')
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

    updateAvatar(imageBlob, doneCallback = null, errorCallback = null, alwaysCallback = null) {
        const formData = new FormData
        formData.append('_avatar', '1')
        formData.append('image', imageBlob)
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

export const adminAccountService = () => new AdminAccountService()