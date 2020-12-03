/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

import {Middleware} from '@dsquare-gbu/vue-uses'
import {APP_ROUTE} from '../../../config'
import {routeBarrier} from '@/app/router'

export default class PermissionMiddleware extends Middleware {
    handle() {
        this.log('permission', 'middleware')

        routeBarrier.setPermissions(this.store().getters['account/permissions'])
        const tos = this.to().matched
        for (let i = 0, loop = tos.length; i < loop; ++i) {
            const route = tos[i]
            if ('name' in route) {
                if (!routeBarrier.isAllowed(route.name)) {
                    this.redirect(APP_ROUTE.unauthorized)
                    return
                }
            }
        }

        this.next()
    }
}
