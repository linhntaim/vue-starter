<template lang="pug">
    div
</template>

<script>
    /**
     * Base - Any modification needs to be approved, except the space inside the block of TODO
     */

    import {headTitle} from '../../app/utils'

    export default {
        name: 'Blank',
        head: {
            title() {
                return {
                    inner: headTitle('Blank'),
                }
            },
        },
    }
</script>
