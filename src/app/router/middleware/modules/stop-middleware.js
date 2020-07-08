import {Middleware} from '@dsquare-gbu/vue-uses'

export default class StopMiddleware extends Middleware {
    handle() {
        this.log('stop', 'middleware')
    }
}