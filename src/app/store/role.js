import {adminRoleService as roleService} from '../services/default'

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
            roleService().index(params, (data) => {
                state.roles = data.models
                doneCallback(data.pagination)
            }, errorCallback, alwaysCallback)
        },

        export(store, {params, doneCallback, errorCallback, alwaysCallback}) {
            roleService().export(params, doneCallback, errorCallback, alwaysCallback)
        },

        import(store, {file, doneCallback, errorCallback, alwaysCallback}) {
            roleService().import(file, doneCallback, errorCallback, alwaysCallback)
        },

        create({state}, {params, doneCallback, errorCallback, alwaysCallback}) {
            roleService().store(params, (data) => {
                state.role = data.model
                doneCallback()
            }, errorCallback, alwaysCallback)
        },

        getById({state}, {id, doneCallback, errorCallback, alwaysCallback}) {
            if (state.role.id && state.role.id == id) {
                doneCallback()
                return
            }
            roleService().show(id, (data) => {
                state.role = data.model
                doneCallback()
            }, errorCallback, alwaysCallback)
        },

        edit({state}, {id, params, doneCallback, errorCallback, alwaysCallback}) {
            roleService().update(id, params, (data) => {
                state.role = data.model
                doneCallback()
            }, errorCallback, alwaysCallback)
        },

        delete(store, {ids, doneCallback, errorCallback, alwaysCallback}) {
            roleService().bulkDestroy(ids, {}, doneCallback, errorCallback, alwaysCallback)
        },

        destruct({state}) {
            state.roles = []
            state.role = {}
        },
    },
}
