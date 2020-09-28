<template lang="pug">
    component(v-if="hasComponent" :is="component")
</template>

<script>
    export default {
        name: 'ComponentLoader',
        data() {
            return {
                component: null,
                hasComponent: false,
            }
        },
        methods: {
            load(componentPath) {
                this.component = () => ({
                    component: import('' + componentPath), // trick to prevent Webpack from showing warning
                    delay: 0,
                    timeout: 3000,
                })
                this.hasComponent = true
            },
        },
    }
</script>
