import {PermissionBarrierAction} from '@/app/router/permission-barrier-action'

export class PermissionBarrier {
    constructor(permit, cacheHandler) {
        this.permit = permit
        this.cacheHandler = cacheHandler
        this.routeActions = {}
        this.actions = []
        this.permissions = []
        this.temporaryPermissions = []
        this.restoreTemporaryPermissions()
    }

    importFromRoutePermissions(routePermissions = {}) {
        Object.keys(routePermissions).forEach(routeName => {
            const permissions = routePermissions[routeName]
            this.routeActions[routeName] = new PermissionBarrierAction(
                typeof permissions === 'string' ?
                    permissions.split('|') : permissions,
            )
        })
        return this
    }

    setPermissions(permissions = []) {
        this.permissions = permissions
    }

    addTemporaryPermission(temporaryPermission) {
        this.temporaryPermissions.push(temporaryPermission)
        return this.storeTemporaryPermissions()
    }

    removeTemporaryPermission(temporaryPermission) {
        const i = this.temporaryPermissions.indexOf(temporaryPermission)
        if (i !== -1) {
            this.temporaryPermissions.splice(i, 1)
            this.storeTemporaryPermissions()
        }
        return this
    }

    storeTemporaryPermissions() {
        this.cacheHandler.setJson('__permission_barrier_temporary_permission', this.temporaryPermissions)
        return this
    }

    restoreTemporaryPermissions() {
        (temporaryPermissions => {
            temporaryPermissions && (this.temporaryPermissions = temporaryPermissions)
        })(this.cacheHandler.getJson('__permission_barrier_temporary_permission'))
        return this
    }

    /**
     *
     * @param {Vue} app
     * @param {Object} route
     * @param {Object} params
     * @returns {boolean}
     */
    passRouteActions(app, route, params = {}) {
        if (route.name in this.routeActions) {
            params.route = route
            return this.passAction(app, this.routeActions[route.name], params)
        }
        return true
    }

    /**
     *
     * @param {Vue} app
     * @param {Object} params
     * @returns {boolean}
     */
    passActions(app, params = {}) {
        if (this.actions.length) {
            return this.actions.every(action => this.passAction(app, action, params))
        }
        return true
    }

    /**
     *
     * @param {Vue} app
     * @param {Object} params
     * @param {PermissionBarrierAction} action
     */
    passAction(app, action, params = {}) {
        if (this.permit.match(action.getPermissions(), [
            ...this.permissions,
            ...this.temporaryPermissions,
        ])) {
            return true
        }
        action.notPass(app, params)
        return false
    }
}