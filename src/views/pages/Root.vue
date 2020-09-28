<template lang="pug">
    component-loader(ref="component")
</template>

<script>
    /**
     * Base - Any modification needs to be approved, except the space inside the block of TODO
     */

    import {mapGetters} from '@dsquare-gbu/vue-uses'
    import {APP_ROUTE} from '../../app/config'
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
        mounted() {
            // TODO:
            //  Make loading component or redirection based on condition
            if (this.accountIsLoggedIn) {
                if (this.accountMatched) {
                    this.redirect('dashboard')
                } else {
                    this.redirect(APP_ROUTE.unauthenticated)
                }
            } else {
                this.redirect(APP_ROUTE.login)
            }
            // TODO
        },
        methods: {
            redirect(routeName) {
                this.$router.push({
                    name: routeName,
                    query: {
                        time: new Date().getTime(),
                    },
                })
            },
        },
    }
</script>
