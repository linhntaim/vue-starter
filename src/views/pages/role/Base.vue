<template lang="pug">
    div
        h1.h3.mb-3.text-gray-800 {{ $t('pages._role._') }}
        router-view
</template>

<script>
    import {mapActions} from 'vuex'

    export default {
        name: 'Base',
        destroyed() {
            this.roleDestruct()
        },
        methods: {
            ...mapActions({
                roleDestruct: 'role/destruct',
            }),
        },
    }
</script>
