import {dataExportAdminService} from '../services/default/admin-data-export'

export default {
    namespaced: true,
    state: () => ({
        dataExports: [],
        dataExport: {},
    }),
    getters: {
        dataExports: state => state.dataExports,
        dataExport: state => state.dataExport,
    },
    mutations: {
        setDataExport(state, {dataExport}) {
            state.dataExport = dataExport
        },
    },
    actions: {
        search({state}, {params, doneCallback, errorCallback, alwaysCallback}) {
            dataExportAdminService().index(params, (data) => {
                state.dataExports = data.models
                doneCallback(data.pagination)
            }, errorCallback, alwaysCallback)
        },

        destruct({state}) {
            state.dataExports = []
            state.dataExport = {}
        },
    },
}
