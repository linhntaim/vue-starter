<template lang="pug">
    .container
        router-view
</template>

<script>
/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

import {ui} from '@/app/utils'

export default {
    name: 'Error',
    mounted() {
        ui.query('body').get().attr('class', 'bg-gradient')
    },
    destroyed() {
        ui.query('body').get().removeAttr('class')
    },
}
</script>
