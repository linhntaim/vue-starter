<template lang="pug">
    .card.shadow.error-block
        .card-body
            .text-center
                h1.error.mx-auto 500
                p.lead.mb-5 {{ $t('error.internal_server_error._') }}
                p.mb-0 {{ $t('error.internal_server_error.desc') }}
                router-link(:to="{path: '/'}") {{ $t('error.back_to_root') }}
</template>

<script>
    export default {
        name: 'InternalServerError',
    }
</script>
