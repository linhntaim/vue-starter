<template lang="pug">
    div
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: 'Home',
        computed: {
            ...mapGetters({
                accountPermissions: 'account/permissions',
            }),
        },
        created() {
            if (this.accountPermissions.indexOf('be-owner') !== -1) {
                this.$router.push({name: 'dashboard'})
            }
        },
    }
</script>
