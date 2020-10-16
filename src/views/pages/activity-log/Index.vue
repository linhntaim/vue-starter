<template lang="pug">
    div
        search(ref="searchModal" :searcher="searcher" :disabled="loading" @searched="searchBySearcher" @searcherInitialized="searchBySearcher")
        .card.shadow.mb-4
            .card-body.has-control
                .table-responsive
                    table.table.table-bordered
                        thead
                            tr
                                th.text-center #
                                th.text-center
                                    sorter-component(@sorted="searchBySorter()" :sorter="sorter" :title="$t('pages.created_at')" :sortBy="'created_at'")
                                th {{ $t('pages._activity_log.acted_by') }}
                                th
                                    sorter-component(@sorted="searchBySorter()" :sorter="sorter" :title="$t('pages._activity_log.screen')" :sortBy="'screen'")
                                th
                                    sorter-component(@sorted="searchBySorter()" :sorter="sorter" :title="$t('pages._activity_log.action')" :sortBy="'action'")
                                th.text-center {{ $t('pages._activity_log.device') }}
                                th.text-center(v-if="canAction") {{ $t('actions.actions') }}
                        tfoot
                            tr
                                th.text-center #
                                th.text-center
                                    sorter-component(@sorted="searchBySorter()" :sorter="sorter" :title="$t('pages.created_at')" :sortBy="'created_at'")
                                th {{ $t('pages._activity_log.acted_by') }}
                                th
                                    sorter-component(@sorted="searchBySorter()" :sorter="sorter" :title="$t('pages._activity_log.screen')" :sortBy="'screen'")
                                th
                                    sorter-component(@sorted="searchBySorter()" :sorter="sorter" :title="$t('pages._activity_log.action')" :sortBy="'action'")
                                th.text-center {{ $t('pages._activity_log.device') }}
                                th.text-center(v-if="canAction") {{ $t('actions.actions') }}
                        tbody
                            tr(v-if="activityLogs.length <= 0")
                                td.text-center.py-4.text-gray-500(:colspan="colspan")
                                    span(v-if="loading") {{ $t('actions.loading') }}
                                    span(v-else) {{ $t('pages.no_items') }}
                            tr(v-for="(activityLog, index) in activityLogs")
                                td.text-center {{ paginator.pagination.items.from + index }}
                                td.text-center {{ activityLog.sd_st_created_at }}
                                td {{ activityLog.admin.display_name }}
                                td {{ $t('def.screen.' + activityLog.screen) }}
                                td {{ $t('def.activity_action.' + activityLog.action) }}
                                td.text-center
                                    .badge.badge-primary(v-for="clientIp in activityLog.device.client_ips") {{ clientIp }}
                                td.text-center(v-if="canAction")
                                    button.btn.btn-link.btn-sm(v-if="canView" :disabled="loading" @click.prevent="onViewClicked(activityLog)") {{ $t('actions.view') }}
                .clearfix
                    paginator-component(:disabled="loading" :paginator="paginator" @pageChanged="searchByPaginator()")
        view-modal(ref="viewModel")
</template>

<script>
/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

import {cacheHandler, headTitle, permissionChecker} from '../../../app/utils'
import {mapActions, mapGetters, mapMutations} from '@dsquare-gbu/vue-uses'
import {Collection, DataPlot, ItemSelection, Searcher, Sorter, Paginator} from '@dsquare-gbu/vue-utils'
import {ITEMS_PER_PAGE_LIST} from '../../../app/config'
import helpers from '../../../app/utils/helpers'
import PaginatorComponent from '../../components/Paginator'
import Search from './Search'
import SorterComponent from '../../components/Sorter'
import ViewModal from './ViewModal'

const requiredPermissions = [
    'activity-log-manage',
]

export default {
    name: 'Index',
    components: {ViewModal, Search, SorterComponent, PaginatorComponent},
    data() {
        return {
            loading: false,

            itemSelection: new ItemSelection(),

            searcher: new Searcher(),
            sorter: new Sorter(),
            paginator: new Paginator(ITEMS_PER_PAGE_LIST, cacheHandler),
            params: new DataPlot(),

            requiredPermissions: {},
        }
    },
    computed: {
        ...mapGetters({
            accountPermissions: 'account/permissions',
            activityLogs: 'activityLog/activityLogs',
        }),
        searching() {
            return this.searcher.searching
        },
        canView() {
            return this.requiredPermissions['activity-log-manage']
        },
        canAction() {
            return this.canView
        },
        colspan() {
            let colspan = 7
            if (!this.canAction) --colspan
            return colspan
        },
    },
    head: {
        title() {
            return {
                inner: headTitle(this.$t('pages._activity_log._index._')),
            }
        },
    },
    created() {
        this.paginator.parseQuery(this.$route.query)
        this.sorter.parseQuery(this.$route.query, 'created_at', 'desc')
        this.requiredPermissions = permissionChecker.checkByNames(requiredPermissions, this.accountPermissions)
    },
    mounted() {
        this.init()
    },
    methods: {
        ...mapMutations({
            setActivityLog: 'activityLog/setActivityLog',
        }),
        ...mapActions({
            activityLogSearch: 'activityLog/search',
        }),
        init() {
            this.plotPaginator()
            this.plotSorter()

            this.$refs.searchModal.init()
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
                items_per_page: this.paginator.pagination.itemsPerPage,
            })
        },
        searchBySearcher() {
            this.searcher.saveState()
            this.params.plot('searcher', this.searcher.params)
            this.search()
        },
        searchBySorter() {
            this.plotSorter()
            this.search()
        },
        searchByPaginator() {
            this.plotPaginator()
            this.search()
        },
        search() {
            this.loading = true
            const params = this.params.data()
            this.$router.softReplace({query: helpers.object.clone(params)})
            this.activityLogSearch({
                params: params,
                doneCallback: (pagination) => {
                    this.paginator.parsePagination(pagination)
                    this.itemSelection.reset().setAll((new Collection(this.activityLogs)).pluck('id'))
                    this.loading = false
                },
                errorCallback: err => {
                    this.loading = false
                    this.$bus.emit('error', {messages: err.getMessages(), extra: err.getExtra()})
                },
            })
        },
        onSyncClicked() {
            this.search()
        },
        onViewClicked(activityLog) {
            this.setActivityLog({
                activityLog,
            })
            this.$refs.viewModel.open()
        },
    },
}
</script>
