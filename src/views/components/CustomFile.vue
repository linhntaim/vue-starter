<template lang="pug">
    div
        .custom-file
            input.custom-file-input(ref="file" :id="htmlId" @change="onFileChanged" :accept="acceptedExtensions" type="file")
            label.custom-file-label.text-truncate(:for="htmlId") {{ fileName }}
        upload-description(:extensions="extensions")
</template>

<script>
import {fileHelper} from '../../app/utils'
import UploadDescription from './UploadDescription'

export default {
    name: 'CustomFile',
    components: {UploadDescription},
    props: {
        htmlId: String,
        extensions: Array,
    },
    data() {
        return {
            fileName: null,
        }
    },
    computed: {
        acceptedExtensions() {
            return this.extensions.map(extension => extension.startsWith('.') ? extension : '.' + extension).join(', ')
        },
    },
    methods: {
        onFileChanged($event) {
            const file = (files => {
                return files.length ? files[0] : null
            })($event.target.files)
            if (file) {
                if (fileHelper.checkFile(file, {
                    allowedExtensions: this.extensions,
                    allowedExtensionsErrorCallback: () => this.error(this.$t('components.upload_description.extensions', {extensions: this.acceptedExtensions})),
                    maxSize: this.$server.max_upload_file_size,
                    maxSizeErrorCallback: () => this.error(this.$t('components.upload_description.size', {size: this.shownMaxFileSize})),
                })) {
                    this.change(file)
                }
                else {
                    $event.target.value = ''
                    this.change()
                }
            }
            else {
                this.change()
            }
        },
        change(file = null) {
            this.fileName = file ? file.name : null
            this.$emit('change', {
                file: file,
            })
        },
        error(message) {
            this.$emit('error', {
                messages: [message],
            })
        },
        reset() {
            this.$refs.file.value = ''
            this.fileName = null
        },
    },
}
</script>