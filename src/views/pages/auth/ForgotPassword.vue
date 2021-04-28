<template lang="pug">
    .row.justify-content-center
        .col-lg-6.col-md-8.col-sm-10
            .card.o-hidden.border-0.shadow-lg.my-5
                .card-body.p-5
                    .text-center
                        h1.h4.text-gray-900.mb-4 {{ $t('pages._auth._forgot_password._') }}
                        p.mb-4 {{ $t('pages._auth._forgot_password.desc') }}
                    form.user(@submit.prevent="onSubmitted()")
                        .alert.alert-success.small(v-if="succeed" v-html="$t('pages._auth._forgot_password.succeed')")
                        .form-group
                            input#inputEmail.form-control.form-control-user(v-model="email" type="email" :placeholder="$t('pages.email_address')" required)
                        button.btn.btn-primary.btn-user.btn-block(:disabled="loading || disabled || succeed" type="submit")
                            i.fas.fa-circle-notch.fa-spin(v-if="loading")
                            span(v-else) {{ $t('pages._auth._forgot_password.submit') }}
                    hr
                    .text-center
                        router-link.small(:to="{name: 'login'}")
                            | {{ $t('pages._auth._forgot_password.back_login') }}
</template>

<script>
/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

import {headTitle} from '../../../app/utils'
import {mapActions} from '@linhntaim/vue-uses'
import {APP_ROUTE} from '../../../app/config'

export default {
    name: 'ForgotPassword',
    data() {
        return {
            loading: false,
            succeed: false,

            email: '',
        }
    },
    computed: {
        disabled() {
            return !this.email
        },
    },
    head: {
        title() {
            return {
                inner: headTitle(this.$t('pages._auth._forgot_password._')),
            }
        },
    },
    created() {
        if (!this.$server.forgot_password_enabled.admin) {
            this.$router.push(APP_ROUTE.notFound)
        }
    },
    methods: {
        ...mapActions({
            accountForgotPassword: 'account/forgotPassword',
        }),
        onSubmitted() {
            this.succeed = false
            this.loading = true
            this.accountForgotPassword({
                email: this.email,
                appResetPasswordPath: this.$router.getPathByName(APP_ROUTE.resetPassword),
                doneCallback: () => {
                    this.loading = false
                    this.succeed = true
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
