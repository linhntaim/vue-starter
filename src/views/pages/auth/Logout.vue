<template lang="pug">
    .row.justify-content-center
        .col-xl-10.col-lg-12.col-md-9
</template>

<script>
/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

import {headTitle} from '../../../app/utils'
import {mapActions, session} from '@linhntaim/vue-uses'
import {APP_ROUTE} from '../../../app/config'

export default {
    name: 'Logout',
    data() {
        return {
            loading: false,
        }
    },
    head: {
        title() {
            return {
                inner: headTitle(this.$t('pages._auth._logout._')),
            }
        },
    },
    mounted() {
        this.init()
    },
    methods: {
        ...mapActions({
            accountLogout: 'account/logout',
        }),
        init() {
            this.loading = true
            this.accountLogout({
                alwaysCallback: () => {
                    this.loading = false
                    this.afterLogout()
                },
            })
        },
        afterLogout() {
            session.restart()
            this.$router.push(APP_ROUTE.redirectAfterUnauthenticated)
            this.$bus.emit('logout')
        },
    },
}
</script>
