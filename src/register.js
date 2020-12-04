/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

import Vue from 'vue'
import * as utils from './app/utils'
import {session} from '@dsquare-gbu/vue-router'
import {storeHandler} from './app/utils'

export default function () {
    Object.defineProperty(Vue.prototype, '$utils', {
        get() {
            return utils
        },
    })

    session.fromStoreHandler(storeHandler)
    Object.defineProperty(Vue.prototype, '$session', {
        get() {
            return session
        },
    })
    // TODO:
    //  Extra registers for Vue

    // TODO
}