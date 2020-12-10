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
                    multiple-select2-input(
                        v-if="!localeChange.changed && select2Ready"
                        ref="searchPermissions"
                        :id="'searchPermissions'"
                        v-model="searcher.params.permissions"
                        :items="metadata.permissions"
                        :itemValue="'id'"
                        :itemText="'display_name'"
                        :required="false"
                        :options="permissionOptions")
                .col.nowrap
                    button.btn.btn-primary.btn-item.btn-item-left(:disabled="disabled || loading" type="submit")
                        i.fas.fa-search
                        | &nbsp;&nbsp;{{ $t('actions.search') }}
                    button.btn.btn-warning.btn-item.btn-item-left(v-if="searching" :disabled="disabled || loading" @click="onClearSearchClicked()" type="button" data-dismiss="modal") {{ $t('actions.clear_search') }}
</template>

<script>
/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

import {localeChange} from '../../../app/utils'
import {mapActions, mapGetters} from '@dsquare-gbu/vue-uses'
import {Searcher} from '@dsquare-gbu/vue-utils'
import MultipleSelect2Input from '../../components/MultipleSelect2Input'

export default {
    name: 'Search',
    components: {MultipleSelect2Input},
    props: {
        disabled: Boolean,
        searcher: Searcher,
    },
    data() {
        return {
            loading: false,

            permissionOptions: {
                placeholder: this.$tc('actions.select_what', {what: this.$tc('pages.permission', 2)}),
            },

            select2Ready: false,

            localeChange: localeChange.reset(),
            localeChangeHandlerId: null,
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
    destroyed() {
        this.localeChange.off(this.localeChangeHandlerId)
    },
    mounted() {
        this.localeChangeHandlerId = this.localeChange.on()
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

                    this.select2Ready = true
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
            this.$emit('searcherInitialized')
        },
        onClearSearchClicked() {
            // clear search
            this.searcher.clear()
            // clear some special inputs
            this.$refs.searchPermissions.clear()
            // search with clear
            this.onSubmitted()
        },
        onSubmitted() {
            this.$emit('searched')
        },
    },
}
</script>
