<template lang="pug">
    .card.shadow.error-block
        .card-body
            .text-center
                .error.mx-auto 503
                p.lead.text-gray-800.mb-5 {{ $t('error.maintenance._') }}
                p.text-gray-500.mb-0(v-html="$t('error.maintenance.desc')")
                button.btn.btn-primary.mt-3(@click="onRefreshClicked()")
                    | {{ $t('actions.refresh') }}
</template>

<script>
    /**
     * Base - Any modification needs to be approved, except the space inside the block of TODO
     */

    import {headTitle, ui} from '../../app/utils'

    export default {
        name: 'Maintenance',
        head: {
            title() {
                return {
                    inner: headTitle('503 - Maintenance'),
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
