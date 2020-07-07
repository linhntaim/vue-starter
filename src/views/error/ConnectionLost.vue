<template lang="pug">
    .text-center Connection lost
</template>

<script>
    // import {ui} from '../../app/utils'

    export default {
        name: 'ConnectionLost',
        methods: {
            onRefreshClicked() {
                // ui.reloadPage()
            },
        },
    }
</script>

<style lang="scss" scoped>
    .text-center {
        text-align: center;
    }
</style>
