/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

import {adminActivityLogService as activityLogService} from '../services/default'

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
            activityLogService().index(params, (data) => {
                state.activityLogs = data.models
                doneCallback(data.pagination)
            }, errorCallback, alwaysCallback)
        },

        getById({state}, {id, doneCallback, errorCallback, alwaysCallback}) {
            if (state.activityLog.id && state.activityLog.id == id) {
                doneCallback()
                return
            }
            activityLogService().show(id, (data) => {
                state.activityLog = data.model
                doneCallback()
            }, errorCallback, alwaysCallback)
        },

        delete(store, {ids, doneCallback, errorCallback, alwaysCallback}) {
            activityLogService().bulkDestroy(ids, {}, doneCallback, errorCallback, alwaysCallback)
        },

        destruct({state}) {
            state.activityLogs = []
            state.activityLog = {}
        },
    },
}
