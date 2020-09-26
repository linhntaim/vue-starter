<template lang="pug">
    div
        search(ref="searchModal" :searcher="searcher" :disabled="loading" @searched="searchBySearcher" @searcherInitialized="searchBySearcher")
        .card.shadow.mb-4
            .card-body.has-control
                .clearfix
                    button.btn.btn-success.btn-item.btn-item-left(v-if="canExport" :disabled="loading" @click="onExportClicked()")
                        i.fas.fa-file-export
                        | &nbsp;&nbsp;{{ $t('actions.export') }}
                .table-responsive
                    table.table.table-bordered
                        thead
                            tr
                                th.text-center #
                                th
                                    sorter-component(@sorted="searchBySorter()" :sorter="sorter" :title="$t('pages.name')" :sortBy="'name'")
                                th
                                    sorter-component(@sorted="searchBySorter()" :sorter="sorter" :title="$t('pages.display_name')" :sortBy="'display_name'")
                                th {{ $tc('pages.permission', 2) }}
                                th.text-center(v-if="canAction") {{ $t('actions.actions') }}
                        tfoot
                            tr
                                th.text-center #
                                th
                                    sorter-component(@sorted="searchBySorter()" :sorter="sorter" :title="$t('pages.name')" :sortBy="'name'")
                                th
                                    sorter-component(@sorted="searchBySorter()" :sorter="sorter" :title="$t('pages.display_name')" :sortBy="'display_name'")
                                th {{ $tc('pages.permission', 2) }}
                                th.text-center(v-if="canAction") {{ $t('actions.actions') }}
                        tbody
                            tr(v-if="roles.length <= 0")
                                td.text-center.py-4.text-gray-500(:colspan="colspan")
                                    span(v-if="loading") {{ $t('actions.loading') }}
                                    span(v-else) {{ $t('pages.no_items') }}
                            tr(v-for="(role, index) in roles")
                                td.text-center {{ paginator.pagination.items.from + index }}
                                td {{ role.name }}
                                td {{ role.display_name }}
                                td
                                    div(v-for="permission in role.permissions") {{ permission.name }}
                                td.text-center(v-if="canAction")
                                    button.btn.btn-link.btn-sm(v-if="canEdit" :disabled="loading" @click.prevent="onEditClicked(role)") {{ $t('actions.edit') }}
                                    button.btn.btn-link.btn-sm(v-if="canDelete" :disabled="loading" @click.prevent="onDeleteClicked(role)") {{ $t('actions.delete') }}
                .clearfix
                    paginator-component(:disabled="loading" :paginator="paginator" @pageChanged="searchByPaginator()")
</template>

<script>
    import {cacheHandler, permissionChecker} from '../../../app/utils'
    import {mapActions, mapGetters, mapMutations} from '@dsquare-gbu/vue-uses'
    import {Collection, DataPlot, Sorter, Searcher, ItemSelection, Paginator} from '@dsquare-gbu/vue-utils'
    import {ITEMS_PER_PAGE_LIST} from '../../../app/config'
    import helpers from '../../../app/utils/helpers'
    import PaginatorComponent from '../../components/Paginator'
    import Search from './Search'
    import SorterComponent from '../../components/Sorter'

    const requiredPermissions = [
        'role-manage',
    ]

    export default {
        name: 'Index',
        components: {Search, SorterComponent, PaginatorComponent},
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
                roles: 'role/roles',
            }),
            searching() {
                return this.searcher.searching
            },
            canExport() {
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
                let colspan = 5
                if (!this.canAction) --colspan
                return colspan
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
                setRole: 'role/setRole',
            }),
            ...mapActions({
                roleSearch: 'role/search',
                roleDelete: 'role/delete',
                roleExport: 'role/export',
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
                this.roleSearch({
                    params: params,
                    doneCallback: (pagination) => {
                        this.paginator.parsePagination(pagination)
                        this.itemSelection.reset().setAll((new Collection(this.roles)).pluck('id'))
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
            onBulkDeleteClicked() {
                this.$bus.emit('confirm', {
                    message: this.$t('pages._role._index.want_delete_many'),
                    confirmCallback: () => {
                        this.loading = true
                        this.roleDelete({
                            ids: this.itemSelection.selected,
                            doneCallback: () => {
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
                    name: 'role',
                    exportCallback: (doneCallback, errorCallback) => this.roleExport({
                        params: this.params.data(),
                        doneCallback,
                        errorCallback,
                    }),
                })
            },
        },
    }
</script>
