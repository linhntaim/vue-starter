export class RouteBarrier {
    constructor(permit, cacheHandler, routePermissions = {}) {
        this.permit = permit
        this.cacheHandler = cacheHandler
        this.routePermissions = {}
        this.permissions = []
        this.temporaryPermissions = []
        this.restoreTemporaryRoutePermissions()
        this.restoreTemporaryPermissions()
        this.setRoutePermissions(routePermissions)
    }

    setRoutePermissions(routePermissions = {}) {
        Object.keys(routePermissions).forEach(routeName => {
            const permission = routePermissions[routeName]
            this.routePermissions[routeName] = typeof permission === 'string' ?
                permission.split('|') : permission
        })
        return this
    }

    setPermissions(permissions = []) {
        this.permissions = permissions
        return this
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
        this.cacheHandler.setJson('__route_barrier_temporary_permission', this.temporaryPermissions)
        return this
    }

    restoreTemporaryPermissions() {
        (temporaryPermissions => {
            temporaryPermissions && (this.temporaryPermissions = temporaryPermissions)
        })(this.cacheHandler.getJson('__route_barrier_temporary_permission'))
        return this
    }

    getRoutePermissionsByRouteName(routeName) {
        return routeName in this.routePermissions ?
            this.routePermissions[routeName] : []
    }

    isAllowed(routeName) {
        return this.permit.match(this.getRoutePermissionsByRouteName(routeName), [
            ...this.permissions,
            ...this.temporaryPermissions,
        ])
    }
}