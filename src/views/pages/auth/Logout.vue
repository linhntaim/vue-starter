<template lang="pug">
    .row.justify-content-center
        .col-xl-10.col-lg-12.col-md-9
</template>

<script>
    import {mapActions} from 'vuex'
    import {session} from '@dsquare-gbu/vue-router'

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
                        session.restart()
                        this.$router.push('/auth/login')
                    },
                })
            },
        },
    }
</script>
