import AdminService from './admin'

export class AppOptionAdminService extends AdminService {
    constructor() {
        super('app-option')
    }

    save(params = {}, doneCallback = null, errorCallback = null, alwaysCallback = null) {
        this.store(params, doneCallback, errorCallback, alwaysCallback)
    }

    saveMany(options = {}, doneCallback = null, errorCallback = null, alwaysCallback = null) {
        this.store(
            {
                _many: 1,
                options: options,
            },
            doneCallback,
            errorCallback,
            alwaysCallback,
        )
    }
    
    saveInfo(options = {}, doneCallback = null, errorCallback = null, alwaysCallback = null) {
        this.store(
            {
                _info: 1,
                options: options,
            },
            doneCallback,
            errorCallback,
            alwaysCallback,
        )
    }

    saveAppLogo(imageBlob, doneCallback = null, errorCallback = null, alwaysCallback = null) {
        const formData = new FormData
        formData.append('_app_logo', '1')
        formData.append('key', 'app_logo')
        formData.append('value', imageBlob)
        this.save(formData, doneCallback, errorCallback, alwaysCallback)
    }
}

export const appOptionAdminService = () => new AppOptionAdminService()
