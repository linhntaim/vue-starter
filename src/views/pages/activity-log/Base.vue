<template lang="pug">
    div
        h1.h3.mb-3.text-gray-800 {{ $t('pages._activity_log._') }}
        router-view
</template>

<script>
    /**
     * Base - Any modification needs to be approved, except the space inside the block of TODO
     */

    import {mapActions} from '@dsquare-gbu/vue-uses'

    export default {
        name: 'Base',
        destroyed() {
            this.activityLogDestruct()
        },
        methods: {
            ...mapActions({
                activityLogDestruct: 'activityLog/destruct',
            }),
        },
    }
</script>
