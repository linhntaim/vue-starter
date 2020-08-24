import {appOptionAdminService} from '../services/default/admin-app-option'

export default {
    namespaced: true,
    state: () => ({}),
    getters: {},
    mutations: {},
    actions: {
        save(store, {params, doneCallback, errorCallback, alwaysCallback}) {
            appOptionAdminService().save(params, doneCallback, errorCallback, alwaysCallback)
        },

        saveMany(store, {options, doneCallback, errorCallback, alwaysCallback}) {
            appOptionAdminService().saveMany(options, doneCallback, errorCallback, alwaysCallback)
        },
    },
}
