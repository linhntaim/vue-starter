<template lang="pug">
    .card.shadow.error-block
        .card-body
            .text-center
                h1.error.mx-auto 503
                p.lead.mb-5 {{ $t('error.service_unavailable._') }}
                p.mb-0 {{ $t('error.service_unavailable.desc') }}
                button.btn.btn-primary.mt-3(@click="onRefreshClicked()")
                    | {{ $t('actions.refresh') }}
</template>

<script>
    /**
     * Base - Any modification needs to be approved, except the space inside the block of TODO
     */

    import {headTitle} from '../../app/utils'
    import {APP_ROUTE} from '../../app/config'

    export default {
        name: 'ServiceUnavailable',
        head: {
            title() {
                return {
                    inner: headTitle('503 - Service unavailable'),
                }
            },
        },
        methods: {
            onRefreshClicked() {
                this.$router.push({name: APP_ROUTE.root})
            },
        },
    }
</script>
