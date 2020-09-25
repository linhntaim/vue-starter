/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

import DefaultService from '../default-service'

export class PrerequisiteService extends DefaultService {
    constructor() {
        super('prerequisite')
    }

    require(names = [], doneCallback = null, errorCallback = null, alwaysCallback = null) {
        return this.get(
            '',
            (() => {
                const builtParams = {}
                names.forEach((param) => {
                    builtParams[param] = 1
                })
                return builtParams
            })(),
            doneCallback,
            errorCallback,
            alwaysCallback,
        )
    }
}

export const prerequisiteService = () => new PrerequisiteService()
