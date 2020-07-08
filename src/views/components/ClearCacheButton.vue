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
                accountUnsetUser: 'account/unsetUser',
            }),
            onClearCacheClicked() {
                this.accountUnsetAuth()
                this.accountUnsetUser()

                this.$router.push('/auth/login')
            }
        }
    }
</script>
