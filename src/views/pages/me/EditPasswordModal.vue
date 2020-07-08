<template lang="pug">
    #editPasswordModal.modal.fade(tabindex="-1" role="dialog" aria-hidden="true" data-backdrop="static")
        .modal-dialog(role="document")
            .modal-content
                .modal-header
                    h5.modal-title {{ $t('pages._me.change_password') }}
                    button.close(:disabled="loading" type="button" data-dismiss="modal" aria-label="Close")
                        span(aria-hidden="true") ×
                form(@submit.prevent="onSubmitted()")
                    .modal-body
                        error-box(:error="error")
                        .form-group
                            label.required(for="inputPasswordCurrentPassword") {{ $t('pages.current_password') }}
                            input#inputPasswordCurrentPassword.form-control(v-model="currentPassword" type="password" autocomplete="off" required)
                        .form-group
                            label.required(for="inputPasswordPassword") {{ $t('pages.new_password') }}
                            input#inputPasswordPassword.form-control(v-model="password" type="password" autocomplete="off" required)
                        .form-group
                            label.required(for="inputPasswordPasswordConfirmation") {{ $t('pages.confirm_new_password') }}
                            input#inputPasswordPasswordConfirmation.form-control(v-model="passwordConfirmation" type="password" autocomplete="off" required)
                    .modal-footer
                        button.btn.btn-secondary(:disabled="loading" type="button" data-dismiss="modal") {{ $t('actions.cancel') }}
                        button.btn.btn-primary(:disabled="loading" type="submit")
                            i.fas.fa-circle-notch.fa-spin(v-if="loading")
                            span(v-else) {{ $t('actions.save') }}
</template>

<script>
    import {mapActions, mapGetters} from '@dsquare-gbu/vue-uses'
    import ErrorBox from '../../components/ErrorBox'
    import {ui} from '../../../app/utils'
    import {ERROR_LEVEL_DEF, TOAST_DEF} from '../../../app/config'

    let $uis = {}

    export default {
        name: 'EditPasswordModal',
        components: {ErrorBox},
        data() {
            return {
                loading: false,

                error: null,

                currentPassword: '',
                password: '',
                passwordConfirmation: '',
            }
        },
        computed: {
            ...mapGetters({
                currentUser: 'account/user',
            }),
        },
        mounted() {
            $uis._ = ui.query('#editPasswordModal').get()
        },
        methods: {
            ...mapActions({
                accountUpdatePassword: 'account/updatePassword',
            }),
            open() {
                this.error = null
                this.currentPassword = ''
                this.password = ''
                this.passwordConfirmation = ''

                $uis._.modal('show')
            },
            onSubmitted() {
                this.loading = true
                this.error = null
                this.accountUpdatePassword({
                    currentPassword: this.currentPassword,
                    passwordConfirmation: this.passwordConfirmation,
                    password: this.password,
                    doneCallback: () => {
                        this.loading = false

                        $uis._.modal('hide')

                        this.$bus.emit('toast', {
                            title: this.$t('pages._me.change_password'),
                            content: this.$t('pages._me.change_password_succeed'),
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
