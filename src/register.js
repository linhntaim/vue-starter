import Vue from 'vue'
import {ConsoleLog} from '@dsquare-gbu/vue-utils'

export default function () {
    Object.defineProperty(Vue.prototype, '$utils', {
        get() {
            return {
                log: new ConsoleLog,
            }
        },
    })
}