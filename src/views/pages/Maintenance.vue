<template lang="pug">
    .container
        maintenance-error
</template>

<script>
    /**
     * Base - Any modification needs to be approved, except the space inside the block of TODO
     */

    import {headTitle, ui} from '../../app/utils'
    import MaintenanceError from '../error/Maintenance'

    export default {
        name: 'Maintenance',
        components: {MaintenanceError},
        head: {
            title() {
                return {
                    inner: headTitle(this.$t('error.maintenance._')),
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
