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
}