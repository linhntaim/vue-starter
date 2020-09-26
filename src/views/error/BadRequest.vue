<template lang="pug">
    .card.shadow.error-block
        .card-body
            .text-center
                .error.mx-auto 400
                p.lead.text-gray-800.mb-5 {{ $t('error.bad_request._') }}
                p.text-gray-500.mb-0 {{ $t('error.bad_request.desc') }}
                router-link(:to="{path: '/'}") {{ $t('error.back_to_root') }}
</template>

<script>
    /**
     * Base - Any modification needs to be approved, except the space inside the block of TODO
     */

    export default {
        name: 'BadRequest',
    }
</script>
