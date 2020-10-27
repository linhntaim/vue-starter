<template lang="pug">
    select.form-control(:id="id" :required="required")
        option(:disabled="required" selected value="") &nbsp;
        option(v-for="item in items" :key="item[itemValue]" :value="item[itemValue]") {{ item[itemText] }}
</template>

<script>
/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

import {mapGetters} from '@dsquare-gbu/vue-uses'
import {ui} from '../../app/utils'

export default {
    name: 'Select2Input',
    props: {
        id: {
            type: String,
            default: 'inputSelect2',
        },
        placeholder: {
            type: String,
            default: '',
        },
        value: {
            type: String,
            default: '',
        },
        required: {
            type: Boolean,
            default: false,
        },
        items: {
            type: Array,
            default: () => {
                return []
            },
        },
        itemValue: {
            type: String,
            default: 'id',
        },
        itemText: {
            type: String,
            default: 'text',
        },
        options: {
            type: Object,
            default: () => {
                return {}
            },
        },
    },
    data() {
        return {
            uis: {},
            selected: this.value,
        }
    },
    computed: {
        ...mapGetters({
            currentSettings: 'account/settings',
        }),
        htmlId() {
            return '#' + this.id
        },
    },
    mounted() {
        this.uis.$ = ui.query(this.htmlId).get()
        if (this.selected) {
            this.uis.$.val(this.selected)
        }
        this.options.theme = 'bootstrap4'
        this.options.language = this.currentSettings.locale
        this.options.allowClear = true
        if (!this.options.placeholder) {
            this.options.placeholder = ''
        }
        this.uis.$.select2(this.options).on('change', () => this.update(this.uis.$.val()))
    },
    methods: {
        update(selected) {
            this.selected = selected
            this.$emit('input', this.selected)
        },
        clear(defaultValue = '') {
            this.uis.$.val(defaultValue).trigger('change')
            this.update(defaultValue)
        },
    },
}
</script>
