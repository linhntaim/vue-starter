<template lang="pug">
    component-loader(ref="component")
</template>

<script>
/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

import {headTitle} from '../../app/utils'
import {mapGetters} from '@linhntaim/vue-uses'
import {APP_ID, APP_ROUTE, APP_CLIENT, APP_CLIENT_ADMIN} from '../../app/config'
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
            return APP_ID === 'base' ? {
                inner: headTitle('Vue Starter'),
                complement: 'Nguyen Tuan Linh',
            } : {
                inner: APP_CLIENT === APP_CLIENT_ADMIN ?
                    'Admin' : 'Home',
            }
        },
    },
    mounted() {
        // TODO:
        //  Make loading component or redirection based on condition
        if (this.accountIsLoggedIn) {
            if (this.accountMatched) {
                this.redirect({
                    name: 'dashboard',
                })
            }
            else {
                this.redirect(APP_ROUTE.unauthenticated)
            }
        }
        else {
            this.redirect(APP_ROUTE.authenticate)
        }
        // TODO
    },
    methods: {
        redirect(location) {
            if ('query' in location) {
                location.query.time = new Date().getTime()
            }
            else {
                location.query = {
                    time: new Date().getTime(),
                }
            }
            this.$router.push(location)
        },
    },
}
</script>
