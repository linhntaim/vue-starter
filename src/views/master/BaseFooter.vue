<template lang="pug">
    footer.sticky-footer.bg-white
        .container-fluid
            .copyright
                span(v-html="$t('master.base_footer.copyright', {app_name: appName, year: year})")
</template>

<script>
    import {APP_NAME} from '../../app/config'

    export default {
        name: 'BaseFooter',
        data() {
            return {
                appName: APP_NAME,
                year: (new Date()).getFullYear(),
            }
        }
    }
</script>
