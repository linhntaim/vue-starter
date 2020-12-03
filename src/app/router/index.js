/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

import {cacheHandler, permit, PermissionBarrier} from '@/app/utils'
import routePermissions from './route-permissions'

export * from './routes'
export {
    routePermissions,
}
export const permissionBarrier = new PermissionBarrier(permit, cacheHandler)
    .importFromRoutePermissions(routePermissions)