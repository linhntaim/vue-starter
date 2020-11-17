<template lang="pug">
    .card.shadow.error-block
        .card-body
            .text-center
                h1.error.mx-auto 503
                p.lead.mb-5 {{ $t('error.service_unavailable._') }}
                p.mb-0 {{ $t('error.service_unavailable.desc') }}
                router-link(:to="appRoutes.root") {{ $t('error.back_to_root') }}
</template>

<script>
/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

import {headTitle} from '../../app/utils'
import {APP_ROUTE} from '@/app/config'

export default {
    name: 'ServiceUnavailable',
    data() {
        return {
            appRoutes: APP_ROUTE,
        }
    },
    head: {
        title() {
            return {
                inner: headTitle(this.$t('error.service_unavailable._')),
            }
        },
    },
}
</script>
