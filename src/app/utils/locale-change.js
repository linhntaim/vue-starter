/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

import Vue from 'vue'

export class LocaleChange {
    constructor(timeoutCaller) {
        this.timeoutCaller = timeoutCaller
        this.changed = false
        this.handlers = {}
    }

    reset() {
        this.changed = false
        return this
    }

    on(callback = null) {
        const keys = Object.keys(this.handlers)
        const handlerId = keys.length ? parseInt(keys.pop()) + 1 : 0
        this.handlers[handlerId] = $event => {
            this.changed = true
            callback && callback($event)
            this.timeoutCaller.register(() => this.changed = false)
        }
        Vue.prototype.$bus.on('localeChanged', this.handlers[handlerId])
        return handlerId
    }

    off(handlerId = null) {
        if (handlerId) {
            Vue.prototype.$bus.off('localeChanged', this.handlers[handlerId])
            delete this.handlers[handlerId]
        }
        else {
            Vue.prototype.$bus.off('localeChanged')
        }
        return this
    }
}