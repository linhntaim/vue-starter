/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

import routePermissions from './route-permissions'
import {cacheHandler, permit} from '@/app/utils'
import {PermissionBarrier} from '@/app/router/permission-barrier'

export {routes} from './routes'
export const permissionBarrier = new PermissionBarrier(permit, cacheHandler)
    .importFromRoutePermissions(routePermissions)