import AdminService from './admin'

export class AppOptionAdminService extends AdminService {
    constructor() {
        super('app-option')
    }

    save(params = {}, doneCallback = null, errorCallback = null, alwaysCallback = null) {
        return this.store(params, doneCallback, errorCallback, alwaysCallback)
    }

    saveMany(options = {}, doneCallback = null, errorCallback = null, alwaysCallback = null) {
        return this.store(
            {
                _many: 1,
                options: options,
            },
            doneCallback,
            errorCallback,
            alwaysCallback,
        )
    }
}

export const appOptionAdminService = () => new AppOptionAdminService()
