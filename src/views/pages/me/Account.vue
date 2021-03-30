<template lang="pug">
    div
        h1.h3.mb-3.text-gray-800 {{ $t('pages._me._') }}
        edit-information-box
</template>

<script>
/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

import {headTitle} from '../../../app/utils'
import EditInformationBox from './EditInformationBox'

export default {
    name: 'Account',
    components: {EditInformationBox},
    head: {
        title() {
            return {
                inner: headTitle(this.$t('pages._me._')),
            }
        },
    },
}
</script>
