<template lang="pug">
    button.btn.btn-secondary(@click="onClicked()" :disabled="disabled" type="button")
        | {{ $t('actions.back') }}
</template>

<script>
    /**
     * Base - Any modification needs to be approved, except the space inside the block of TODO
     */

    export default {
        name: 'BackButton',
        props: {
            disabled: Boolean,
        },
        methods: {
            onClicked() {
                this.$router.back()
            }
        }
    }
</script>
