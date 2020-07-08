<template lang="pug">
    span.formatted-number
        | {{ formattedNumber }}
</template>

<script>
    import {numberFormatHelper} from '../../app/utils'

    export default {
        name: 'FormattedNumber',
        props: {
            number: Number,
            type: String,
        },
        computed: {
            formattedNumber() {
                return this.type === 'int' ? numberFormatHelper.formatInt(this.number) : numberFormatHelper.formatNumber(this.number)
            },
        },
    }
</script>
