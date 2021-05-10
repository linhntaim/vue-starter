<template lang="pug">
    #importModal.modal.fade(tabindex="-1" role="dialog")
        .modal-dialog(role="document")
            .modal-content
                .modal-header
                    h5.modal-title {{ title }}
                    button.close(type="button" data-dismiss="modal" aria-label="Close")
                        span(aria-hidden="true") ×
                .modal-body.has-control
                    custom-file.form-group(ref="importFile" :htmlId="'inputImportFile'" :extensions="allowedExtensions" @change="onFileChanged")
                .modal-footer
                    button.btn.btn-secondary(type="button" @click="onCancelClicked()") {{ cancelLabel }}
                    button.btn.btn-primary(:disabled="!file" type="button" @click="onOkClicked()") {{ okLabel }}
</template>

<script>
/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

import {ui} from '../../app/utils'
import CustomFile from './CustomFile'

export default {
    name: 'ImportModal',
    components: {CustomFile},
    data() {
        const LABEL_TITLE = this.$t('actions.import')
        const LABEL_OK = this.$t('actions.import')
        const LABEL_CANCEL = this.$t('actions.cancel')
        return {
            uis: {},

            LABEL_TITLE,
            LABEL_OK,
            LABEL_CANCEL,

            title: LABEL_TITLE,
            file: null,
            allowedExtensions: ['csv', 'txt'],
            okLabel: LABEL_OK,
            okCallback: null,
            cancelLabel: LABEL_CANCEL,
        }
    },
    mounted() {
        this.uis.$ = ui.query('#importModal').get()

        this.$bus.on('import', ({title, okCallback, okLabel, cancelLabel}) => {
            this.show(title, okCallback, okLabel, cancelLabel)
        })
    },
    methods: {
        show(title, okCallback, okLabel, cancelLabel) {
            this.title = title ? title : this.LABEL_TITLE
            this.file = null
            this.$refs.importFile.reset()
            this.okCallback = okCallback ? okCallback : null
            this.cancelLabel = cancelLabel ? cancelLabel : this.LABEL_CANCEL
            this.okLabel = okLabel ? okLabel : this.LABEL_OK

            this.uis.$.modal('show')
        },
        onFileChanged($event) {
            this.file = $event.file
        },
        onCancelClicked() {
            this.uis.$.modal('hide')
        },
        onOkClicked() {
            this.uis.$.modal('hide')
            if (this.okCallback) {
                this.okCallback(this.file)
            }
        },
    },
}
</script>
