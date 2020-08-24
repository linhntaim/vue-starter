import {roleAdminService} from '../services/default/admin-role'

export default {
    namespaced: true,
    state: () => ({
        roles: [],
        role: {},
    }),
    getters: {
        roles: state => state.roles,
        role: state => state.role,
    },
    mutations: {
        setRole(state, {role}) {
            state.role = role
        },
    },
    actions: {
        search({state}, {params, doneCallback, errorCallback, alwaysCallback}) {
            roleAdminService().index(params, (data) => {
                state.roles = data.models
                doneCallback(data.pagination)
            }, errorCallback, alwaysCallback)
        },

        create({state}, {params, doneCallback, errorCallback, alwaysCallback}) {
            roleAdminService().store(params, (data) => {
                state.role = data.model
                doneCallback()
            }, errorCallback, alwaysCallback)
        },

        getById({state}, {id, doneCallback, errorCallback, alwaysCallback}) {
            if (state.role.id && state.role.id == id) {
                doneCallback()
                return
            }
            roleAdminService().show(id, (data) => {
                state.role = data.model
                doneCallback()
            }, errorCallback, alwaysCallback)
        },

        edit({state}, {id, params, doneCallback, errorCallback, alwaysCallback}) {
            roleAdminService().update(id, params, (data) => {
                state.role = data.model
                doneCallback()
            }, errorCallback, alwaysCallback)
        },

        delete(store, {ids, doneCallback, errorCallback, alwaysCallback}) {
            roleAdminService().bulkDestroy(ids, {}, doneCallback, errorCallback, alwaysCallback)
        },

        destruct({state}) {
            state.roles = []
            state.role = {}
        },
    },
}
