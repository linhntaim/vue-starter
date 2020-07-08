<template lang="pug">
    .card.shadow.error-block
        .card-body
            .text-center
                .error.mx-auto(data-text="404") 404
                p.lead.text-gray-800.mb-5 {{ $t('error.not_found._') }}
                p.text-gray-500.mb-0 {{ $t('error.not_found.desc') }}
                router-link(:to="{path: '/'}") {{ $t('error.back_to_root') }}
</template>

<script>
    export default {
        name: 'NotFound',
    }
</script>
