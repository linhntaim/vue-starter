<template lang="pug">
    div
        .card.shadow.mb-4
            form(@submit.prevent="onInformationSubmitted()")
                .card-body
                    .text-center
                        .form-group
                            img.rounded-circle.w-25(v-if="avatarUrl" :src="avatarUrl")
                            .d-flex.justify-content-center.align-items-center.rounded-circle.mx-auto.wp-180.hp-180.bg-light.text-profile(v-else)
                                | {{ displayName.charAt(0).toUpperCase() }}
                        .form-group(v-for="file in files")
                            .progress(v-if="!file.progress.completed")
                                .progress-bar.progress-bar-striped.progress-bar-animated.bg-base-dark(:style="{width: file.progress.percentage + '%'}" role="progressbar")
                        button.btn.btn-primary(:disabled="loading" @click="onChangePictureClicked()" type="button") {{ $t('pages._me._edit_information.change_picture') }}
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
        edit-email-modal(ref="editEmailModal" @edited="onEmailEdited")
        edit-password-modal(ref="editPasswordModal")
</template>

<script>
/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

import {adminHandledFileService} from '../../../app/services/default'
import {mapActions, mapGetters} from '@dsquare-gbu/vue-uses'
import {timeoutCaller, ui} from '../../../app/utils'
import {FilesUploader} from '@dsquare-gbu/vue-utils'
import {MAX_CHUNK_UPLOAD_SIZE, TOAST_DEF} from '../../../app/config'
import EditEmailModal from './EditEmailModal'
import EditPasswordModal from './EditPasswordModal'

export default {
    name: 'EditInformationBox',
    components: {EditEmailModal, EditPasswordModal},
    data() {
        return {
            loading: false,

            avatarUrl: '',
            email: '',
            displayName: '',

            filesUploader: new FilesUploader(ui, this.$server.max_upload_file_size, MAX_CHUNK_UPLOAD_SIZE),
        }
    },
    computed: {
        ...mapGetters({
            currentAccount: 'account/account',
        }),
        files() {
            return this.filesUploader.files
        },
        progress() {
            return this.filesUploader.progress
        },
    },
    created() {
        this.initInformation()
    },
    methods: {
        ...mapActions({
            accountUpdateAvatar: 'account/updateAvatar',
            accountUpdateAvatarByHandledFile: 'account/updateAvatarByHandledFile',
            accountUpdateInformation: 'account/updateInformation',
        }),
        initInformation() {
            this.avatarUrl = this.currentAccount.avatar_url
            this.email = this.currentAccount.user.email
            this.displayName = this.currentAccount.display_name
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
        onEmailEdited(email) {
            this.email = email
        },
        onChangePasswordClicked() {
            this.$refs.editPasswordModal.open()
        },
        onChangePictureClicked() {
            this.$bus.emit('image', {
                title: this.$t('pages._me._edit_information.change_picture'),
                imageUrl: this.avatarUrl,
                options: {
                    aspectRatio: 1,
                },
                uploadCallback: (image, name) => {
                    this.updateAvatarNormally(image, name)
                    // this.updateAvatarBySplittingImageIntoChunks(image, name)
                },
            })
        },
        updateAvatarNormally(image, name) {
            this.loading = true
            this.accountUpdateAvatar({
                image: image,
                name: name,
                doneCallback: () => {
                    this.loading = false

                    this.avatarUrl = this.currentAccount.avatar_url

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
        },
        updateAvatarBySplittingImageIntoChunks(image, name) {
            this.loading = true
            const service = adminHandledFileService(), timeoutToSendChunks = 400
            let i = 0
            this.filesUploader.quickProcessFilesWithChunks({
                files: [image],
            }, {
                everyChunkCallback: (chunkData, chunkIndex, chunksTotal, doneCallback, errorCallback, file, data) => {
                    timeoutCaller.register(() => { // trick, prevent failing on Windows OS
                        service.chunkUpload(
                            data, // chunksId
                            chunksTotal,
                            chunkData, // chunkFile
                            chunkIndex,
                            data => {
                                doneCallback()
                                if (data.model.joined) {
                                    service.chunkComplete(
                                        data.model.chunks_id,
                                        {public: 1, scan: 1},
                                        data => this.updateAvatarByHandledFile(data.model.id),
                                        null,
                                        null,
                                        name,
                                    )
                                }
                            },
                            err => {
                                errorCallback()
                                this.loading = false
                                this.$bus.emit('error', {
                                    messages: err.getMessages(),
                                    extra: err.getExtra(),
                                })
                            },
                        )
                    }, timeoutToSendChunks * i++)
                },
                everyDoneCallback: null,
                everyErrorCallback: null,
                everyPromisedBeforeCallback: () => new Promise((resolve, reject) => {
                    service.chunkUploadInit(data => {
                        resolve(data.model.chunks_id)
                    }, err => {
                        this.loading = false
                        this.$bus.emit('error', {
                            messages: err.getMessages(),
                            extra: err.getExtra(),
                        })
                        reject(err)
                    })
                }),
            })
        },
        updateAvatarByHandledFile(fileId) {
            this.loading = true
            this.accountUpdateAvatarByHandledFile({
                fileId: fileId,
                doneCallback: () => {
                    this.loading = false

                    this.avatarUrl = this.currentAccount.avatar_url

                    this.$bus.emit('toast', {
                        title: this.$t('pages._me._edit_information.change_picture'),
                        content: this.$t('pages._me._edit_information.change_picture_succeed'),
                        type: TOAST_DEF.success,
                    })
                },
                errorCallback: err => {
                    this.loading = false
                    this.$bus.emit('error', {
                        messages: err.getMessages(),
                        extra: err.getExtra(),
                    })
                },
            })
        },
    },
}
</script>

<style lang="scss" scoped>
.text-profile {
    font-size: 4rem;
}
</style>