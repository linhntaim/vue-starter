/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

import {appOptions, ip, serverClock} from '../../../utils'
import {Middleware} from '@linhntaim/vue-uses'
import {APP_ROUTE, APP_TYPE, APP_TYPE_ADMIN} from '../../../config'
import app from '@linhntaim/vue-app'
import Vue from 'vue'

export default class ServerMiddleware extends Middleware {
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
                if (this.handleMaintenance()) return
                if (this.handleLimitation()) return

                this.next()
            },
            errorCallback: () => {
                if (this.to().name !== APP_ROUTE.service_unavailable) {
                    this.redirect({
                        name: APP_ROUTE.service_unavailable,
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
        if (maintenanceMode && !to.matched.some(record => record.name === APP_ROUTE.maintenance)) {
            if (!ip.match(app.ips(), server.m.allowed)) {
                this.redirect({
                    name: APP_ROUTE.maintenance,
                })
                return true
            }
        } else if (!maintenanceMode && to.matched.some(record => record.name === APP_ROUTE.maintenance)) {
            this.redirect({
                name: APP_ROUTE.root,
            })
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
        if (limitationMode && !to.matched.some(record => record.name === APP_ROUTE.unauthorized)) {
            if (limitationMode.admin && APP_TYPE !== APP_TYPE_ADMIN) {
                return false
            }

            if ((limitationMode.allowed.length && !ip.match(app.ips(), limitationMode.allowed))
                || (limitationMode.denied.length && ip.match(app.ips(), limitationMode.denied))) {
                this.redirect({
                    name: APP_ROUTE.unauthorized,
                })
                return true
            }
        }
        return false
    }
}
