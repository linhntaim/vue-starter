import {ServiceFactory} from '@dsquare-gbu/vue-services'
import {defaultService, services} from './services'

export const serviceFactory = new ServiceFactory(services, defaultService)