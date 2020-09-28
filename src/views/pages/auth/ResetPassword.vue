<template lang="pug">
    .row.justify-content-center(v-if="allowed")
        .col-lg-6.col-md-8.col-sm-10
            .card.o-hidden.border-0.shadow-lg.my-5
                .card-body.p-5
                    .text-center
                        h1.h4.text-gray-900.mb-4 {{ $t('pages._auth._reset_password._') }}
                    form.user(@submit.prevent="onSubmitted()")
                        .alert.alert-success.small(v-if="succeed") {{ $t('pages._auth._reset_password.succeed') }}
                        .form-group
                            input#inputEmail.form-control.form-control-user(:value="email" type="text" :placeholder="$t('pages.email_address')" disabled)
                        .form-group
                            input#inputPassword.form-control.form-control-user(v-model="password" type="password" :placeholder="$t('pages.password')" required)
                        .form-group
                            input#inputRepeatPassword.form-control.form-control-user(v-model="passwordConfirmation" type="password" :placeholder="$t('pages.confirm_password')" required)
                        button.btn.btn-danger.btn-user.btn-block(:disabled="loading || disabled || succeed" type="submit")
                            i.fas.fa-circle-notch.fa-spin(v-if="loading")
                            span(v-else) {{ $t('pages._auth._reset_password.submit') }}
                    hr
                    .text-center
                        router-link.small(:to="{name: 'login'}" :class="{disabled: loading && !succeed}")
                            | {{ $t('pages._auth._reset_password.back_login') }}
                            span(v-if="go < 11 && go > 0") &nbsp;({{ go }})
</template>

<script>
    /**
     * Base - Any modification needs to be approved, except the space inside the block of TODO
     */

    import {mapActions} from '@dsquare-gbu/vue-uses'
    import {headTitle, intervalCaller, timeoutCaller} from '../../../app/utils'
    import {APP_ROUTE} from '../../../app/config'

    export default {
        name: 'ResetPassword',
        data() {
            return {
                loading: false,
                allowed: false,
                succeed: false,

                email: '',
                token: this.$route.params.token,
                password: '',
                passwordConfirmation: '',

                go: 11,
            }
        },
        computed: {
            disabled() {
                return !this.password || !this.passwordConfirmation
            },
        },
        head: {
            title() {
                return {
                    inner: headTitle(this.$t('pages._auth._reset_password._')),
                }
            },
        },
        created() {
            if (!this.$server.forgot_password_enabled.admin) {
                this.$router.push({name: APP_ROUTE.not_found})
            }
        },
        mounted() {
            this.init()
        },
        methods: {
            ...mapActions({
                accountGetResetPassword: 'account/getResetPassword',
                accountResetPassword: 'account/resetPassword',
            }),
            init() {
                // check if token existed
                this.loading = true
                this.allowed = false
                this.accountGetResetPassword({
                    token: this.token,
                    doneCallback: data => {
                        this.loading = false
                        this.allowed = true
                        this.email = data.model.email
                    },
                    errorCallback: () => {
                        this.$router.push({name: APP_ROUTE.not_found})
                    },
                })
            },
            onSubmitted() {
                this.loading = true
                this.succeed = false
                this.accountResetPassword({
                    email: this.email,
                    token: this.token,
                    password: this.password,
                    passwordConfirmation: this.passwordConfirmation,
                    doneCallback: () => {
                        this.loading = false
                        this.succeed = true
                        this.go = 10
                        const i = intervalCaller.register(() => {
                            if (this.go === 1) {
                                intervalCaller.clear(i)

                                timeoutCaller.register(() => {
                                    this.$router.push({name: APP_ROUTE.login})
                                    this.go = 0
                                }, 1000)
                                return
                            }
                            --this.go
                        }, 1000)
                    },
                    errorCallback: err => {
                        this.loading = false
                        this.$bus.emit('error', {messages: err.getMessages(), extra: err.getExtra()})
                    },
                })
            },
        },
    }
</script>
