<template lang="pug">
    .card.shadow.error-block
        .card-body
            .text-center
                h1.error.mx-auto 503
                p.lead.mb-5 {{ $t('error.maintenance._') }}
                p.mb-0(v-html="$t('error.maintenance.desc')")
                button.btn.btn-primary.mt-3(@click="onRefreshClicked()")
                    | {{ $t('actions.refresh') }}
</template>

<script>
/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

import {headTitle, ui} from '@/app/utils'

export default {
    name: 'Maintenance',
    head: {
        title() {
            return {
                inner: headTitle(this.$t('error.maintenance._')),
            }
        },
    },
    methods: {
        onRefreshClicked() {
            ui.reloadPage()
        },
    },
}
</script>
