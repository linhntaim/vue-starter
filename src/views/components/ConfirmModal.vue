<template lang="pug">
    #confirmModal.modal.fade(tabindex="-1" role="dialog")
        .modal-dialog(role="document")
            .modal-content
                .modal-header
                    h5.modal-title {{ title }}
                    button.close(type="button" data-dismiss="modal" aria-label="Close")
                        span(aria-hidden="true") ×
                .modal-body
                    div(v-html="message")
                .modal-footer
                    button.btn.btn-secondary(type="button" @click="onCancelClicked()") {{ cancelLabel }}
                    button.btn.btn-primary(type="button" @click="onConfirmClicked()") {{ confirmLabel }}
</template>

<script>
/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

import {ui} from '../../app/utils'

export default {
    name: 'ConfirmModal',
    data() {
        const LABEL_TITLE = this.$t('actions.confirm')
        const LABEL_CONFIRM = this.$t('actions.yes')
        const LABEL_CANCEL = this.$t('actions.no')

        return {
            uis: {},

            LABEL_TITLE,
            LABEL_CONFIRM,
            LABEL_CANCEL,

            title: LABEL_TITLE,
            confirmLabel: LABEL_CONFIRM,
            cancelLabel: LABEL_CANCEL,
            message: '',
            confirmCallback: null,
            cancelCallback: null,
        }
    },
    destroyed() {
        this.$bus.off('confirm')
    },
    mounted() {
        this.uis.$ = ui.query('#confirmModal').get()

        this.$bus.on('confirm', ({title, message, confirmCallback, cancelCallback, confirmLabel, cancelLabel}) => {
            this.show(title, message, confirmCallback, cancelCallback, confirmLabel, cancelLabel)
        })
    },
    methods: {
        show(title, message, confirmCallback, cancelCallback, confirmLabel, cancelLabel) {
            this.title = title ? title : this.LABEL_TITLE
            this.message = message
            this.confirmCallback = confirmCallback ? confirmCallback : null
            this.cancelCallback = cancelCallback ? cancelCallback : null
            this.confirmLabel = confirmLabel ? confirmLabel : this.LABEL_CONFIRM
            this.cancelLabel = cancelLabel ? cancelLabel : this.LABEL_CANCEL

            this.uis.$.modal('show')
        },
        onCancelClicked() {
            this.uis.$.modal('hide')
            if (this.cancelCallback) {
                this.cancelCallback()
            }
        },
        onConfirmClicked() {
            this.uis.$.modal('hide')
            if (this.confirmCallback) {
                this.confirmCallback()
            }
        },
    },
}
</script>
