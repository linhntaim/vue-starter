<template lang="pug">
    .card.shadow.error-block
        .card-body
            .text-center
                .text-center
                    .error.mx-auto 401
                    p.lead.text-gray-800.mb-5 {{ $t('error.unauthenticated._') }}
                    p.text-gray-500.mb-0 {{ $t('error.unauthenticated.desc') }}
                    div(:class="{'mb-2': enabled}")
                        router-link(:to="{path: '/auth/login'}") ← {{ $t('actions.go', {where: $t('pages._auth._login._')}) }}
                    clear-cache-button(:enabled="enabled")
</template>

<script>
    /**
     * Base - Any modification needs to be approved, except the space inside the block of TODO
     */

    import {headTitle} from '../../app/utils'
    import ClearCacheButton from '../components/ClearCacheButton'

    export default {
        name: 'Unauthenticated',
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
        head: {
            title() {
                return {
                    inner: headTitle(this.$t('error.unauthenticated._')),
                }
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
