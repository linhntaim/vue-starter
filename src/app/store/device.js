import {deviceService} from '../services/default/device'
import {deviceCookieStore} from '../utils'
import {serviceFactory} from '../services'
/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

import {APP_DEFAULT_SERVICE} from '../config'

const setDefaultServiceDeviceHeader = device => {
    serviceFactory.modify(defaultServiceInstance => defaultServiceInstance.addInstanceCallback('device', instance => {
        instance.defaults.headers.common[APP_DEFAULT_SERVICE.headers.device] = JSON.stringify(device)
        return instance
    }))
}

const applyDevice = device => {
    setDefaultServiceDeviceHeader(device)
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
                        device: data.model,
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