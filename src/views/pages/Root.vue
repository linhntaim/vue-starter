<template lang="pug">
    component(v-if="hasComponent" :is="component")
</template>

<script>
    /**
     * Base - Any modification needs to be approved, except the space inside the block of TODO
     */

    import {mapGetters} from '@dsquare-gbu/vue-uses'

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
                accountPermissions: 'account/permissions',
            }),
        },
        created() {
            // TODO:
            //  Make loading component based on condition
            if (this.accountIsLoggedIn) {
                this.component = () => ({
                    component: import('./home/IndexAuth'),
                    delay: 0,
                    timeout: 3000,
                })
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
