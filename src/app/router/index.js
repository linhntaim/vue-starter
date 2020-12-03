/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

import routePermissions from './route-permissions'
import {RouteBarrier} from '@/app/router/route-barrier'
import {cacheHandler, permit} from '@/app/utils'

export {routes} from './routes'
export const routeBarrier = new RouteBarrier(permit, cacheHandler, routePermissions)