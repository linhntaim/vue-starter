<template lang="pug">
    #promptModal.modal.fade(tabindex="-1" role="dialog")
        .modal-dialog(role="document")
            .modal-content
                .modal-header
                    h5.modal-title {{ title }}
                    button.close(type="button" data-dismiss="modal" aria-label="Close")
                        span(aria-hidden="true") ×
                .modal-body.has-control
                    .form-group
                        label(for="inputPrompt") {{ message }}
                        input#inputPrompt.form-control(v-model="value" type="text")
                .modal-footer
                    button.btn.btn-secondary(type="button" @click="onCancelClicked()") {{ cancelLabel }}
                    button.btn.btn-primary(:disabled="!value" type="button" @click="onOkClicked()") {{ okLabel }}
</template>

<script>
/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

import {ui} from '../../app/utils'

export default {
    name: 'PromptModal',
    data() {
        const LABEL_TITLE = this.$t('actions.prompt')
        const LABEL_OK = 'OK'
        const LABEL_CANCEL = this.$t('actions.cancel')
        return {
            uis: {},

            LABEL_TITLE,
            LABEL_OK,
            LABEL_CANCEL,

            title: LABEL_TITLE,
            message: '',
            value: '',
            okLabel: LABEL_OK,
            okCallback: null,
            cancelLabel: LABEL_CANCEL,
            cancelCallback: null,
        }
    },
    mounted() {
        this.uis.$ = ui.query('#promptModal').get()

        this.$bus.on('prompt', ({title, message, okCallback, cancelCallback, defaultValue, okLabel, cancelLabel}) => {
            this.show(title, message, okCallback, cancelCallback, defaultValue, okLabel, cancelLabel)
        })
    },
    methods: {
        show(title, message, okCallback, cancelCallback, defaultValue, okLabel, cancelLabel) {
            this.title = title ? title : this.LABEL_TITLE
            this.message = message
            this.value = defaultValue ? defaultValue : ''
            this.okCallback = okCallback ? okCallback : null
            this.cancelCallback = cancelCallback ? cancelCallback : null
            this.cancelLabel = cancelLabel ? cancelLabel : this.LABEL_CANCEL
            this.okLabel = okLabel ? okLabel : this.LABEL_OK

            this.uis.$.modal('show')
        },
        onCancelClicked() {
            this.uis.$.modal('hide')
            if (this.cancelCallback) {
                this.cancelCallback()
            }
        },
        onOkClicked() {
            this.uis.$.modal('hide')
            if (this.okCallback) {
                this.okCallback(this.value)
            }
        },
    },
}
</script>
