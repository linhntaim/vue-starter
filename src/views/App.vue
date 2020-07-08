<template lang="pug">
    #app
        router-view
        toasts
        error-modal
        confirm-modal
        prompt-modal
        image-modal
        page-loader
</template>

<script>
    import {timeoutCaller, ui} from '../app/utils'
    import ConfirmModal from './components/ConfirmModal'
    import ErrorModal from './components/ErrorModal'
    import ImageModal from './components/ImageModal'
    import PageLoader from './components/PageLoader'
    import PromptModal from './components/PromptModal'
    import Toasts from './components/Toasts'

    export default {
        name: 'App',
        components: {
            PageLoader,
            PromptModal,
            Toasts,
            ImageModal,
            ConfirmModal,
            ErrorModal,
        },
        watch: {
            '$route'() {
                ui.query('[data-toggle="tooltip"]').get().tooltip('hide')
            },
        },
        beforeDestroy() {
            ui.query(document).get().off('show.bs.modal')
                .off('hidden.bs.modal')
            ui.query('body').get().tooltip('dispose')
        },
        mounted() {
            const $body = ui.query('body').get()

            // trick, support multiple modals
            let zIndex = 1050
            ui.query(document).get().on('show.bs.modal', '.modal', function () {
                zIndex += 2
                ui.query(this).get().css('z-index', zIndex)
                timeoutCaller.register(() => {
                    $body.children('.modal-backdrop:last').css('z-index', zIndex - 1)
                })
            }).on('hidden.bs.modal', '.modal', function () {
                zIndex -= 2
            })

            $body.tooltip({
                selector: '[data-toggle="tooltip"]',
            })
        },
    }
</script>
