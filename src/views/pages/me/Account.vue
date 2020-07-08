<template lang="pug">
    div
        h1.h3.mb-3.text-gray-800 {{ $t('pages._me._') }}
        edit-information-box
</template>

<script>
    import EditInformationBox from './EditInformationBox'

    export default {
        name: 'MyAccount',
        components: {EditInformationBox},
    }
</script>
