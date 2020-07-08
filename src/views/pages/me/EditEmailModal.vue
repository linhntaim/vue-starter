<template lang="pug">
    #editEmailModal.modal.fade(tabindex="-1" role="dialog" aria-hidden="true" data-backdrop="static")
        .modal-dialog(role="document")
            .modal-content
                .modal-header
                    h5.modal-title {{ $t('pages._me.change_email_address') }}
                    button.close(:disabled="loading" type="button" data-dismiss="modal" aria-label="Close")
                        span(aria-hidden="true") ×
                form(@submit.prevent="onSubmitted()")
                    .modal-body
                        error-box(:error="error")
                        .form-group
                            label.required(for="inputEmailEmail") {{ $t('pages.email_address') }}
                            input#inputEmailEmail.form-control(v-model="email" type="email" autocomplete="off" required)
                        .form-group
                            label.required(for="inputEmailCurrentPassword") {{ $t('pages.confirm_password') }}
                            input#inputEmailCurrentPassword.form-control(v-model="currentPassword" type="password" autocomplete="off" required)
                    .modal-footer
                        button.btn.btn-secondary(:disabled="loading" type="button" data-dismiss="modal") {{ $t('actions.cancel') }}
                        button.btn.btn-primary(:disabled="loading" type="submit")
                            i.fas.fa-circle-notch.fa-spin(v-if="loading")
                            span(v-else) {{ $t('actions.save') }}
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'
    import ErrorBox from '../../components/ErrorBox'
    import {ui} from '../../../app/utils'
    import {ERROR_LEVEL_DEF, TOAST_DEF} from '../../../app/config'

    let $uis = {}

    export default {
        name: 'EditEmailModal',
        components: {ErrorBox},
        data() {
            return {
                loading: false,

                error: null,

                currentPassword: '',
                email: '',
            }
        },
        computed: {
            ...mapGetters({
                currentUser: 'account/user',
            }),
        },
        mounted() {
            $uis._ = ui.query('#editEmailModal').get()
        },
        methods: {
            ...mapActions({
                accountUpdateEmail: 'account/updateEmail',
            }),
            open() {
                this.error = null
                this.currentPassword = ''
                this.email = this.currentUser.email

                $uis._.modal('show')
            },
            onSubmitted() {
                this.loading = true
                this.error = null
                this.accountUpdateEmail({
                    email: this.email,
                    currentPassword: this.currentPassword,
                    doneCallback: () => {
                        this.loading = false

                        $uis._.modal('hide')
                        this.$bus.emit('toast', {
                            title: this.$t('pages._me.change_email_address'),
                            content: this.$t('pages._me.change_email_address_succeed'),
                            type: TOAST_DEF.success,
                        })
                    },
                    errorCallback: err => {
                        this.loading = false
                        this.error = {
                            messages: err.getMessages(),
                            extra: err.getExtra(),
                            level: ERROR_LEVEL_DEF.error,
                        }
                    },
                })
            },
        }
    }
</script>
