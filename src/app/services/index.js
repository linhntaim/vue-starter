import {defaultService, services} from './services'
import {ServiceFactory} from '@dsquare-gbu/vue-services'

export const serviceFactory = new ServiceFactory(services, defaultService)