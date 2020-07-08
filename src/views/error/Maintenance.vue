<template lang="pug">
    .card.shadow.error-block
        .card-body
            .text-center
                .error.mx-auto(data-text="503") 503
                p.lead.text-gray-800.mb-5 {{ $t('error.maintenance._') }}
                p.text-gray-500.mb-0(v-html="$t('error.maintenance.desc')")
                button.btn.btn-primary.mt-3(@click="onRefreshClicked()")
                    | {{ $t('actions.refresh') }}
</template>

<script>
    import {ui} from '../../app/utils'

    export default {
        name: 'Maintenance',
        methods: {
            onRefreshClicked() {
                ui.reloadPage()
            },
        },
    }
</script>
