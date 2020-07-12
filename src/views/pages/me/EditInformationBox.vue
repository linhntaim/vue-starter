<template lang="pug">
    div
        .card.shadow.mb-4
            form(@submit.prevent="onInformationSubmitted()")
                .card-body
                    .text-center
                        .form-group
                            img.rounded-circle.w-25(v-if="urlAvatar" :src="urlAvatar")
                        button.btn.btn-primary(@click="onChangePictureClicked()" type="button") {{ $t('pages._me._edit_information.change_picture') }}
                    hr
                    .row
                        .col-md-6
                            .form-group
                                label {{ $t('pages.email_address') }}
                                .form-control-plaintext {{ email }}
                                .form-control-plaintext
                                    a(@click.prevent="onChangeEmailClicked()" href="#") {{ $t('pages._me.change_email_address') }}
                        .col-md-6
                            .form-group
                                label {{ $t('pages.password') }}
                                .form-control-plaintext ********
                                .form-control-plaintext
                                    a(@click.prevent="onChangePasswordClicked()" href="#") {{ $t('pages._me.change_password') }}
                    .form-group
                        label.required(for="inputDisplayName") {{ $t('pages.display_name') }}
                        input#inputDisplayName.form-control(v-model="displayName" type="text" autocomplete="off" required)
                .card-footer.clearfix
                    button.btn.btn-primary.float-right(:disabled="loading" type="submit")
                        i.fas.fa-circle-notch.fa-spin(v-if="loading")
                        span(v-else) {{ $t('actions.save') }}
        edit-email-modal(ref="editEmailModal")
        edit-password-modal(ref="editPasswordModal")
</template>

<script>
    import {mapActions, mapGetters} from '@dsquare-gbu/vue-uses'
    import EditEmailModal from './EditEmailModal'
    import EditPasswordModal from './EditPasswordModal'
    import {TOAST_DEF} from '../../../app/config'

    export default {
        name: 'EditInformationBox',
        components: {EditPasswordModal, EditEmailModal},
        data() {
            return {
                loading: false,

                urlAvatar: '',
                email: '',
                displayName: '',
            }
        },
        computed: {
            ...mapGetters({
                currentAdmin: 'account/admin',
            }),
        },
        created() {
            this.initInformation()
        },
        methods: {
            ...mapActions({
                accountUpdateAvatar: 'account/updateAvatar',
                accountUpdateInformation: 'account/updateInformation',
            }),
            initInformation() {
                this.urlAvatar = this.currentAdmin.url_avatar
                this.email = this.currentAdmin.user.email
                this.displayName = this.currentAdmin.display_name
            },
            onInformationSubmitted() {
                this.loading = true
                this.accountUpdateInformation({
                    params: {
                        display_name: this.displayName,
                    },
                    doneCallback: () => {
                        this.loading = false

                        this.$bus.emit('toast', {
                            title: this.$t('pages._me._edit_information.edit_information'),
                            content: this.$t('pages._me._edit_information.edit_information_succeed'),
                            type: TOAST_DEF.success,
                        })
                    },
                    errorCallback: err => {
                        this.loading = false
                        this.$bus.emit('error', {messages: err.getMessages(), extra: err.getExtra()})
                    },
                })
            },
            onChangeEmailClicked() {
                this.$refs.editEmailModal.open()
            },
            onChangePasswordClicked() {
                this.$refs.editPasswordModal.open()
            },
            onChangePictureClicked() {
                this.$bus.emit('image', {
                    title: this.$t('pages._me._edit_information.change_picture'),
                    imageUrl: this.urlAvatar,
                    options: {
                        aspectRatio: 1
                    },
                    uploadCallback: image => {
                        this.loading = true
                        this.accountUpdateAvatar({
                            image: image,
                            doneCallback: () => {
                                this.loading = false

                                this.$bus.emit('toast', {
                                    title: this.$t('pages._me._edit_information.change_picture'),
                                    content: this.$t('pages._me._edit_information.change_picture_succeed'),
                                    type: TOAST_DEF.success,
                                })
                            },
                            errorCallback: err => {
                                this.loading = false
                                this.$bus.emit('error', {messages: err.getMessages(), extra: err.getExtra()})
                            },
                        })
                    }
                })
            },
        },
    }
</script>
