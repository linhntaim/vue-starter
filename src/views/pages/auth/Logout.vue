<template lang="pug">
    .row.justify-content-center
        .col-xl-10.col-lg-12.col-md-9
</template>

<script>
    import {mapActions} from '@dsquare-gbu/vue-uses'
    import {session} from '@dsquare-gbu/vue-router'
    import {APP_ROUTE} from '../../../app/config'

    export default {
        name: 'Logout',
        data() {
            return {
                loading: false,
            }
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
                this.$router.push({name: APP_ROUTE.redirect_path_if_unauthenticated})
            },
        },
    }
</script>
