<template lang="pug">
    .input-group(:id="id")
        input.form-control.datetimepicker-input(
            :value="content"
            :placeholder="placeholder"
            :required="required"
            :data-target="htmlId"
            data-toggle="datetimepicker"
            type="text"
            @change = "changeDateTime"
            autocomplete="off")
        .input-group-append(:data-target="htmlId" data-toggle="datetimepicker")
            .input-group-text
                i.fa(:class="icon")
</template>

<script>
/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

import {mapGetters} from '@linhntaim/vue-uses'
import {ui} from '../../app/utils'
import moment from 'moment'

export default {
    name: 'CalendarInput',
    props: {
        id: String,
        placeholder: String,
        value: String,
        required: Boolean,
        options: Object,
    },
    data() {
        return {
            uis: {},

            content: this.value,
        }
    },
    computed: {
        ...mapGetters({
            currentAccount: 'account/account',
            currentSettings: 'account/settings',
        }),
        htmlId() {
            return '#' + this.id
        },
        icon() {
            return 'icon' in this.options ? this.options.icon : 'fa-calendar'
        },
    },
    mounted() {
        this.uis.$ = ui.query(this.htmlId).get()
        this.options.locale = this.currentSettings.locale
        if (this.content) {
            this.options.userCurrent = false
            if (this.options.timeOnly) {
                this.options.date = moment().format('YYYY-MM-DD') + ' ' + this.content
            }
            else {
                this.options.date = this.content
            }
        }
        this.options.icons = {
            time: 'fa fa-clock',
        }
        this.uis.$.on('change.datetimepicker', e => {
            if (e.date) {
                this.update(e.date.format(this.options.format))
            }
        }).datetimepicker(this.options)
    },
    methods: {
        changeDateTime($event) {
            let date = $event.target.value
            if (date) {
                date = this.options.timeOnly ?
                    moment(moment().format('YYYY-MM-DD') + ' ' + date)
                    : moment($event.target.value)
                this.options.date = date.isValid() ? date.format(this.options.format) : moment().format(this.options.format)
            }
            else {
                this.options.date = ''
            }
            this.update(this.options.date)
        },
        update(content) {
            this.content = content
            this.$forceUpdate()

            this.$emit('input', this.content)
        },
        clear(defaultValue = '') {
            if (defaultValue) {
                this.uis.$.viewDate(defaultValue)
            }
            else {
                this.uis.$.datetimepicker('clear')
            }
            this.update(defaultValue)
        },
    },
}
</script>
