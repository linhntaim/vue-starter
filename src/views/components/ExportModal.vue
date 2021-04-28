<template lang="pug">
    #exportModal.modal.fade(tabindex="-1" role="dialog" data-backdrop="static")
        .modal-dialog.modal-md.modal-lg(role="document")
            .modal-content
                .modal-header
                    h5.modal-title {{ title }}
                    button.close(type="button" data-dismiss="modal" aria-label="Close")
                        span(aria-hidden="true") ×
                .modal-body.has-control
                    error-box(:error="error")
                    .clearfix
                        button.btn.btn-primary.btn-item.btn-item-right.btn-short.btn-short-xs(:disabled="loading" @click="onSyncClicked()")
                            i.fas.fa-sync-alt
                            span &nbsp;&nbsp;{{ $t('actions.sync') }}
                        button.btn.btn-success.btn-item(:disabled="loading" @click="onExportClicked()")
                            i.fas.fa-file-export
                            span &nbsp;&nbsp;{{ $t('actions.export') }}
                    .table-responsive
                        table.table.table-bordered
                            thead
                                tr
                                    th.text-center #
                                    th.text-center {{ $t('pages.created_at') }}
                                    th.text-center {{ $t('pages.status') }}
                                    th.text-center {{ $t('actions.actions') }}
                            tfoot
                                tr
                                    th.text-center #
                                    th.text-center {{ $t('pages.created_at') }}
                                    th.text-center {{ $t('pages.status') }}
                                    th.text-center {{ $t('actions.actions') }}
                            tbody
                                tr(v-if="dataExports.length <= 0")
                                    td.text-center.py-4.text-gray-500(:colspan="5")
                                        span(v-if="loading") {{ $t('actions.loading') }}
                                        span(v-else) {{ $t('pages.no_items') }}
                                tr(v-for="(dataExport, index) in dataExports")
                                    td.text-center {{ paginator.pagination.items.from + index }}
                                    td.text-center {{ dataExport.sd_st_created_at }}
                                    td.text-center
                                        .badge.badge-warning(v-if="dataExport.state == exportStateDefs.exporting")
                                            | {{ $t('def.export_state.exporting') }}
                                        .badge.badge-success(v-else-if="dataExport.state == exportStateDefs.exported")
                                            | {{ $t('def.export_state.exported') }}
                                        .badge.badge-danger(v-else-if="dataExport.state == exportStateDefs.failed")
                                            | {{ $t('def.export_state.failed') }}
                                    td.text-center
                                        a.btn.btn-link.btn-sm(v-if="dataExport.state == exportStateDefs.exported" :class="{disabled: loading}" :href="authUrl(dataExport.url)" target="_blank")
                                            | {{ $t('actions.download') }}
                    .clearfix
                        paginator-component(:disabled="loading" :paginator="paginator" @pageChanged="searchByPaginator()")
                .modal-footer
                    button.btn.btn-secondary(type="button" data-dismiss="modal") {{ $t('actions.close') }}
</template>

<script>
/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

import {mapActions, mapGetters} from '@linhntaim/vue-uses'
import {AuthUrl, storeHandler, ui} from '../../app/utils'
import {DataPlot, Paginator, Sorter} from '@linhntaim/vue-utils'
import {ERROR_LEVEL_DEF, EXPORT_STATE_DEF, ITEMS_PER_PAGE_LIST} from '../../app/config'
import ErrorBox from './ErrorBox'
import PaginatorComponent from './Paginator'

export default {
    name: 'ExportModal',
    components: {PaginatorComponent, ErrorBox},
    data() {
        const LABEL_TITLE = this.$t('components.export._')

        return {
            uis: {},

            LABEL_TITLE,

            loading: false,

            title: LABEL_TITLE,

            error: null,

            sorter: new Sorter(),
            paginator: new Paginator(ITEMS_PER_PAGE_LIST, storeHandler),
            params: new DataPlot(),

            exportCallback: null,

            exportStateDefs: EXPORT_STATE_DEF,
        }
    },
    computed: {
        ...mapGetters({
            dataExports: 'dataExport/dataExports',
            accountAuthorizationParams: 'account/authorizationParams',
        }),
    },
    created() {
        this.sorter.parseQuery({}, 'created_at', 'desc')
    },
    mounted() {
        this.uis.$ = ui.query('#exportModal').get()

        this.$bus.on('export', ({title, name, exportCallback}) => {
            this.show(title, name, exportCallback)
        })
    },
    methods: {
        ...mapActions({
            dataExportSearch: 'dataExport/search',
        }),
        show(title, name, exportCallback) {
            this.title = title ? title : this.LABEL_TITLE

            this.params.plot('default', {
                names: [name],
            })

            this.exportCallback = exportCallback

            this.plotPaginator()
            this.plotSorter()
            this.search()

            this.uis.$.modal('show')
        },
        plotSorter() {
            this.params.plot('sorter', {
                sort_by: this.sorter.by,
                sort_order: this.sorter.order,
            })
        },
        plotPaginator() {
            this.params.plot('paginator', {
                page: this.paginator.pagination.current,
                items_per_page: this.paginator.pagination.items_per_page,
            })
        },
        searchByPaginator() {
            this.plotPaginator()
            this.search()
        },
        search() {
            this.loading = true
            this.error = null
            const params = this.params.data()
            this.dataExportSearch({
                params: params,
                doneCallback: (pagination) => {
                    this.paginator.parsePagination(pagination)
                    this.loading = false
                },
                errorCallback: err => {
                    this.loading = false
                    this.error = {
                        messages: err.getMessages(),
                        extra: err.getExtra(),
                        level: ERROR_LEVEL_DEF.error,
                    }
                },
            })
        },
        onSyncClicked() {
            this.search()
        },
        onExportClicked() {
            this.loading = true
            this.error = null
            this.exportCallback && this.exportCallback(
                () => {
                    this.search()
                },
                err => {
                    this.loading = false
                    this.error = {
                        messages: err.getMessages(),
                        extra: err.getExtra(),
                        level: ERROR_LEVEL_DEF.error,
                    }
                },
            )
        },
        authUrl(url) {
            return new AuthUrl(url, this.accountAuthorizationParams).get()
        },
    },
}
</script>
