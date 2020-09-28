<template lang="pug">
    .row
        .col-md-6.col-lg-4.dash-box(v-for="dashBox in dashBoxes")
            component(:is="dashBox.component" v-bind="dashBox.props")
</template>

<script>
    /**
     * Base - Any modification needs to be approved, except the space inside the block of TODO
     */

    import {mapGetters} from '@dsquare-gbu/vue-uses'
    import LoadingDashBox from './boxes/LoadingDashBox'
    import ErrorDashBox from './boxes/ErrorDashBox'

    export default {
        name: 'SuperAdminDashboard',
        data() {
            return {
                dashBoxes: [],
            }
        },
        computed: {
            ...mapGetters({
                accountPermissions: 'account/permissions',
            }),
        },
        mounted() {
            this.init()
        },
        methods: {
            init() {
                if (this.accountPermissions.includes('be-super-admin')) {
                    this.addDashBox(-1, 'SystemLog')
                    this.addDashBox(-2, 'MaintenanceMode')
                    this.addDashBox(-3, 'IpLimitation')
                }
                if (this.accountPermissions.includes('impersonate')) {
                    this.addDashBox(-4, 'Impersonate')
                }
            },
            addDashBox(id, name) {
                this.dashBoxes.push({
                    component: () => ({
                        component: import('./boxes/' + name),
                        loading: LoadingDashBox,
                        error: ErrorDashBox,
                        delay: 0,
                        timeout: 3000,
                    }),
                    props: {
                        id: id,
                    },
                })
            },
        },
    }
</script>
