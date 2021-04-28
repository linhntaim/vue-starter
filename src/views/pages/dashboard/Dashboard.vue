<template lang="pug">
    div
        h1.h3.mb-3.text-gray-800 {{ $t('pages._dashboard._') }}
        component-loader(ref="component")
</template>

<script>
/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

import {headTitle} from '../../../app/utils'
import {mapGetters} from '@linhntaim/vue-uses'
import ComponentLoader from '../../ComponentLoader'

export default {
    name: 'Dashboard',
    components: {ComponentLoader},
    computed: {
        ...mapGetters({
            accountPermissions: 'account/permissions',
        }),
    },
    head: {
        title() {
            return {
                inner: headTitle(this.$t('pages._dashboard._')),
            }
        },
    },
    mounted() {
        this.init()
    },
    methods: {
        init() {
            if (this.accountPermissions.includes('be-super-admin')) {
                this.$refs.component.load('./pages/dashboard/SuperAdminDashboard')
                return
            }
            // TODO: Other dashboard

            // TODO
        },
    },
}
</script>
