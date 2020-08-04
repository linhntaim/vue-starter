<template lang="pug">
    .card.shadow.mb-4
        .card-header.py-3
            h6.m-0.text-primary {{ $t('pages._dashboard._boxes._generate_login_token._') }}
        form(@submit.prevent="onSubmitted()")
            .card-body
                .form-group
                    label.required(for="inputUser") {{ $t('pages.email_address') }} / ID
                    input#inputUser.form-control(v-model="user" type="text" required)
                div(v-if="show")
                    label Token
                    pre
                        code {{output}}
                    router-link(:to="{name: 'login', params: {token: output}}") {{ $t('actions.go', {where: $t('pages._auth._login._')}) }}
            .card-footer.text-right
                button.btn.btn-primary(:disabled="loading" type="submit")
                    i.fas.fa-circle-notch.fa-spin(v-if="loading")
                    span(v-else) {{ $t('actions.generate') }}
</template>

<script>
    import {commandAdminService} from '../../../../app/services/default/admin-command'

    export default {
        name: 'GenerateLoginToken',
        props: {
            id: Number,
        },
        data() {
            return {
                loading: false,

                user: '',

                show: false,
                output: '',
            }
        },
        methods: {
            onSubmitted() {
                this.loading = true
                this.hideOutput()
                commandAdminService().run(
                    {
                        cmd: 'generate:login_token',
                        params: {
                            user: this.user,
                        },
                    },
                    data => {
                        this.loading = false
                        this.showOutput(data.output)
                    },
                    err => {
                        this.loading = false
                        this.$bus.emit('error', {messages: err.getMessages(), extra: err.getExtra()})
                    }
                )
            },

            showOutput(output) {
                this.show = true
                this.output = output
            },

            hideOutput() {
                this.show = false
                this.output = ''
            },
        }
    }
</script>

<style lang="scss" scoped>
    pre {
        padding: .375rem .75rem;
        border-radius: .35rem;
        word-break: break-all;
        word-wrap: break-word;
        background-color: #f5f5f5;
        border: 1px solid #ccc;

        code {
            white-space: pre-wrap;
        }
    }
</style>
