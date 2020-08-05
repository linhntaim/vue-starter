<template lang="pug">
    .card.shadow.mb-4
        .card-header.py-3
            h6.m-0.text-primary {{ $t('pages._dashboard._boxes._maintenance_mode._') }}
        form(@submit.prevent="onSubmitted()")
            .card-body
                .form-group
                    label(for="inputAllowedIps") {{ $t('pages._dashboard._boxes._maintenance_mode.allowed_ips') }}
                    textarea#inputAllowedIps.form-control(v-model="allowedIps" cols="10" rows="3")
                    .small.form-text.text-muted {{ $t('pages._dashboard._boxes._maintenance_mode.allowed_ips_help') }}
            .card-footer.text-right
                div(v-if="inMaintenance")
                    button.btn.btn-danger(:disabled="loading" @click="apply" type="button")
                        i.fas.fa-circle-notch.fa-spin(v-if="loading")
                        span(v-else) {{ $t('actions.save') }}
                    button.btn.btn-warning.float-left(:disabled="loading" type="submit")
                        i.fas.fa-circle-notch.fa-spin(v-if="loading")
                        span(v-else) {{ $t('actions.delete') }}
                button.btn.btn-danger(v-else :disabled="loading" type="submit")
                    i.fas.fa-circle-notch.fa-spin(v-if="loading")
                    span(v-else) {{ $t('actions.apply') }}
</template>

<script>
    import {commandAdminService} from '../../../../app/services/default/admin-command'
    import {ui} from '../../../../app/utils'
    import app from '@dsquare-gbu/vue-app'
    import helpers from '../../../../app/utils/helpers'

    export default {
        name: 'MaintenanceMode',
        props: {
            id: Number,
        },
        data() {
            return {
                loading: false,

                inMaintenance: false,
                allowedIps: app.ips().filter(ip => ip.length <= 15).join('\n'),
            }
        },
        computed: {
            appliedParams() {
                const params = {}
                const allowedIps = helpers.string.splitByLine(this.allowedIps)
                if (allowedIps.length) {
                    params['--allow'] = allowedIps
                }
                return params
            },
        },
        mounted() {
            const maintenance = app.maintenance()
            if (maintenance) {
                this.inMaintenance = true
                this.allowedIps = maintenance.allowed.join('\n')
            }
        },
        methods: {
            onSubmitted() {
                (this.inMaintenance && this.cancel()) || this.apply()
            },
            apply() {
                this.loading = true
                commandAdminService().run(
                    {
                        cmd: 'down',
                        params: this.appliedParams,
                    },
                    () => {
                        this.loading = false
                        ui.reloadPage()
                    },
                    err => {
                        this.loading = false
                        this.$bus.emit('error', {messages: err.getMessages(), extra: err.getExtra()})
                    },
                )
                return true
            },
            cancel() {
                this.loading = true
                commandAdminService().run(
                    {
                        cmd: 'up',
                    },
                    () => {
                        this.loading = false
                        ui.reloadPage()
                    },
                    err => {
                        this.loading = false
                        this.$bus.emit('error', {messages: err.getMessages(), extra: err.getExtra()})
                    },
                )
                return true
            },
        },
    }
</script>
