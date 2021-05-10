<template lang="pug">
    .card.shadow.mb-4
        .card-header.py-3
            h6.m-0.text-primary {{ $t('pages._dashboard._boxes._ip_limitation._') }}
        form(@submit.prevent="onSubmitted()")
            .card-body.has-control
                .form-group
                    label(for="inputLimitAllowedIps") {{ $t('pages._dashboard._boxes._ip_limitation.allowed_ips') }}
                    textarea#inputLimitAllowedIps.form-control(v-model="allowedIps" cols="10" rows="3")
                    .small.form-text.text-muted {{ $t('pages._dashboard._boxes._ip_limitation.allowed_ips_help') }}
                .form-group
                    label(for="inputDeniedIps") {{ $t('pages._dashboard._boxes._ip_limitation.denied_ips') }}
                    textarea#inputDeniedIps.form-control(v-model="deniedIps" cols="10" rows="3")
                    .small.form-text.text-muted {{ $t('pages._dashboard._boxes._ip_limitation.denied_ips_help') }}
                .form-group
                    .form-check
                        input#inputOnlyAdmin.form-check-input(v-model="onlyAdmin" type="checkbox")
                        label.form-check-label(for="inputOnlyAdmin") {{ $t('pages._dashboard._boxes._ip_limitation.only_admin') }}
            .card-footer.text-right
                button.btn(:class="{'btn-danger': hasLimitation, 'btn-primary': !hasLimitation}" :disabled="loading" type="submit")
                    i.fas.fa-circle-notch.fa-spin(v-if="loading")
                    span(v-else) {{ $t('actions.save') }}
                button.btn.btn-warning.float-left(v-if="hasLimitation" :disabled="loading" @click="onCancelClicked" type="button")
                    i.fas.fa-circle-notch.fa-spin(v-if="loading")
                    span(v-else) {{ $t('actions.delete') }}
</template>

<script>
/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

import {adminCommandService} from '../../../../app/services/default'
import {app} from '@linhntaim/vue-app'
import {ui} from '../../../../app/utils'
import {TypeString} from '@linhntaim/vue-utils'

export default {
    name: 'IpLimitation',
    props: {
        id: Number,
    },
    data() {
        return {
            loading: false,

            hasLimitation: false,
            allowedIps: '',
            deniedIps: '',
            onlyAdmin: true,
        }
    },
    computed: {
        params() {
            const params = {}
            const allowedIps = TypeString.lines(this.allowedIps)
            if (allowedIps.length) {
                params['--allow'] = allowedIps
            }
            const deniedIps = TypeString.lines(this.deniedIps)
            if (deniedIps.length) {
                params['--deny'] = deniedIps
            }
            if (!allowedIps.length && !deniedIps.length) {
                params['--u'] = 'u'
            }
            else {
                if (this.onlyAdmin) {
                    params['--admin'] = 'admin'
                }
            }
            return params
        },
    },
    mounted() {
        const limitation = app.limitation()
        if (limitation) {
            this.hasLimitation = true
            this.allowedIps = limitation.allowed.join('\n')
            this.deniedIps = limitation.denied.join('\n')
            this.onlyAdmin = limitation.admin
        }
    },
    methods: {
        onSubmitted() {
            this.loading = true
            adminCommandService().run(
                {
                    cmd: 'client:limit',
                    params: this.params,
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
        },
        onCancelClicked() {
            this.allowedIps = ''
            this.deniedIps = ''
            this.onlyAdmin = false

            this.onSubmitted()
        },
    },
}
</script>
