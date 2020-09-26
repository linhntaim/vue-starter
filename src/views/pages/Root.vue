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
        name: 'Home',
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
                    this.component = () => ({
                        component: import('./home/IndexAuth'),
                        delay: 0,
                        timeout: 3000,
                    })
                } else {
                    this.$router.push({
                        name: APP_ROUTE.unauthenticated,
                        query: {
                            time: new Date().getTime(),
                        },
                    })
                }
            } else {
                this.component = () => ({
                    component: import('./home/Index'),
                    delay: 0,
                    timeout: 3000,
                })
            }
            // TODO
            this.hasComponent = true
        },
    }
</script>
