export class PermissionBarrierAction {
    constructor(permissions = []) {
        this.permissions = permissions
    }

    /**
     *
     * @returns {String[]}
     */
    getPermissions() {
        return this.permissions
    }

    /**
     *
     * @param {Vue} app
     * @param {Object} params
     */
    notPass(app, params = {}) {
        if ('notPassedCallback' in params) {
            if (params.notPassedCallback()) {
                return
            }
        }
        if ('notPassedRoute' in params) {
            app.$router.push(params.notPassedRoute)
        }
    }
}