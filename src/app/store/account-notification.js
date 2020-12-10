/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

import {adminAccountNotificationService as accountNotificationService} from '../services/default'

export default {
    namespaced: true,
    state: () => ({
        notifications: [],
        notification: {},
    }),
    getters: {
        notifications: state => state.notifications,
        notification: state => state.notification,
    },
    mutations: {
        setNotification(state, {notification}) {
            state.notification = notification
        },
    },
    actions: {
        search({state}, {params, doneCallback, errorCallback, alwaysCallback}) {
            accountNotificationService().index(params, (data) => {
                state.notifications = data.models
                doneCallback(data.pagination)
            }, errorCallback, alwaysCallback)
        },

        read(store, {id, doneCallback, errorCallback, alwaysCallback}) {
            accountNotificationService().read(id, doneCallback, errorCallback, alwaysCallback)
        },

        delete(store, {ids, doneCallback, errorCallback, alwaysCallback}) {
            accountNotificationService().bulkDestroy(ids, {}, doneCallback, errorCallback, alwaysCallback)
        },

        destruct({state}) {
            state.notifications = []
            state.notification = {}
        },
    },
}
