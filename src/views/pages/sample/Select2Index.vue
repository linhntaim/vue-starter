<template lang="pug">
    .card.shadow.mb-4
        .card-header.py-3
            h6.m-0.font-weight-bold.text-primary {{ $t('pages._sample._select2_index._') }}
        form(@submit.prevent="onSubmitted()")
            .card-body
                .form-group
                    label.required(for="inputSelect") Select
                    select2-input(
                        v-if="select2Ready"
                        ref="inputSelect2"
                        :id="'inputSelect'"
                        v-model="select2Selected"
                        :items="select2Items"
                        :itemValue="'value'"
                        :itemText="'text'"
                        :required="true"
                        :options="select2Options"
                    )
                .form-group
                    label.required(for="inputSelect2") Select (with value)
                    select2-input(
                        v-if="select2Ready2"
                        ref="inputSelect22"
                        :id="'inputSelect2'"
                        v-model="select2Selected2"
                        :items="select2Items2"
                        :itemValue="'value'"
                        :itemText="'text'"
                        :required="true"
                        :options="select2Options2"
                    )
                .form-group
                    label.required(for="inputSelect3") Select (with value and calling service)
                    select2-input(
                        v-if="select2Ready3"
                        ref="inputSelect23"
                        :id="'inputSelect3'"
                        v-model="select2Selected3"
                        :items="select2Items3"
                        :itemValue="'value'"
                        :itemText="'text'"
                        :required="true"
                        :options="select2Options3"
                    )
                .form-group
                    label.required(for="inputSelect4") Multiple select (with value and calling service)
                    multiple-select2-input(
                        v-if="select2Ready4"
                        ref="inputSelect24"
                        :id="'inputSelect4'"
                        v-model="select2Selected4"
                        :items="select2Items4"
                        :itemValue="'value'"
                        :itemText="'text'"
                        :required="true"
                        :options="select2Options4"
                    )
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

import {headTitle, localeChange} from '../../../app/utils'
import Select2Input from '@/views/components/Select2Input'
import MultipleSelect2Input from '@/views/components/MultipleSelect2Input'

export default {
    name: 'CalendarIndex',
    components: {MultipleSelect2Input, Select2Input},
    data() {
        return {
            loading: false,

            select2Selected: null,
            select2Items: [
                {
                    text: 'Item 1',
                    value: 'Item 1',
                },
                {
                    text: 'Item 2',
                    value: 'Item 2',
                },
                {
                    text: 'Item 3',
                    value: 'Item 3',
                },
                {
                    text: 'Item 4',
                    value: 'Item 4',
                },
                {
                    text: 'Item 5',
                    value: 'Item 5',
                },
            ],
            select2Options: {},
            select2Ready: false,

            select2Selected2: 'Item 3',
            select2Items2: [
                {
                    text: 'Item 1',
                    value: 'Item 1',
                },
                {
                    text: 'Item 2',
                    value: 'Item 2',
                },
                {
                    text: 'Item 3',
                    value: 'Item 3',
                },
                {
                    text: 'Item 4',
                    value: 'Item 4',
                },
                {
                    text: 'Item 5',
                    value: 'Item 5',
                },
            ],
            select2Options2: {},
            select2Ready2: false,

            select2Selected3: null,
            select2Items3: [],
            select2Options3: {},
            select2Ready3: false,

            select2Selected4: null,
            select2Items4: [],
            select2Options4: {},
            select2Ready4: false,

            localeChange: localeChange.reset(),
            localeChangeHandlerId: null,
        }
    },
    head: {
        title() {
            return {
                inner: headTitle(this.$t('pages._sample._select2_index._')),
            }
        },
    },
    destroyed() {
        this.localeChange.off(this.localeChangeHandlerId)
    },
    mounted() {
        this.localeChangeHandlerId = this.localeChange.on(() => {
            this.init()
        })
        this.init()
    },
    methods: {
        sampleCallService(doneCallback) {
            (new Promise(resolve => {
                setTimeout(() => resolve([
                    {
                        text: 'Item 1',
                        value: 'Item 1',
                    },
                    {
                        text: 'Item 2',
                        value: 'Item 2',
                    },
                    {
                        text: 'Item 3',
                        value: 'Item 3',
                    },
                    {
                        text: 'Item 4',
                        value: 'Item 4',
                    },
                    {
                        text: 'Item 5',
                        value: 'Item 5',
                    },
                ]), 3000)
            })).then(doneCallback)
        },
        init() {
            this.uiReadySelect2(false)
            this.sampleCallService(items => {
                this.select2Items3 = items
                this.select2Selected3 = 'Item 3'
                this.select2Items4 = items
                this.select2Selected4 = [
                    'Item 3',
                    'Item 4',
                ]

                this.initUi()
            })
        },
        initUi() {
            this.uiReadySelect2()
        },
        uiReadySelect2(ready = true) {
            this.select2Ready = ready
            this.select2Ready2 = ready
            this.select2Ready3 = ready
            this.select2Ready4 = ready
        },
        onReset() {
            this.$refs.inputSelect2.clear()
            this.$refs.inputSelect22.clear()
            this.$refs.inputSelect23.clear()
            this.$refs.inputSelect24.clear()
        },
        onSubmitted() {
            // eslint-disable-next-line no-console
            console.log(this.select2Selected)
            // eslint-disable-next-line no-console
            console.log(this.select2Selected2)
        },
    },
}
</script>
