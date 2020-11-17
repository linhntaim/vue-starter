<template lang="pug">
    .card.shadow.error-block
        .card-body
            .text-center
                h1.error.mx-auto 403
                p.lead.mb-5 {{ $t('error.unauthorized._') }}
                p.mb-0 {{ $t('error.unauthorized.desc') }}
                div(:class="{'mb-2': enabled}")
                    router-link(:to="appRoutes.root") {{ $t('error.back_to_root') }}
                clear-cache-button(:enabled="enabled")
</template>

<script>
/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

import {headTitle} from '../../app/utils'
import ClearCacheButton from '../components/ClearCacheButton'
import {APP_ROUTE} from '@/app/config'

export default {
    name: 'Unauthorized',
    components: {ClearCacheButton},
    data() {
        return {
            appRoutes: APP_ROUTE,
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
                inner: headTitle(this.$t('error.unauthorized._')),
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
