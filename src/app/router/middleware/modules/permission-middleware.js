/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

import {Middleware} from '@dsquare-gbu/vue-uses'
import {APP_ROUTE} from '../../../config'
import {permissionBarrier} from '@/app/router'

export default class PermissionMiddleware extends Middleware {
    handle() {
        this.log('permission', 'middleware')

        permissionBarrier.setPermissions(this.store().getters['account/permissions'])
        const tos = this.to().matched
        for (let i = 0, loop = tos.length; i < loop; ++i) {
            const route = tos[i]
            if ('name' in route) {
                if (!permissionBarrier.passRouteActions(this.app(), route, {
                    notPassedCallback() {
                        this.redirect(APP_ROUTE.unauthorized)
                        return true
                    },
                })) return
            }
        }

        if (!permissionBarrier.passActions(this.app())) return

        this.next()
    }
}
