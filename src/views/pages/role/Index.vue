<template lang="pug">
    div
        search(ref="searchModal" :searcher="searcher" :disabled="loading" @searched="searchBySearcher" @searcherInitialized="searchBySearcher")
        .card.shadow.mb-4
            .card-body.has-control
                .btn-blocks.block-left
                    button.btn.btn-success(v-if="canExport" :disabled="loading" @click="onExportClicked")
                        i.fas.fa-file-export.mr-2
                        | {{ $t('actions.export') }}
                    button.btn.btn-success(v-if="canImport" :disabled="loading" @click="onImportClicked")
                        i.fas.fa-file-import.mr-2
                        | {{ $t('actions.import') }}
                .table-responsive
                    table.table.table-bordered
                        thead
                            tr
                                th.text-center #
                                th
                                    sorter-component(@sorted="searchBySorter" :sorter="sorter" :title="$t('pages.name')" :sortBy="'name'")
                                th
                                    sorter-component(@sorted="searchBySorter" :sorter="sorter" :title="$t('pages.display_name')" :sortBy="'display_name'")
                                th {{ $t('pages.description') }}
                                th {{ $tc('pages.permission', 2) }}
                                th.text-center(v-if="canAction") {{ $t('actions.actions') }}
                        tfoot
                            tr
                                th.text-center #
                                th
                                    sorter-component(@sorted="searchBySorter" :sorter="sorter" :title="$t('pages.name')" :sortBy="'name'")
                                th
                                    sorter-component(@sorted="searchBySorter" :sorter="sorter" :title="$t('pages.display_name')" :sortBy="'display_name'")
                                th {{ $t('pages.description') }}
                                th {{ $tc('pages.permission', 2) }}
                                th.text-center(v-if="canAction") {{ $t('actions.actions') }}
                        tbody
                            tr(v-if="roles.length <= 0")
                                td.text-center.py-4.text-gray-500(:colspan="colspan")
                                    span(v-if="loading") {{ $t('actions.loading') }}
                                    span(v-else) {{ $t('pages.no_items') }}
                            tr(v-for="(role, index) in roles")
                                td.text-center {{ paginator.pagination.items.from + index }}
                                td.nowrap {{ role.name }}
                                td.nowrap {{ role.display_name }}
                                td(v-html="role.html_description")
                                td
                                    .nowrap(v-for="permission in role.permissions") {{ permission.name }}
                                td.text-center(v-if="canAction")
                                    button.btn.btn-link.btn-sm.nowrap(v-if="canEdit" :disabled="loading" @click.prevent="onEditClicked(role)") {{ $t('actions.edit') }}
                                    button.btn.btn-link.btn-sm.nowrap(v-if="canDelete" :disabled="loading" @click.prevent="onDeleteClicked(role)") {{ $t('actions.delete') }}
                .clearfix
                    paginator-component(v-if="roles.length" :disabled="loading" :paginator="paginator" @pageChanged="searchByPaginator")
</template>

<script>
/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

import {storeHandler, headTitle, permit} from '../../../app/utils'
import {mapActions, mapGetters, mapMutations} from '@linhntaim/vue-uses'
import {DataPlot, Paginator, Searcher, Sorter, TypeObject} from '@linhntaim/vue-utils'
import {ITEMS_PER_PAGE_LIST} from '../../../app/config'
import PaginatorComponent from '../../components/Paginator'
import Search from './Search'
import SorterComponent from '../../components/Sorter'

const requiredPermissions = [
    'role-manage',
]

export default {
    name: 'Index',
    components: {PaginatorComponent, Search, SorterComponent},
    data() {
        return {
            loading: false,

            searcher: new Searcher(),
            sorter: new Sorter(),
            paginator: new Paginator(ITEMS_PER_PAGE_LIST, storeHandler),
            params: new DataPlot(),

            requiredPermissions: {},
        }
    },
    computed: {
        ...mapGetters({
            accountPermissions: 'account/permissions',
            roles: 'role/roles',
        }),
        searching() {
            return this.searcher.searching
        },
        canExport() {
            return this.requiredPermissions['role-manage']
        },
        canImport() {
            return this.requiredPermissions['role-manage']
        },
        canView() {
            return this.requiredPermissions['role-manage']
        },
        canCreate() {
            return this.requiredPermissions['role-manage']
        },
        canEdit() {
            return this.requiredPermissions['role-manage']
        },
        canDelete() {
            return this.requiredPermissions['role-manage']
        },
        canAction() {
            return this.canEdit || this.canDelete
        },
        canActions() {
            return this.canDelete
        },
        colspan() {
            let colspan = 6
            if (!this.canAction) {
                --colspan
            }
            return colspan
        },
    },
    head: {
        title() {
            return {
                inner: headTitle(this.$t('pages._role._index._')),
            }
        },
    },
    created() {
        this.paginator.parseQuery(this.$route.query)
        this.sorter.parseQuery(this.$route.query, 'created_at', 'desc')
        this.requiredPermissions = permit.matchWithNames(requiredPermissions, this.accountPermissions)
    },
    mounted() {
        this.init()
    },
    methods: {
        ...mapMutations({
            setRole: 'role/setRole',
        }),
        ...mapActions({
            roleSearch: 'role/search',
            roleDelete: 'role/delete',
            roleExport: 'role/export',
            roleImport: 'role/import',
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
        searchBySearcher($event) {
            this.searcher.saveState()
            this.params.plot('searcher', this.searcher.params)
            if ($event && $event.clear) {
                this.paginator.setPage(1)
                this.plotPaginator()
            }
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
        ifPageEmpty() {
            if (this.roles.length <= 0) {
                if (this.paginator.pagination.current > 1) {
                    this.paginator.setPage(1)
                    this.plotPaginator()
                    this.search()
                    return true
                }
            }
            return false
        },
        search() {
            this.loading = true
            const params = this.params.data()
            this.$router.softReplace({query: TypeObject.clone(params)})
            this.roleSearch({
                params: params,
                doneCallback: (pagination) => {
                    this.paginator.parsePagination(pagination)
                    if (!this.ifPageEmpty()) {
                        this.loading = false
                    }
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
        onEditClicked(role) {
            this.setRole({
                role: role,
            })
            this.$router.push({name: 'role___edit', params: {id: role.id}})
        },
        onDeleteClicked(role) {
            this.$bus.emit('confirm', {
                message: this.$t('pages._role._index.want_delete'),
                confirmCallback: () => {
                    this.loading = true
                    this.roleDelete({
                        ids: [role.id],
                        doneCallback: () => {
                            this.loading = false
                            this.search()
                        },
                        errorCallback: err => {
                            this.loading = false
                            this.$bus.emit('error', {messages: err.getMessages(), extra: err.getExtra()})
                        },
                    })
                },
            })
        },
        onExportClicked() {
            this.$bus.emit('export', {
                name: 'role_index',
                exportCallback: (doneCallback, errorCallback) => this.roleExport({
                    params: this.params.data(),
                    doneCallback,
                    errorCallback,
                }),
            })
        },
        onImportClicked() {
            this.$bus.emit('import', {
                okCallback: file => {
                    this.loading = true
                    this.roleImport({
                        file: file,
                        doneCallback: () => {
                            this.loading = false
                            this.search()
                        },
                        errorCallback: err => {
                            this.loading = false
                            this.$bus.emit('error', {messages: err.getMessages(), extra: err.getExtra()})
                        },
                    })
                },
            })
        },
    },
}
</script>
