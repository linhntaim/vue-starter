/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

import {Middleware} from '@linhntaim/vue-uses'
import {APP_ROUTE} from '../../../config'
import {permissionBarrier} from '../../index'

export default class PermissionMiddleware extends Middleware {
    handle() {
        this.log('permission', 'middleware')

        const store = this.store()
        if (store.getters['account/isLoggedIn']) {
            permissionBarrier.setMatchingPermissions(store.getters['account/permissions'])

            const to = this.to()
            const tos = to.matched
            for (let i = 0, loop = tos.length; i < loop; ++i) {
                const route = tos[i]
                if ('name' in route) {
                    if (!permissionBarrier.passRoutes(route, () => {
                        this.redirect(APP_ROUTE.unauthorized)
                    })) return
                }
            }

            if (!permissionBarrier.passActions(() => {
                this.redirect(APP_ROUTE.unauthorized)
            })) return
        }

        this.next()
    }
}
