import {PermissionBarrierAction} from './permission-barrier-action'

export class PermissionBarrier {
    constructor(permit, cacheHandler) {
        this.permit = permit
        this.cacheHandler = cacheHandler
        this.routeActions = {}
        this.actions = []
        this.permissions = []
        this.temporaryPermissions = []
        this.temporaryActionPermissions = []
        this.restoreTemporaryPermissions()
        this.restoreTemporaryActionPermissions()
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
        if (!this.temporaryPermissions.includes(temporaryPermission)) {
            this.temporaryPermissions.push(temporaryPermission)
            this.storeTemporaryPermissions()
        }
        return this
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

    addTemporaryActionPermission(temporaryActionPermissions) {
        if (!this.temporaryActionPermissions.includes(temporaryActionPermissions)) {
            this.temporaryActionPermissions.push(temporaryActionPermissions)
            this.storeTemporaryActionPermissions()
        }
        return this
    }

    removeTemporaryActionPermission(temporaryActionPermissions) {
        const i = this.temporaryActionPermissions.indexOf(temporaryActionPermissions)
        if (i !== -1) {
            this.temporaryActionPermissions.splice(i, 1)
            this.storeTemporaryActionPermissions()
        }
        return this
    }

    storeTemporaryActionPermissions() {
        this.cacheHandler.setJson('__permission_barrier_temporary_action_permission', this.temporaryActionPermissions)
        return this
    }

    restoreTemporaryActionPermissions() {
        (temporaryActionPermissions => {
            temporaryActionPermissions && (this.temporaryActionPermissions = temporaryActionPermissions)
        })(this.cacheHandler.getJson('__permission_barrier_temporary_action_permission'))
        return this
    }

    /**
     *
     * @param {Object} route
     * @param {Function|null} notPassCallback
     * @returns {boolean}
     */
    passRouteActions(route, notPassCallback = null) {
        if (route.name in this.routeActions) {
            return this.passAction(this.routeActions[route.name], notPassCallback)
        }
        return true
    }

    /**
     *
     * @param {Function|null} notPassCallback
     * @returns {boolean}
     */
    passActions(notPassCallback = null) {
        if (this.actions.length) {
            return this.actions.every(action => this.passAction(action, notPassCallback))
        }
        return true
    }

    /**
     *
     * @param {PermissionBarrierAction} action
     * @param {Function|null} notPassCallback
     */
    passAction(action, notPassCallback = null) {
        if (this.permit.match([
            ...action.getPermissions(),
            ...this.temporaryActionPermissions,
        ], [
            ...this.permissions,
            ...this.temporaryPermissions,
        ])) {
            return true
        }
        notPassCallback && notPassCallback(action)
        return false
    }
}