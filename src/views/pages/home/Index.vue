<template lang="pug">
    .flex-center.position-ref.full-height
        .top-right.links
            router-link(:to="appRoutes.authenticate") Login
        .content
            .title.m-b-md
                | DSquare - GBU
            .links
                a(href='https://homepage-gbu.azurewebsites.net/' target='_blank') Homepage
                a(href='https://homepage-gbu.azurewebsites.net/back-end/' target='_blank') Back-end Docs
                a(href='http://git-gbu.japaneast.cloudapp.azure.com/' target='_blank') Gitlab
                a(href='http://git-gbu.japaneast.cloudapp.azure.com/base/' target='_blank') Base Projects
                a(href='https://www.npmjs.com/settings/dsquare-gbu/packages' target='_blank') Packages on NPM
                a(href='https://hub.docker.com/orgs/gbuatdsquare' target='_blank') Images on Docker
</template>

<script>/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

import {APP_ROUTE} from '@/app/config'

export default {
    name: 'Index',
    data() {
        return {
            appRoutes: APP_ROUTE,
        }
    },
}
</script>