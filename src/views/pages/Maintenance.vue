<template lang="pug">
    .container
        maintenance-error
</template>

<script>
    import {ui} from '../../app/utils'
    import MaintenanceError from '../error/Maintenance'

    export default {
        name: 'Maintenance',
        components: {MaintenanceError},
        mounted() {
            ui.query('body').get().attr('class', 'bg-gradient-primary')
        },
        destroyed() {
            ui.query('body').get().removeAttr('class')
        },
    }
</script>
