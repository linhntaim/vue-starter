<template lang="pug">
    .container
        unauthorized-error
</template>

<script>
/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

import {headTitle, ui} from '../../app/utils'
import UnauthorizedError from '../error/Unauthorized'

export default {
    name: 'Limitation',
    components: {UnauthorizedError},
    head: {
        title() {
            return {
                inner: headTitle(this.$t('error.limitation._')),
            }
        },
    },
    mounted() {
        ui.query('body').get().attr('class', 'bg-gradient-primary')
    },
    destroyed() {
        ui.query('body').get().removeAttr('class')
    },
}
</script>
