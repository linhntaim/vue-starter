<template lang="pug">
    .card.shadow.mb-4
        .card-body.has-control
            form.row.search-form(@submit.prevent="onSubmitted()")
                .form-group.col-md-4.col-lg-3
                    label(for="searchCreatedFrom") {{ $t('pages.created_date_from') }}
                    calendar-input(v-if="calendarInputOptions" ref="searchCreatedFrom" v-model="searcher.params.created_date_from" :options="calendarInputOptions" :id="'searchCreatedFrom'" :placeholder="$t('pages.created_date_from')")
                .form-group.col-md-4.col-lg-3
                    label(for="searchCreatedTo") {{ $t('pages.created_date_to') }}
                    calendar-input(v-if="calendarInputOptions" ref="searchCreatedTo" v-model="searcher.params.created_date_to" :options="calendarInputOptions" :id="'searchCreatedTo'" :placeholder="$t('pages.created_date_to')")
                .form-group.col.nowrap
                    .btn-group
                        button.btn.btn-primary(:disabled="disabled" type="submit")
                            i.fas.fa-search.mr-2
                            | {{ $t('actions.search') }}
                        button.btn.btn-warning(v-if="searching" :disabled="disabled" @click="onClearSearchClicked()" type="button")
                            | ×
</template>

<script>
/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

import {dateTimer} from '../../../app/utils'
import {Searcher} from '@dsquare-gbu/vue-utils'
import moment from 'moment'
import CalendarInput from '../../components/CalendarInput'

export default {
    name: 'Search',
    components: {CalendarInput},
    props: {
        disabled: Boolean,
        searcher: Searcher,
    },
    data() {
        return {
            calendarInputOptions: '',
            shortDateFormat: '',
        }
    },
    computed: {
        searching() {
            return this.searcher.searching
        },
    },
    created() {
        this.shortDateFormat = dateTimer.getShortDateFormat()
        const today = moment().format(this.shortDateFormat)
        this.searcher.setParams({
            created_date_from: today,
            created_date_to: today,
        }, false)
    },
    methods: {
        init() {
            this.initSearcher()
        },
        initSearcher() {
            this.searcher.parseQuery(this.$route.query)

            this.initUi()

            this.$emit('searcherInitialized')
        },
        initUi() {
            this.calendarInputOptions = {
                format: this.shortDateFormat,
            }
        },
        onClearSearchClicked() {
            this.$refs.searchCreatedFrom.clear()
            this.$refs.searchCreatedTo.clear()

            this.searcher.clear()
            this.onSubmitted()
        },
        onSubmitted() {
            this.$emit('searched')
        },
    },
}
</script>
