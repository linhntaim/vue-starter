import {prerequisiteService} from '../services/default/prerequisite'
import {DEFAULT_PREREQUISITE_LIFETIME} from '../config'

const expiredTime = () => (new Date()).getTime() + DEFAULT_PREREQUISITE_LIFETIME

export default {
    namespaced: true,
    state: () => ({
        metadata: {},
        expired: {},
    }),
    getters: {
        metadata: state => state.metadata,
    },
    mutations: {
        setMetadata(state, {data}) {
            for (const name in data) {
                state.metadata[name] = data[name]
                state.expired[name] = expiredTime()
            }
        },

        resetMetadata(state, {name = null}) {
            if (name) {
                delete state.metadata[name]
                delete state.expired[name]
            } else {
                state.metadata = {}
                state.expired = {}
            }
        },
    },
    actions: {
        reset({commit}, {name = null}) {
            commit('resetMetadata', {
                name: name,
            })
        },

        require({commit, state}, {names, doneCallback = null, errorCallback = null, alwaysCallback = null}) {
            const freshNames = []
            names.forEach(name => {
                if (!(name in state.metadata && name in state.expired && state.expired[name] <= expiredTime())) {
                    freshNames.push(name)
                }
            })

            if (freshNames.length <= 0) {
                if (doneCallback) doneCallback()
                if (alwaysCallback) alwaysCallback()
                return
            }

            prerequisiteService().require(
                freshNames,
                (data) => {
                    commit('setMetadata', {
                        data: data,
                    })

                    if (doneCallback) doneCallback()
                },
                errorCallback,
                alwaysCallback,
            )
        },
    },
}
