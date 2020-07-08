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
                        span(v-if="index === 0 && messageLevel")
                            label.badge.badge-danger {{ messageLevel }}
                            | &nbsp;&nbsp;
                        span(v-html="message")
                .modal-footer
                    button.btn(:class="okHtmlClass" type="button" data-dismiss="modal") OK
</template>

<script>
    import {ui} from '../../app/utils'
    import {ERROR_LEVEL, ERROR_LEVEL_DEF, ERROR_MESSAGE_LEVEL} from '../../app/config'

    export default {
        name: 'ErrorModal',
        data() {
            let okHtmlClasses = {}
            okHtmlClasses[ERROR_LEVEL_DEF.info] = 'btn-primary'
            okHtmlClasses[ERROR_LEVEL_DEF.warning] = 'btn-warning'
            okHtmlClasses[ERROR_LEVEL_DEF.error] = 'btn-danger'
            return {
                uis: {},

                level: ERROR_LEVEL_DEF.info,
                title: '',
                messages: [],
                messageLevel: '',
                okHtmlClasses: okHtmlClasses,
                okHtmlClass: okHtmlClasses[ERROR_LEVEL_DEF.info],
            }
        },
        mounted() {
            this.uis.$ = ui.query('#errorModal').get()
            this.uis.$.on('hide.bs.modal', () => {
                this.onHide()
            })

            this.$bus.on('info', ({messages: messages, title: title, extra: extra}) => {
                this.show(ERROR_LEVEL_DEF.info, messages, title, extra)
            })

            this.$bus.on('warning', ({messages: messages, title: title, extra: extra}) => {
                this.show(ERROR_LEVEL_DEF.warning, messages, title, extra)
            })

            this.$bus.on('error', ({messages: messages, title: title, extra: extra}) => {
                this.show(ERROR_LEVEL_DEF.error, messages, title, extra)
            })
        },
        methods: {
            show(level, messages, title, extra) {
                this.level = level
                this.title = title ? title : this.$t('def.error_level.' + ERROR_LEVEL[this.level].text)
                this.messages = messages
                this.messageLevel = extra && extra._error && extra._error.level ?
                    this.$t('def.error_message_level.' + ERROR_MESSAGE_LEVEL[extra._error.level].text) : ''
                this.okHtmlClass = this.okHtmlClasses[this.level]
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
            },
        },
    }
</script>
