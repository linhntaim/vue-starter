<template lang="pug">
    .card.shadow.mb-4
        .card-body.has-control
            .table-responsive
                table.table.table-bordered
                    thead
                        tr
                            th.text-center #
                            th.text-center
                                sorter-component(@sorted="searchBySorter()" :sorter="sorter" :title="$t('pages._me._notification.notified_at')" :sortBy="'created_at'")
                            th {{ $t('pages._me._notification.title') }}
                            th {{ $t('pages._me._notification.content') }}
                            th.text-center {{ $t('pages._me._notification.read_at') }}
                            th.text-center {{ $t('actions.actions') }}
                    tfoot
                        tr
                            th.text-center #
                            th.text-center
                                sorter-component(@sorted="searchBySorter()" :sorter="sorter" :title="$t('pages._me._notification.notified_at')" :sortBy="'created_at'")
                            th {{ $t('pages._me._notification.title') }}
                            th {{ $t('pages._me._notification.content') }}
                            th.text-center {{ $t('pages._me._notification.read_at') }}
                            th.text-center {{ $t('actions.actions') }}
                    tbody
                        tr(v-if="notifications.length <= 0")
                            td.text-center.py-4.text-gray-500(colspan="6")
                                span(v-if="loading") {{ $t('actions.loading') }}
                                span(v-else) {{ $t('pages.no_items') }}
                        tr(v-for="(notification, index) in notifications")
                            td.text-center {{ paginator.pagination.items.from + index }}
                            td {{ notification.sd_st_created_at }}
                            td {{ notification.title }}
                            td {{ notification.content }}
                            td.text-center {{ notification.sd_st_read_at }}
                            td.text-center
                                button.btn.btn-link.btn-sm(v-if="!notification.sd_st_read_at" :disabled="loading" @click.prevent="onReadClicked(notification)") {{ $t('pages._me._notification.mark_as_read') }}
            .clearfix
                paginator-component(:disabled="loading" :paginator="paginator" @pageChanged="searchByPaginator()")
</template>

<script>
/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

import {storeHandler, headTitle} from '../../../../app/utils'
import {mapActions, mapGetters} from '@dsquare-gbu/vue-uses'
import {Collection, DataPlot, ItemSelection, Sorter, Paginator} from '@dsquare-gbu/vue-utils'
import {ITEMS_PER_PAGE_LIST} from '@/app/config'
import helpers from '../../../../app/utils/helpers'
import PaginatorComponent from '../../../components/Paginator'
import SorterComponent from '../../../components/Sorter'

export default {
    name: 'Index',
    components: {SorterComponent, PaginatorComponent},
    data() {
        return {
            loading: false,

            itemSelection: new ItemSelection(),

            sorter: new Sorter(),
            paginator: new Paginator(ITEMS_PER_PAGE_LIST, storeHandler),
            params: new DataPlot(),
        }
    },
    computed: {
        ...mapGetters({
            notifications: 'accountNotification/notifications',
        }),
    },
    head: {
        title() {
            return {
                inner: headTitle(this.$t('pages._me._notification._index._')),
            }
        },
    },
    created() {
        this.paginator.parseQuery(this.$route.query)
        this.sorter.parseQuery(this.$route.query, 'created_at', 'desc')
    },
    mounted() {
        this.init()
    },
    methods: {
        ...mapActions({
            notificationSearch: 'accountNotification/search',
            notificationRead: 'accountNotification/read',
            notificationDelete: 'accountNotification/delete',
        }),
        init() {
            this.plotPaginator()
            this.plotSorter()

            this.search()
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
            this.notificationSearch({
                params: params,
                doneCallback: (pagination) => {
                    this.paginator.parsePagination(pagination)
                    this.itemSelection.reset().setAll((new Collection(this.notifications)).pluck('id'))
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
        onReadClicked(notification) {
            this.loading = true
            this.notificationRead({
                id: notification.id,
                doneCallback: () => {
                    this.search()
                },
                errorCallback: err => {
                    this.loading = false
                    this.$bus.emit('error', {messages: err.getMessages(), extra: err.getExtra()})
                },
            })
        },
    },
}
</script>
