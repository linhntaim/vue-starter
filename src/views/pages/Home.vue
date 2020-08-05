<template lang="pug">
    div
</template>

<script>
    import {mapGetters} from '@dsquare-gbu/vue-uses'

    export default {
        name: 'Home',
        computed: {
            ...mapGetters({
                accountPermissions: 'account/permissions',
            }),
        },
        created() {
            if (this.accountPermissions.indexOf('be-super-admin') !== -1) {
                this.$router.push({name: 'dashboard'})
            }
            // TODO: Other redirection
        },
    }
</script>
