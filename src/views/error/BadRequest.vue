<template lang="pug">
    .card.shadow.error-block
        .card-body
            .text-center
                .error.mx-auto 400
                p.lead.text-gray-800.mb-5 {{ $t('error.bad_request._') }}
                p.text-gray-500.mb-0 {{ $t('error.bad_request.desc') }}
                router-link(:to="appRoutes.root") {{ $t('error.back_to_root') }}
</template>

<script>
/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

import {headTitle} from '../../app/utils'
import {APP_ROUTE} from '../../app/config'

export default {
    name: 'BadRequest',
    data() {
        return {
            appRoutes: APP_ROUTE,
        }
    },
    head: {
        title() {
            return {
                inner: headTitle(this.$t('error.bad_request._')),
            }
        },
    },
}
</script>
