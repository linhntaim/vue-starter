/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

import Vue from 'vue'

export class LocaleChange {
    constructor(timeoutCaller) {
        this.timeoutCaller = timeoutCaller
        this.changed = false
    }

    reset() {
        this.changed = false
        return this
    }

    on() {
        Vue.prototype.$bus.on('localeChanged', () => {
            this.changed = true
            this.timeoutCaller.register(() => this.changed = false)
        })
        return this
    }

    off() {
        Vue.prototype.$bus.off('localeChanged')
        return this
    }
}