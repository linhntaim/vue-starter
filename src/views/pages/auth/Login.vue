<template lang="pug">
    .row.justify-content-center
        .col-lg-6.col-md-8.col-sm-10
            .card.border-0.shadow-lg.my-5
                .card-body.p-5
                    .text-center
                        h1.h4.mb-4(v-html="$t('pages._auth._login.welcome_back')")
                    form(@submit.prevent="onLoginSubmitted()")
                        .form-group
                            input#inputEmail.form-control.form-control-user(v-model="email" type="text" aria-describedby="emailHelp" :placeholder="$t('pages.email_address')" :disabled="!!impersonateToken" required)
                        .form-group
                            input#inputPassword.form-control.form-control-user(v-model="password" type="password" :placeholder="$t('pages.password')" :required="!impersonateToken" :disabled="!!impersonateToken")
                        button.btn.btn-primary.btn-user.btn-block(:disabled="loading || disabled" type="submit")
                            i.fas.fa-circle-notch.fa-spin(v-if="loading")
                            span(v-else) {{ $t('actions.login') }}
</template>

<script>
/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

import {headTitle} from '../../../app/utils'
import {mapActions} from '@dsquare-gbu/vue-uses'
import {session} from '@dsquare-gbu/vue-router'
import {APP_ROUTE} from '../../../app/config'

export default {
    name: 'Login',
    data() {
        return {
            loading: false,

            impersonateToken: null,

            email: '',
            password: '',
        }
    },
    computed: {
        disabled() {
            return !this.impersonateToken && (!this.email || !this.password)
        },
    },
    head: {
        title() {
            return {
                inner: headTitle(this.$t('pages._auth._login._')),
            }
        },
    },
    created() {
        if (this.$route.query.impersonate_token) {
            this.email = this.$route.query.impersonate_token
            this.impersonateToken = JSON.parse(this.email).impersonate_token
        }
    },
    methods: {
        ...mapActions({
            accountLogin: 'account/login',
        }),
        onLoginSubmitted() {
            this.loading = true
            this.accountLogin({
                email: this.email,
                password: this.password,
                impersonateToken: this.impersonateToken,
                doneCallback: () => {
                    this.loading = false

                    this.afterLogin()
                },
                errorCallback: err => {
                    this.loading = false
                    this.$bus.emit('error', {messages: err.getMessages(), extra: err.getExtra()})
                },
            })
        },
        afterLogin() {
            const redirectAfterAuthenticated = session.retrieve('redirect_after_authenticated')

            session.restart()
            this.$router.push(redirectAfterAuthenticated ? redirectAfterAuthenticated : APP_ROUTE.redirectAfterAuthenticated)
        },
    },
}
</script>