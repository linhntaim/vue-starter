<template lang="pug">
    button.btn.btn-secondary(@click="onClicked()" :disabled="disabled" type="button")
        | {{ $t('actions.back') }}
</template>

<script>
    export default {
        name: 'BackButton',
        props: {
            disabled: Boolean,
        },
        methods: {
            onClicked() {
                this.$router.go(-1)
            }
        }
    }
</script>
