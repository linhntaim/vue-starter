export class RouteBarrier {
    constructor(permit, cacheHandler, routePermissions = {}) {
        this.permit = permit
        this.cacheHandler = cacheHandler
        this.routePermissions = {}
        this.permissions = []
        this.temporaryRoutePermissions = []
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

    addTemporaryRoutePermission(temporaryRoutePermissions) {
        this.temporaryRoutePermissions.push(temporaryRoutePermissions)
        return this.storeTemporaryRoutePermissions()
    }

    addTemporaryPermission(temporaryPermission) {
        this.temporaryPermissions.push(temporaryPermission)
        return this.storeTemporaryPermissions()
    }

    removeTemporaryRoutePermission(temporaryRoutePermissions) {
        const i = this.temporaryRoutePermissions.indexOf(temporaryRoutePermissions)
        if (i !== -1) {
            this.temporaryRoutePermissions.splice(i, 1)
            this.storeTemporaryRoutePermissions()
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

    storeTemporaryRoutePermissions() {
        this.cacheHandler.setJson('__route_barrier_temporary_route_permission', this.temporaryRoutePermissions)
        return this
    }

    restoreTemporaryRoutePermissions() {
        (temporaryRoutePermissions => {
            temporaryRoutePermissions && (this.temporaryRoutePermissions = temporaryRoutePermissions)
        })(this.cacheHandler.getJson('__route_barrier_temporary_route_permission'))
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
        return this.permit.match([
            ...this.getRoutePermissionsByRouteName(routeName),
            ...this.temporaryRoutePermissions,
        ], [
            ...this.permissions,
            ...this.temporaryPermissions,
        ])
    }
}