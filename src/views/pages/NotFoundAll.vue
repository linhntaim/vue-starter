<template lang="pug">
    div
        not-found(v-if="accountIsLoggedIn")
        .container(v-else)
            not-found
</template>

<script>
    /**
     * Base - Any modification needs to be approved, except the space inside the block of TODO
     */

    import NotFound from '../error/NotFound'
    import {mapGetters} from '@dsquare-gbu/vue-uses'

    export default {
        name: 'NotFoundAll',
        components: {NotFound},
        computed: {
            ...mapGetters({
                accountIsLoggedIn: 'account/isLoggedIn',
            }),
        },
    }
</script>
