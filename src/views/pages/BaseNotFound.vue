<template lang="pug">
    not-found
</template>

<script>
/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

import {headTitle} from '../../app/utils'
import {mapGetters} from '@linhntaim/vue-uses'
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
                inner: headTitle(this.$t('error.not_found._')),
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
