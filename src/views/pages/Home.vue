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
            // TODO: Make redirection or modify to render top-page content
        },
    }
</script>
