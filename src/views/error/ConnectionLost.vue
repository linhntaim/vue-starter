<template lang="pug">
    .card.shadow.error-block
        .card-body
            .text-center
                .error.mx-auto(data-text="503") 503
                p.lead.text-gray-800.mb-5 {{ $t('error.connection_lost._') }}
                p.text-gray-500.mb-0 {{ $t('error.connection_lost.desc') }}
                button.btn.btn-primary.mt-3(@click="onRefreshClicked()")
                    | {{ $t('actions.refresh') }}
</template>

<script>
    import {ui} from '../../app/utils'

    export default {
        name: 'ConnectionLost',
        methods: {
            onRefreshClicked() {
                ui.reloadPage()
            }
        }
    }
</script>
