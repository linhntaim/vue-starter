<template lang="pug">
    .page-popping.dark(v-if="enabled")
        loader
</template>

<script>
/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

import {ui} from '../../app/utils'
import {log} from '../../app/utils'
import Loader from './Loader'

export default {
    name: 'PageLoader',
    components: {Loader},
    data() {
        return {
            enabled: true,
        }
    },
    destroyed() {
        this.$bus.off('page.loading')
        this.$bus.off('page.loaded')
    },
    mounted() {
        const $body = ui.query('body').get()
        this.$bus.on('page.loading', () => {
            log.send('loading', 'page')

            this.enabled = true
            $body.addClass('has-page-popping')
        })
        this.$bus.on('page.loaded', () => {
            log.send('loaded', 'page')

            this.enabled = false
            $body.removeClass('has-page-popping')
        })
    },
}
</script>
