<template lang="pug">
    div
        h1.h3.mb-3.text-gray-800 {{ $t('pages._dashboard._') }}
        .row
            .col-md-6.col-lg-4.dash-box(v-for="dashBox in dashBoxes")
                component(:is="dashBox.component" v-bind="dashBox.props")
</template>

<script>
    import {mapGetters} from 'vuex'
    import LoadingDashBox from './boxes/LoadingDashBox'
    import ErrorDashBox from './boxes/ErrorDashBox'

    export default {
        name: 'Dashboard',
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
                // if (this.accountPermissions.indexOf('be-owner') !== -1) {
                // }
            },
            addDashBox(id, name) {
                this.dashBoxes.push({
                    component: () => ({
                        component: import('./boxes/' + name),
                        loading: LoadingDashBox,
                        error: ErrorDashBox,
                        delay: 0,
                        timeout: 3000
                    }),
                    props: {
                        id: id,
                    },
                })
            }
        },
    }
</script>
