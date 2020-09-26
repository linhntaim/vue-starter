<template lang="pug">
    .card.shadow.error-block
        .card-body
            .text-center
                .error.mx-auto 403
                p.lead.text-gray-800.mb-5 {{ $t('error.unauthorized._') }}
                p.text-gray-500.mb-0 {{ $t('error.unauthorized.desc') }}
                div(:class="{'mb-2': enabled}")
                    router-link(:to="{path: '/'}") {{ $t('error.back_to_root') }}
                clear-cache-button(:enabled="enabled")
</template>

<script>
    /**
     * Base - Any modification needs to be approved, except the space inside the block of TODO
     */

    import ClearCacheButton from '../components/ClearCacheButton'

    export default {
        name: 'Unauthorized',
        components: {ClearCacheButton},
        data() {
            return {
                enabled: false,
            }
        },
        watch: {
            '$route'() {
                this.initUi()
            },
        },
        mounted() {
            this.initUi()
        },
        methods: {
            initUi() {
                if (this.$route.query.time) {
                    this.enabled = true
                }
            },
        },
    }
</script>
