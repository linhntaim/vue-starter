<template lang="pug">
    div
        #nav
            router-link(:to="appRoutes.authenticate") {{ $t('actions.login') }}
        home
</template>

<script>
/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

import {APP_ROUTE} from '../../../app/config'
import Home from './Home'

export default {
    name: 'Index',
    components: {Home},
    data() {
        return {
            appRoutes: APP_ROUTE,
        }
    },
}
</script>
