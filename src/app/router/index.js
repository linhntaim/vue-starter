/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

import routePermissions from './route-permissions'
import {cacheHandler, permit, PermissionBarrier} from '@/app/utils'

export {routes} from './routes'
export const permissionBarrier = new PermissionBarrier(permit, cacheHandler)
    .importFromRoutePermissions(routePermissions)