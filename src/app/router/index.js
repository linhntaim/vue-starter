/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

import {routePermissions} from './permissions'
import {storeHandler, permit} from '../utils'
import {PermissionBarrier} from '@dsquare-gbu/vue-utils'

export * from './routes'
export {
    routePermissions,
}
export const permissionBarrier = new PermissionBarrier(permit, storeHandler)
    .importFromRoutePermissions(routePermissions)