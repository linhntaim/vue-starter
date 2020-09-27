<template lang="pug">
    footer.sticky-footer.bg-white
        .container-fluid
            .copyright
                span(v-html="$t('master.base_footer.copyright', {app_name: appName, year: year})")
</template>

<script>
    /**
     * Base - Any modification needs to be approved, except the space inside the block of TODO
     */

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
