<template lang="pug">
    i.fas.fa-circle-notch.fa-spin(v-if="enabled")
</template>

<script>
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
