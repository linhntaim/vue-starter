<template lang="pug">
    span.formatted-number
        | {{ formattedNumber }}
</template>

<script>
    /**
     * Base - Any modification needs to be approved, except the space inside the block of TODO
     */

    import {numberFormatter} from '../../app/utils'

    export default {
        name: 'FormattedNumber',
        props: {
            number: Number,
            type: String,
        },
        computed: {
            formattedNumber() {
                return this.type === 'int' ? numberFormatter.formatInt(this.number) : numberFormatter.formatNumber(this.number)
            },
        },
    }
</script>
