<template lang="pug">
    div
        h1.h3.mb-3.text-gray-800 {{ $t('pages._me._notification._index._') }}
        router-view
</template>

<script>
/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

import {mapActions} from '@linhntaim/vue-uses'

export default {
    name: 'Base',
    destroyed() {
        this.notificationDestruct()
    },
    methods: {
        ...mapActions({
            notificationDestruct: 'accountNotification/destruct',
        }),
    },
}
</script>
