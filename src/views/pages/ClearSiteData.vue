<template lang="pug">
    div
</template>

<script>
import {deviceCookieStore, bearerTokenCookieStore, settingsCookieStore} from '@/app/utils'

export default {
    name: 'ClearSiteData',
    created() {
        this.removeCookie()
        this.removeLocalStorage()
    },
    methods: {
        removeCookie() {
            bearerTokenCookieStore.remove()
            settingsCookieStore.remove()
            deviceCookieStore.remove()
        },
        removeLocalStorage() {
            Object.keys(window.localStorage).forEach(key => window.localStorage.removeItem(key))
        },
    },
}
</script>