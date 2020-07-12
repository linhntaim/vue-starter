<template lang="pug">
    button.btn.btn-danger(v-if="enabled" @click="onClearCacheClicked()") {{ $t('actions.clear_cache') }}
</template>

<script>
    import {mapMutations} from '@dsquare-gbu/vue-uses'

    export default {
        name: 'ClearCacheButton',
        props: {
            enabled: Boolean,
        },
        methods: {
            ...mapMutations({
                accountUnsetAuth: 'account/unsetAuth',
                accountUnsetAdmin: 'account/unsetAdmin',
            }),
            onClearCacheClicked() {
                this.accountUnsetAuth()
                this.accountUnsetAdmin()

                this.$router.push({name: 'login'})
            },
        },
    }
</script>
