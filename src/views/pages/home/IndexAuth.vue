<template lang="pug">
    div
        #nav
            router-link(:to="appRoutes.unauthenticate") Login
        home
</template>

<script>
/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

import {APP_ROUTE} from '../../../app/config'
import Home from './Home'

export default {
    name: 'IndexAuth',
    components: {Home},
    data() {
        return {
            appRoutes: APP_ROUTE,
        }
    },
}
</script>
