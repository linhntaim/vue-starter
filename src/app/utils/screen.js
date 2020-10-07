/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

import {serviceFactory} from '@/app/services'
import {APP_DEFAULT_SERVICE} from '@/app/config'

export class Screen {
    constructor() {
    }

    setName(name, force = true) {
        this.name = name
        return force ? this.setDefaultServiceScreenHeader() : this
    }

    setPath(path, force = true) {
        this.path = path
        return force ? this.setDefaultServiceScreenHeader() : this
    }

    setOriginalPath(originalPath, force = true) {
        this.originalPath = originalPath
        return force ? this.setDefaultServiceScreenHeader() : this
    }

    updateByRouter($route) {
        this.setName($route.name, false)
            .setPath($route.path, false)
            .setOriginalPath($route.matched.length ? $route.matched[$route.matched.length - 1].path : $route.path, false)
            .setDefaultServiceScreenHeader()
    }

    setDefaultServiceScreenHeader() {
        serviceFactory.modify(defaultServiceInstance => defaultServiceInstance.addInstanceCallback('screen', instance => {
            instance.defaults.headers.common[APP_DEFAULT_SERVICE.headers.screen] = JSON.stringify(this.get())
            return instance
        }))
        return this
    }

    get() {
        return {
            name: this.name,
            path: this.path,
            original_path: this.originalPath,
        }
    }
}