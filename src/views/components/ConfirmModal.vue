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
                    button.btn.btn-secondary(type="button" @click="onCancelClicked()") {{ $t('actions.cancel') }}
                    button.btn.btn-primary(type="button" @click="onConfirmClicked()") {{ $t('actions.confirm') }}
</template>

<script>
    import {ui} from '../../app/utils'

    export default {
        name: 'ConfirmModal',
        data() {
            return {
                uis: {},

                title: this.$t('actions.confirm'),
                message: '',
                confirmCallback: null,
                cancelCallback: null,
            }
        },
        mounted() {
            this.uis.$ = ui.query('#confirmModal').get()

            this.$bus.on('confirm', ({title, message, confirmCallback, cancelCallback}) => {
                this.show(title, message, confirmCallback, cancelCallback)
            })
        },
        methods: {
            show(title, message, confirmCallback, cancelCallback) {
                this.title = title ? title : this.$t('actions.confirm')
                this.message = message
                this.confirmCallback = confirmCallback ? confirmCallback : null
                this.cancelCallback = cancelCallback ? cancelCallback : null

                this.uis.$.modal('show')
            },
            onCancelClicked() {
                this.uis.$.modal('hide')
                if (this.cancelCallback) this.cancelCallback()
            },
            onConfirmClicked() {
                this.uis.$.modal('hide')
                if (this.confirmCallback) this.confirmCallback()
            },
        },
    }
</script>
