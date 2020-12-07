import DefaultService from '@/app/services/default-service'

export default class AdminService extends DefaultService {
    constructor(basePath) {
        super('admin/' + basePath)
    }
}
