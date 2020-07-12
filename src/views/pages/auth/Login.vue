<template lang="pug">
    .row.justify-content-center
        .col-xl-6.col-lg-12.col-md-9
            .card.o-hidden.border-0.shadow-lg.my-5
                .card-body.p-0
                    .row
                        .col-lg-12
                            .p-5
                                .text-center
                                    h1.h4.text-gray-900.mb-4(v-html="$t('pages._auth._login.welcome_back')")
                                form.user(@submit.prevent="onLoginSubmitted()")
                                    .form-group
                                        input#inputEmail.form-control.form-control-user(v-model="email" type="text" aria-describedby="emailHelp" :placeholder="$t('pages.enter_email_address')" required)
                                    .form-group
                                        input#inputPassword.form-control.form-control-user(v-model="password" type="password" :placeholder="$t('pages.password')" :required="!token" :disabled="token")
                                    button.btn.btn-primary.btn-user.btn-block(:disabled="loading || disabled" type="submit")
                                        i.fas.fa-circle-notch.fa-spin(v-if="loading")
                                        span(v-else) {{ $t('actions.login') }}
</template>

<script>
    import {mapActions, mapGetters} from '@dsquare-gbu/vue-uses'
    import {session} from '@dsquare-gbu/vue-router'

    export default {
        name: 'Login',
        data() {
            return {
                loading: false,

                token: false,

                email: '',
                password: '',
            }
        },
        computed: {
            ...mapGetters({
                currentAdmin: 'account/admin',
                accountPermissions: 'account/permissions',
            }),
            disabled() {
                return !this.token && (this.email == '' || this.password == '')
            },
        },
        created() {
            if (this.$route.query.token) {
                this.email = this.$route.query.token
                this.token = true
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
                    token: this.token,
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
                session.restart()

                this.$router.push({name: 'home'})
            },
        },
    }
</script>

<style lang="sass">
    form.user .form-control-user
        height: 50px
        padding: 1rem 1rem
</style>