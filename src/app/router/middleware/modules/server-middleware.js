/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

import {app} from '@linhntaim/vue-app'
import {appOptions, ip, serverClock} from '../../../utils'
import {Middleware} from '../middleware'
import {APP_ROUTE, APP_CLIENT, APP_CLIENT_ADMIN} from '../../../config'
import Vue from 'vue'

export class ServerMiddleware extends Middleware {
    handle() {
        this.log('server', 'middleware')

        const store = this.store()
        store.dispatch('prerequisite/reset', {
            name: 'server',
        })
        store.dispatch('prerequisite/require', {
            names: ['server'],
            doneCallback: () => {
                Vue.prototype.$server = store.getters['prerequisite/metadata'].server

                this.app().$bus.emit('server')

                this.handleClock()

                this.handleIp()
                this.handleOthers()
                if (this.handleMaintenance()) {
                    return
                }
                if (this.handleLimitation()) {
                    return
                }

                this.next()
            },
            errorCallback: () => {
                this.errorRedirect(APP_ROUTE.serviceUnavailable)
            },
        })
    }

    handleClock() {
        serverClock.setClock(this.app().$server.c)
    }

    handleIp() {
        app.ips(this.app().$server.ips)
    }

    handleOthers() {
        appOptions.set(this.app().$server.app_options)
    }

    handleMaintenance() {
        const server = this.app().$server
        const maintenanceMode = server.m
        if (maintenanceMode) {
            app.maintenance(maintenanceMode)
        }
        const to = this.to()
        if (maintenanceMode && to.name !== APP_ROUTE.maintenance.name) {
            if (!ip.match(app.ips(), server.m.allowed)) {
                this.errorRedirect(APP_ROUTE.maintenance)
                return true
            }
        }
        else if (!maintenanceMode && to.name === APP_ROUTE.maintenance.name) {
            this.redirect(APP_ROUTE.root)
            return true
        }
        return false
    }

    handleLimitation() {
        const server = this.app().$server
        const limitationMode = server.l
        if (limitationMode) {
            app.limitation(limitationMode)
        }
        const to = this.to()
        if (limitationMode && to.name !== APP_ROUTE.limitation.name) {
            if (limitationMode.admin && APP_CLIENT !== APP_CLIENT_ADMIN) {
                if (to.name === APP_ROUTE.limitation.name) {
                    this.redirect(APP_ROUTE.root)
                    return true
                }
                return false
            }

            if ((limitationMode.allowed.length && !ip.match(app.ips(), limitationMode.allowed))
                || (limitationMode.denied.length && ip.match(app.ips(), limitationMode.denied))) {
                this.errorRedirect(APP_ROUTE.limitation)
                return true
            }
        }
        else if (!limitationMode && to.name === APP_ROUTE.limitation.name) {
            this.redirect(APP_ROUTE.root)
            return true
        }
        return false
    }
}
