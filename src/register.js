import Vue from 'vue'
import * as utils from './app/utils'

export default function () {
    Object.defineProperty(Vue.prototype, '$utils', {
        get() {
            return utils
        },
    })
}