<template lang="pug">
    #errorModal.modal.fade(tabindex="-1" role="dialog")
        .modal-dialog(role="document")
            .modal-content
                .modal-header
                    h5.modal-title {{ title }}
                    button.close(type="button" data-dismiss="modal" aria-label="Close")
                        span(aria-hidden="true") ×
                .modal-body
                    div(v-for="(message, index) in messages")
                        label.badge.badge-danger.mr-2(v-if="index === 0 && messageLevel") {{ messageLevel }}
                        span(v-html="message")
                .modal-footer
                    button.btn(:class="okHtmlClass" type="button" data-dismiss="modal") {{ okLabel }}
</template>

<script>
/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

import {ui} from '@/app/utils'
import {ERROR_LEVEL, ERROR_LEVEL_DEF, ERROR_MESSAGE_LEVEL} from '../../app/config'

export default {
    name: 'ErrorModal',
    data() {
        const LABEL_OK = this.$t('actions.close')
        const LEVEL = ERROR_LEVEL_DEF.info
        const LABEL_TITLE = this.$t('def.error_level.' + ERROR_LEVEL[LEVEL].text)

        const okHtmlClasses = {}
        okHtmlClasses[ERROR_LEVEL_DEF.info] = 'btn-primary'
        okHtmlClasses[ERROR_LEVEL_DEF.warning] = 'btn-warning'
        okHtmlClasses[ERROR_LEVEL_DEF.error] = 'btn-danger'
        return {
            uis: {},

            LABEL_OK: LABEL_OK,

            level: LEVEL,
            title: LABEL_TITLE,
            messages: [],
            messageLevel: '',
            okHtmlClasses: okHtmlClasses,
            okHtmlClass: okHtmlClasses[LEVEL],
            okLabel: LABEL_OK,
        }
    },
    destroyed() {
        this.$bus.off('info')
        this.$bus.off('warning')
        this.$bus.off('error')
    },
    mounted() {
        this.uis.$ = ui.query('#errorModal').get()
        this.uis.$.on('hide.bs.modal', () => {
            this.onHide()
        })

        this.$bus.on('info', ({messages, title, extra, okLabel}) => {
            this.show(ERROR_LEVEL_DEF.info, messages, title, extra, okLabel)
        })

        this.$bus.on('warning', ({messages, title, extra, okLabel}) => {
            this.show(ERROR_LEVEL_DEF.warning, messages, title, extra, okLabel)
        })

        this.$bus.on('error', ({messages, title, extra, okLabel}) => {
            this.show(ERROR_LEVEL_DEF.error, messages, title, extra, okLabel)
        })
    },
    methods: {
        show(level, messages, title, extra, okLabel) {
            this.level = level
            this.title = title ? title : this.$t('def.error_level.' + ERROR_LEVEL[this.level].text)
            this.messages = messages
            this.messageLevel = extra && extra._error && extra._error.level ?
                this.$t('def.error_message_level.' + ERROR_MESSAGE_LEVEL[extra._error.level].text) : ''
            this.okHtmlClass = this.okHtmlClasses[this.level]
            this.okLabel = okLabel ? okLabel : this.LABEL_OK
            this.uis.$.modal('show')
        },
        onHide() {
            this.reset()
        },
        reset() {
            this.level = ERROR_LEVEL_DEF.info
            this.title = ''
            this.messages = []
            this.messageLevel = ''
            this.okHtmlClass = this.okHtmlClasses[this.level]
            this.okLabel = this.$t('actions.close')
        },
    },
}
</script>
