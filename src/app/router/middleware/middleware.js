/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

import {Middleware as BaseMiddleware} from '@dsquare-gbu/vue-uses'
import {APP_ERROR_ROUTE_NAMES} from '../../config'

export class Middleware extends BaseMiddleware {
    errorRedirect(location) {
        const toName = this.to().name
        if (APP_ERROR_ROUTE_NAMES.includes(toName)
            || ('name' in location && location.name === toName)) {
            this.next()
            return
        }
        this.redirect(location)
    }
}