/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

import {
    commonDeviceService as deviceService,
} from '../services/default'
import {deviceCookieStore} from '../utils'
import {defaultServiceModifyHeader} from '../services'
import {APP_DEFAULT_SERVICE} from '../config'

const applyDevice = device => {
    defaultServiceModifyHeader(APP_DEFAULT_SERVICE.headers.device, device)
    deviceCookieStore.store(device)
}

export default {
    namespaced: true,
    state: () => ({
        device: null,
        failed: false,
    }),
    getters: {
        device: state => state.device,
        existed: state => state.device != null,
        failed: state => state.failed,
    },
    mutations: {
        setDevice(state, {device}) {
            state.device = device
            state.failed = false

            applyDevice(state.device)
        },
    },
    actions: {
        current({commit}, {device, doneCallback, errorCallback}) {
            deviceService().currentSave(
                device.provider,
                device.secret,
                data => {
                    commit('setDevice', {
                        device: {
                            provider: data.model.provider,
                            secret: data.model.secret,
                        },
                    })
                    doneCallback(data)
                },
                errorCallback,
            )
        },

        fails({state}) {
            state.failed = true
        },
    },
}