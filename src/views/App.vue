<template lang="pug">
    #app
        router-view
        error-modal
        confirm-modal
        prompt-modal
        page-loader
</template>

<script>
    /**
     * Base - Any modification needs to be approved, except the space inside the block of TODO
     */

    import {ui} from '../app/utils'
    import ConfirmModal from './components/ConfirmModal'
    import ErrorModal from './components/ErrorModal'
    import PageLoader from './components/PageLoader'
    import PromptModal from './components/PromptModal'

    export default {
        name: 'App',
        components: {
            PageLoader,
            PromptModal,
            ConfirmModal,
            ErrorModal,
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
