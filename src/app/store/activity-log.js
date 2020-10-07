import {activityLogAdminService} from '../services/default/admin-activity-log'

export default {
    namespaced: true,
    state: () => ({
        activityLogs: [],
        activityLog: {},
    }),
    getters: {
        activityLogs: state => state.activityLogs,
        activityLog: state => state.activityLog,
    },
    mutations: {
        setActivityLog(state, {activityLog}) {
            state.activityLog = activityLog
        },
    },
    actions: {
        search({state}, {params, doneCallback, errorCallback, alwaysCallback}) {
            activityLogAdminService().index(params, (data) => {
                state.activityLogs = data.models
                doneCallback(data.pagination)
            }, errorCallback, alwaysCallback)
        },

        getById({state}, {id, doneCallback, errorCallback, alwaysCallback}) {
            if (state.activityLog.id && state.activityLog.id == id) {
                doneCallback()
                return
            }
            activityLogAdminService().show(id, (data) => {
                state.activityLog = data.model
                doneCallback()
            }, errorCallback, alwaysCallback)
        },

        delete(store, {ids, doneCallback, errorCallback, alwaysCallback}) {
            activityLogAdminService().bulkDestroy(ids, {}, doneCallback, errorCallback, alwaysCallback)
        },

        destruct({state}) {
            state.activityLogs = []
            state.activityLog = {}
        },
    },
}
