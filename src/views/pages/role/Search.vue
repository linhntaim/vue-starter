<template lang="pug">
    .card.shadow.mb-4
        .card-body.has-control
            form.row.search-form(@submit.prevent="onSubmitted()")
                .form-group.col-md-4.col-lg-3
                    label(for="searchName") {{ $t('pages.name') }}
                    input#searchName.form-control(v-model="searcher.params.name" :placeholder="$t('pages.name')" type="text")
                .form-group.col-md-4.col-lg-3
                    label(for="searchDisplayName") {{ $t('pages.display_name') }}
                    input#searchDisplayName.form-control(v-model="searcher.params.display_name" :placeholder="$t('pages.display_name')" type="text")
                .form-group.col-md-4.col-lg-3
                    label(for="searchPermissions") {{ $tc('pages.permission', 2) }}
                    select#searchPermissions.form-control(multiple :data-placeholder="$tc('pages.permission', 2)")
                        option(value="") {{ $tc('actions.select_what', {what: $tc('pages.permission', 2)}) }}
                        option(v-for="metaPermission in metadata.permissions" :value="metaPermission.id" :selected="searcher.params.permissions.indexOf(metaPermission.id.toString())!==-1") {{ metaPermission.display_name }}
                .col.nowrap
                    button.btn.btn-primary.btn-item.btn-item-left(:disabled="disabled || loading" type="submit")
                        i.fas.fa-search
                        | &nbsp;&nbsp;{{ $t('actions.search') }}
                    button.btn.btn-warning.btn-item.btn-item-left(v-if="searching" :disabled="disabled || loading" @click="onClearSearchClicked()" type="button" data-dismiss="modal") {{ $t('actions.clear_search') }}
</template>

<script>
    import {mapActions, mapGetters} from '@dsquare-gbu/vue-uses'
    import {ui, timeoutCaller} from '../../../app/utils'
    import {Searcher} from '@dsquare-gbu/vue-utils'

    const $uis = {}

    export default {
        name: 'Search',
        props: {
            disabled: Boolean,
            searcher: Searcher,
        },
        data() {
            return {
                loading: false,
            }
        },
        computed: {
            ...mapGetters({
                metadata: 'prerequisite/metadata',
            }),
            searching() {
                return this.searcher.searching
            },
        },
        created() {
            this.searcher.setParams({
                name: '',
                display_name: '',
                permissions: [],
            })
        },
        mounted() {
            $uis._ = ui.query('#searchModal').get()
            $uis.searchPermissions = ui.query('#searchPermissions').get()
        },
        methods: {
            ...mapActions({
                require: 'prerequisite/require',
            }),
            init() {
                this.loading = true
                this.require({
                    names: ['permissions'],
                    doneCallback: () => {
                        this.initSearcher()

                        this.initUi()

                        this.loading = false
                    },
                    errorCallback: err => {
                        this.loading = false
                        this.$bus.emit('error', {messages: err.getMessages(), extra: err.getExtra()})
                    },
                })
            },
            initSearcher() {
                this.searcher.parseQuery(this.$route.query)

                this.$forceUpdate()

                this.$emit('searcherInitialized')
            },
            initUi() {
                timeoutCaller.register(() => {
                    ui.select2($uis.searchPermissions, selected => {
                        this.searcher.params.permissions = selected
                    })
                })
            },
            onClearSearchClicked() {
                this.searcher.clear()

                $uis.searchPermissions.val([]).trigger('change')

                this.onSubmitted()
            },
            onSubmitted() {
                $uis._.modal('hide')

                this.$emit('searched')
            },
        },
    }
</script>
