<template lang="pug">
    #app
        router-view
        toasts
        error-modal
        confirm-modal
        prompt-modal
        image-modal
        export-modal
        import-modal
        page-loader
</template>

<script>
/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

import {ui} from '../app/utils'
import ConfirmModal from './components/ConfirmModal'
import ErrorModal from './components/ErrorModal'
import ExportModal from './components/ExportModal'
import ImageModal from './components/ImageModal'
import PageLoader from './components/PageLoader'
import PromptModal from './components/PromptModal'
import Toasts from './components/Toasts'
import ImportModal from './components/ImportModal'

export default {
    name: 'App',
    components: {
        ConfirmModal,
        ErrorModal,
        ExportModal,
        ImageModal,
        ImportModal,
        PageLoader,
        PromptModal,
        Toasts,
    },
    watch: {
        '$route'() {
            ui.onRouteChanged()
        },
    },
    beforeDestroy() {
        ui.onBeforeDestroy()
    },
    mounted() {
        ui.onMounted()
    },
}
</script>
