import {serverClock} from '../../../utils'
import {Middleware} from '@dsquare-gbu/vue-uses'
import {APP_ROUTE} from '../../../config'
import Vue from 'vue'

export default class ServerMiddleware extends Middleware {
    handle() {
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
                if (this.to().name !== APP_ROUTE.connection_lost) {
                    this.redirect({
                        name: APP_ROUTE.connection_lost,
                    })
                } else {
                    this.next()
                }
            },
        })
    }

    handleClock() {
        serverClock.setClock(this.app().$server.c)
    }
}
