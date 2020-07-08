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
                    button.btn.btn-secondary(type="button" @click="onCancelClicked()") {{ $t('actions.cancel') }}
                    button.btn.btn-primary(:disabled="!value" type="button" @click="onOkClicked()") OK
</template>

<script>
    import {ui} from '../../app/utils'

    export default {
        name: 'PromptModal',
        data() {
            return {
                uis: {},

                title: this.$t('actions.prompt'),
                message: '',
                value: '',
                okCallback: null,
                cancelCallback: null,
            }
        },
        mounted() {
            this.uis.$ = ui.query('#promptModal').get()

            this.$bus.on('prompt', ({title, message, okCallback, cancelCallback, defaultValue}) => {
                this.show(title, message, okCallback, cancelCallback, defaultValue)
            })
        },
        methods: {
            show(title, message, okCallback, cancelCallback, defaultValue) {
                this.title = title ? title : this.$t('actions.prompt')
                this.message = message
                this.value = defaultValue ? defaultValue : ''
                this.okCallback = okCallback ? okCallback : null
                this.cancelCallback = cancelCallback ? cancelCallback : null

                this.uis.$.modal('show')
            },
            onCancelClicked() {
                this.uis.$.modal('hide')
                if (this.cancelCallback) this.cancelCallback()
            },
            onOkClicked() {
                this.uis.$.modal('hide')
                if (this.okCallback) this.okCallback(this.value)
            },
        },
    }
</script>
