<template lang="pug">
    #app
        .container
            service-unavailable
</template>

<script>
/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

import ServiceUnavailable from './error/ServiceUnavailable'

export default {
    name: 'AppFailed',
    components: {ServiceUnavailable},
}
</script>
