<template lang="pug">
    component(v-if="hasComponent" :is="component")
</template>

<script>
    /**
     * Base - Any modification needs to be approved, except the space inside the block of TODO
     */

    import {mapGetters} from '@dsquare-gbu/vue-uses'
    import {APP_ROUTE} from '../../app/config'

    export default {
        name: 'Root',
        data() {
            return {
                component: null,
                hasComponent: false,
            }
        },
        computed: {
            ...mapGetters({
                accountIsLoggedIn: 'account/isLoggedIn',
                accountMatched: 'account/accountMatched',
                accountPermissions: 'account/permissions',
            }),
        },
        created() {
            // TODO:
            //  Make loading component based on condition
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
            loadComponent(componentPath) {
                this.component = () => ({
                    component: import(componentPath),
                    delay: 0,
                    timeout: 3000,
                })
                this.hasComponent = true
            },
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
