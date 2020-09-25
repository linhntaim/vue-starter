/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

import {permissionChecker} from '../../../utils'
import {Middleware} from '@dsquare-gbu/vue-uses'
import {APP_ROUTE} from '../../../config'
import routePermissions from '../../route-permissions'

export default class PermissionMiddleware extends Middleware {
    handle() {
        this.log('permission', 'middleware')

        const to = this.to()
        const accountPermissions = this.store().getters['account/permissions']
        for (let i = 0, loop = to.matched.length; i < loop; ++i) {
            const route = to.matched[i]
            if ('name' in route && route.name in routePermissions) {
                if (!permissionChecker.checkAtLeast(routePermissions[route.name], accountPermissions)) {
                    this.redirect({
                        name: APP_ROUTE.unauthorized,
                    })
                    return
                }
            }
        }

        this.next()
    }
}
