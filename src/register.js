/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

import Vue from 'vue'
import * as utils from './app/utils'

export default function () {
    Object.defineProperty(Vue.prototype, '$utils', {
        get() {
            return utils
        },
    })
    // TODO:
    //  Extra registers for Vue

    // TODO
}