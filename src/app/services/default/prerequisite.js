import DefaultService from '../default-service'

export class PrerequisiteService extends DefaultService {
    constructor() {
        super('prerequisite')
    }

    require(names = [], doneCallback = null, errorCallback = null, alwaysCallback = null) {
        const builtParams = {}
        names.forEach((param) => {
            builtParams[param] = 1
        })
        this.get(
            '',
            builtParams,
            doneCallback,
            errorCallback,
            alwaysCallback,
        )
    }
}

export const prerequisiteService = () => new PrerequisiteService()
