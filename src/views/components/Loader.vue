<template lang="pug">
    i.fas.fa-circle-notch.fa-spin(v-if="enabled")
</template>

<script>
/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

export default {
    name: 'Loader',
    props: {
        enabled: {
            type: Boolean,
            default: true,
        },
    },
}
</script>
