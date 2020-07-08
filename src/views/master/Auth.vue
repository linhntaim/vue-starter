<template lang="pug">
    .container
        router-view
</template>

<script>
    import {ui} from '../../app/utils'

    export default {
        name: 'Auth',
        mounted() {
            ui.query('body').get().attr('class', 'bg-gradient-primary')
        },
        destroyed() {
            ui.query('body').get().removeAttr('class')
        },
    }
</script>
