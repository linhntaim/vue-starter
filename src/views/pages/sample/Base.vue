<template lang="pug">
    div
        h1.h3.mb-3.text-gray-800 {{ $t('pages._sample._') }}
        router-view
</template>

<script>
/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

export default {
    name: 'Base',
}
</script>
