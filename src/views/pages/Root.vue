<template lang="pug">
    component-loader(ref="component")
</template>

<script>
/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

import {mapGetters} from '@dsquare-gbu/vue-uses'
import {APP_NAME, APP_ROUTE} from '../../app/config'
import ComponentLoader from '../ComponentLoader'

export default {
    name: 'Root',
    components: {ComponentLoader},
    computed: {
        ...mapGetters({
            accountIsLoggedIn: 'account/isLoggedIn',
            accountMatched: 'account/accountMatched',
            accountPermissions: 'account/permissions',
        }),
    },
    head: {
        title() {
            return {
                complement: APP_NAME,
            }
        },
    },
    mounted() {
        // TODO:
        //  Make loading component or redirection based on condition
        if (this.accountIsLoggedIn) {
            if (this.accountMatched) {
                this.$refs.component.load('./pages/home/IndexAuth')
            } else {
                this.redirect(APP_ROUTE.unauthenticated)
            }
        } else {
            this.$refs.component.load('./pages/home/Index')
        }
        // TODO
    },
    methods: {
        redirect(location) {
            if ('query' in location) {
                location.query.time = new Date().getTime()
            } else {
                location.query = {
                    time: new Date().getTime(),
                }
            }
            this.$router.push(location)
        },
    },
}
</script>
