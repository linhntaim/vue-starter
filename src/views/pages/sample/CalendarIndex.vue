<template lang="pug">
    .card.shadow.mb-4
        .card-header.py-3
            h6.m-0.font-weight-bold.text-primary {{ $t('pages._sample._calendar_index._') }}
        form(@submit.prevent="onSubmitted()")
            .card-body
                .form-group
                    label.required(for="inputCalendar") Date
                    calendar-input(v-if="calendarInputOptions" ref="inputCalendar" v-model="date" :options="calendarInputOptions" :id="'inputCalendar'")
                .form-group
                    label.required(for="inputCalendar2") Date (with value)
                    calendar-input(v-if="calendarInputOptions2" ref="inputCalendar" v-model="date2" :options="calendarInputOptions" :id="'inputCalendar'")
            .card-footer.clearfix
                button.btn.btn-secondary.float-left(:disabled="loading" type="button" @click="onReset") {{ $t('actions.reset') }}
                button.btn.btn-primary.float-right(:disabled="loading" type="submit")
                    i.fas.fa-circle-notch.fa-spin(v-if="loading")
                    span(v-else) {{ $t('actions.submit') }}
</template>

<script>
/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

import {dateTimer, headTitle} from '../../../app/utils'
import CalendarInput from '../../components/CalendarInput'
import moment from 'moment'

export default {
    name: 'CalendarIndex',
    components: {CalendarInput},
    data() {
        return {
            loading: false,

            date: '',
            calendarInputOptions: null,

            date2: this.sampleShortDateToday(),
            calendarInputOptions2: null,
        }
    },
    head: {
        title() {
            return {
                inner: headTitle(this.$t('pages._sample._calendar_index._')),
            }
        },
    },
    mounted() {
        this.init()
    },
    methods: {
        sampleShortDateToday() {
            return moment().format(dateTimer.getShortDateFormat())
        },
        init() {
            this.initUi()
        },
        initUi() {
            this.uiCalendar()
        },
        uiCalendar() {
            this.calendarInputOptions = {
                format: dateTimer.getShortDateFormat(),
            }
            this.calendarInputOptions2 = {
                format: dateTimer.getShortDateFormat(),
            }
        },
        onReset() {
            this.$refs.inputCalendar.clear()
        },
        onSubmitted() {
            // eslint-disable-next-line no-console
            console.log(this.date)
            // eslint-disable-next-line no-console
            console.log(this.date2)
        },
    },
}
</script>
