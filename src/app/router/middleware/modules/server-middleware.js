import {serverClock} from '../../../utils'
import {Middleware} from '@dsquare-gbu/vue-uses'
import {APP_ROUTE} from '../../../config'
import Vue from 'vue'

export default class ServerMiddleware extends Middleware {
    handle($middlewareManager) {
        this.log('server', 'middleware')

        const store = this.store()
        store.dispatch('prerequisite/require', {
            names: ['server'],
            doneCallback: () => {
                Vue.prototype.$server = store.getters['prerequisite/metadata'].server

                this.handleClock()

                this.next()
            },
            errorCallback: () => {
                this.redirect($middlewareManager, this.router().getPathByName(APP_ROUTE.connection_lost))
            },
        })
    }

    handleClock() {
        serverClock.setClock(this.app().$server.c)
    }
}
