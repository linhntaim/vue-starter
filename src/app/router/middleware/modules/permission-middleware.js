import {permissionChecker} from '../../../utils'
import {Middleware} from '@dsquare-gbu/vue-uses'
import {APP_ROUTE} from '../../../config'
import routePermissions from '../../route-permissions'

export default class PermissionMiddleware extends Middleware {
    handle($middlewareManager) {
        this.log('permission', 'middleware')

        const accountPermissions = this.store().getters['account/permissions']
        for (let i = 0, loop = $middlewareManager.to.matched.length; i < loop; ++i) {
            const route = $middlewareManager.to.matched[i]
            if ('name' in route && route.name in routePermissions) {
                if (!permissionChecker.checkAtLeast(routePermissions[route.name], accountPermissions)) {
                    this.redirect($middlewareManager, APP_ROUTE.unauthorized)
                    return
                }
            }
        }

        super.handle($middlewareManager)
    }
}
