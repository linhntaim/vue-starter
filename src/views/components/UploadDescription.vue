<template lang="pug">
    .small.form-text.text-muted
        span(v-if="!extensionsHidden") {{ $t('components.upload_description.extensions', {extensions: extensions}) }}
        span(v-if="!sizeHidden") {{ $t('components.upload_description.size', {size: shownMaxFileSize}) }}
</template>

<script>
/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

import {fileHelper} from '../../app/utils'

export default {
    name: 'UploadDescription',
    props: {
        extensions: String,
        extensionsHidden: {
            type: Boolean,
            default: false,
        },
        sizeHidden: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            shownMaxFileSize: fileHelper.asSize(this.$server ? this.$server.max_upload_file_size : 0),
        }
    },
    destroyed() {
        this.$bus.off('server')
    },
    mounted() {
        this.$bus.on('server', () => {
            this.shownMaxFileSize = fileHelper.asSize(this.$server.max_upload_file_size)
        })
    },
}
</script>