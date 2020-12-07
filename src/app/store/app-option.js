import {adminAppOptionService as appOptionService} from '../services/default'

export default {
    namespaced: true,
    state: () => ({}),
    getters: {},
    mutations: {},
    actions: {
        save(store, {params, doneCallback, errorCallback, alwaysCallback}) {
            appOptionService().save(params, doneCallback, errorCallback, alwaysCallback)
        },

        saveMany(store, {options, doneCallback, errorCallback, alwaysCallback}) {
            appOptionService().saveMany(options, doneCallback, errorCallback, alwaysCallback)
        },
    },
}
