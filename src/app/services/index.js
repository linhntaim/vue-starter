/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

import {defaultService, services} from './services'
import {ServiceFactory} from '@linhntaim/vue-services'

export const serviceFactory = new ServiceFactory(services, defaultService)