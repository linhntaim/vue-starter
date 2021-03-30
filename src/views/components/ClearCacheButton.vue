<template lang="pug">
    button.btn.btn-danger(v-if="enabled" @click="onClearCacheClicked()") {{ $t('actions.clear_cache') }}
</template>

<script>
/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

import {mapActions, mapMutations} from '@linhntaim/vue-uses'
import {APP_ROUTE} from '../../app/config'

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
        ...mapActions({
            accountLogout: 'account/logout',
        }),
        onClearCacheClicked() {
            this.accountLogout({
                alwaysCallback: () => {
                    this.$router.push(APP_ROUTE.root)
                },
            })
        },
    },
}
</script>
