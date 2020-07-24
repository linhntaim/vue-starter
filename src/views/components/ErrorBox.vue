<template lang="pug">
    .alert(v-if="error" :class="alertHtmlClass")
        div(v-for="(message, index) in messages")
            label.badge.badge-danger.mr-2(v-if="index === 0 && messageLevel") {{ messageLevel }}
            span(v-html="message")
</template>

<script>
    import {ERROR_LEVEL_DEF, ERROR_MESSAGE_LEVEL} from '../../app/config'

    export default {
        name: 'ErrorBox',
        props: {
            error: Object,
        },
        data() {
            let alertHtmlClasses = {}
            alertHtmlClasses[ERROR_LEVEL_DEF.info] = 'alert-primary'
            alertHtmlClasses[ERROR_LEVEL_DEF.warning] = 'alert-warning'
            alertHtmlClasses[ERROR_LEVEL_DEF.error] = 'alert-danger'
            return {
                alertHtmlClasses: alertHtmlClasses,
            }
        },
        computed: {
            messages() {
                return this.error ? this.error.messages : []
            },
            level() {
                return this.error ? this.error.level : ERROR_LEVEL_DEF.info
            },
            extra() {
                return this.error ? this.error.extra : null
            },
            messageLevel() {
                return this.extra && this.extra._error && this.extra._error.level ?
                    this.$t('def.error_message_level.' + ERROR_MESSAGE_LEVEL[this.extra._error.level].text) : null
            },
            alertHtmlClass() {
                return this.alertHtmlClasses[this.level]
            },
        },
    }
</script>
