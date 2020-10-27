<template lang="pug">
    .card.shadow.mb-4
        .card-header.py-3
            h6.m-0.font-weight-bold.text-primary {{ $t('pages._sample._calendar_index._') }}
        form(@submit.prevent="onSubmitted()")
            .card-body
                .form-group
                    label.required(for="inputCalendar") Date
                    calendar-input(v-if="calendarInputOptions" ref="inputCalendar" v-model="date" :options="calendarInputOptions" :id="'inputCalendar'")
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
import CalendarInput from '@/views/components/CalendarInput'

export default {
    name: 'CalendarIndex',
    components: {CalendarInput},
    data() {
        return {
            loading: false,

            date: '',
            calendarInputOptions: null,
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
        init() {
            this.initUi()
        },
        initUi() {
            this.initCalendar()
        },
        initCalendar() {
            this.calendarInputOptions = {
                format: dateTimer.getShortDateFormat(),
            }
        },
        onReset() {
            this.$refs.inputCalendar.clear()
        },
        onSubmitted() {
            console.log(this.date)
        },
    },
}
</script>
