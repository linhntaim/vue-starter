<template lang="pug">
    #viewModal.modal.fade(tabindex="-1" role="dialog" aria-hidden="true")
        .modal-dialog(role="document")
            .modal-content
                .modal-header
                    h5.modal-title {{ $t('actions.view') }}
                    button.close(type="button" data-dismiss="modal" aria-label="Close")
                        span(aria-hidden="true") ×
                .modal-body
                    .row(v-if="activityLog.id")
                        .form-group.col-6
                            strong {{ $t('pages._activity_log.acted_by') }}
                            .form-control-plaintext {{ activityLog.admin.display_name }}
                        .form-group.col-6
                            strong {{ $t('pages.created_at') }}
                            div.form-control-plaintext {{ activityLog.sd_st_created_at }}
                        .form-group.col-6
                            strong {{ $t('pages._activity_log.screen') }}
                            .form-control-plaintext {{ activityLog.screen }}
                        .form-group.col-6
                            strong {{ $t('pages._activity_log.action') }}
                            .form-control-plaintext {{ activityLog.action }}
                        .form-group.col-12
                            strong Payload
                            .form-control-plaintext {{ activityLog.payload }}
                        .form-group.col-6
                            strong {{ $t('pages._activity_log.client_ip') }}
                            .form-control-plaintext(v-for="clientIp in activityLog.device.client_ips") {{ clientIp }}
                        .form-group.col-12
                            strong {{ $t('pages._activity_log.client_agent') }}
                            .form-control-plaintext {{ activityLog.device.client_agent }}
                .modal-footer
                    button.btn.btn-secondary(type="button" data-dismiss="modal") {{ $t('actions.close') }}
</template>

<script>
    import {mapGetters} from '@dsquare-gbu/vue-uses'
    import {ui} from '../../../app/utils'

    export default {
        name: 'ViewModal',
        data() {
            return {
                uis: {},
                loading: false,
            }
        },
        computed: {
            ...mapGetters({
                activityLog: 'activityLog/activityLog',
            }),
        },
        mounted() {
            this.uis.$ = ui.query('#viewModal').get()
        },
        methods: {
            open() {
                this.uis.$.modal('show')
            },
        },
    }
</script>
