<template lang="pug">
    .card.shadow.error-block
        .card-body
            .text-center
                h1.error.mx-auto 404
                p.lead.mb-5 {{ $t('error.not_found._') }}
                p.mb-0 {{ $t('error.not_found.desc') }}
                router-link(:to="{path: '/'}") {{ $t('error.back_to_root') }}
</template>

<script>
    /**
     * Base - Any modification needs to be approved, except the space inside the block of TODO
     */

    export default {
        name: 'NotFound',
    }
</script>
