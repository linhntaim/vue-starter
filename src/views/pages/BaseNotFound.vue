<template lang="pug">
    not-found
</template>

<script>
    /**
     * Base - Any modification needs to be approved, except the space inside the block of TODO
     */

    import {headTitle} from '../../app/utils'
    import {mapGetters} from '@dsquare-gbu/vue-uses'
    import NotFound from '../error/NotFound'

    export default {
        name: 'NotFoundAll',
        components: {NotFound},
        computed: {
            ...mapGetters({
                accountIsLoggedIn: 'account/isLoggedIn',
            }),
        },
        head: {
            title() {
                return {
                    inner: headTitle('Not found'),
                }
            },
        },
        created() {
            if (this.accountIsLoggedIn) {
                this.$router.push({
                    name: 'base_auth_not_found',
                })
            }
        },
    }
</script>
