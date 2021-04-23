<template lang="pug">
    .small.form-text.text-muted(v-if="(!extensionsHidden && extensions.length) || !sizeHidden")
        span(v-if="!extensionsHidden && extensions.length")
            | {{ $t('components.upload_description.extensions', {extensions: shownExtensions}) }}
        span(v-if="!sizeHidden")
            | {{ $t('components.upload_description.size', {size: shownMaxFileSize}) }}
</template>

<script>
/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

import {fileHelper} from '../../app/utils'

export default {
    name: 'UploadDescription',
    props: {
        extensions: Array,
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
            shownMaxFileSize: fileHelper.autoLocalizedDisplaySize(this.$server ? this.$server.max_upload_file_size : 0),
        }
    },
    computed: {
        shownExtensions() {
            return this.extensions.map(extension => extension.startsWith('.') ? extension : '.' + extension).join(', ')
        },
    },
    destroyed() {
        this.$bus.off('server')
    },
    mounted() {
        this.$bus.on('server', () => {
            this.shownMaxFileSize = fileHelper.autoLocalizedDisplaySize(this.$server.max_upload_file_size)
        })
    },
}
</script>