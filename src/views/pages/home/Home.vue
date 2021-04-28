<template lang="pug">
    .home
        img(alt="Vue logo" src="../../../assets/logo.png")
        .hello
            h1 Welcome to Your Vue Starter App
            p
                strong
                    | Based on&nbsp;
                    a(href="https://vuejs.org/" target="_blank") Vue.js {{ vueVersion }}
            p
                | For a guide and recipes on how to configure / customize this project,
                br
                | check out the&nbsp;
                a(href="https://github.com/linhntaim/vue-starter/blob/master/README.md" target="_blank" rel="noopener") README.md
                | .
            h3 Installed CLI Plugins
            ul
                li
                    a(href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel" target="_blank" rel="noopener") babel
                li
                    a(href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-router" target="_blank" rel="noopener") router
                li
                    a(href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-vuex" target="_blank" rel="noopener") vuex
                li
                    a(href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint" target="_blank" rel="noopener") eslint
            h3 Essential Links
            ul
                li
                    a(href="https://github.com/linhntaim/vue-starter" target="_blank" rel="noopener") Homepage
                li
                    a(href="https://linhntaim.com" target="_blank" rel="noopener") Author
                li
                    a(href="https://github.com/linhntaim" target="_blank" rel="noopener") Author's Github
                li
                    a(href="https://github.com/linhntaim?tab=repositories" target="_blank" rel="noopener") Author's Repositories
                li
                    a(href="https://www.npmjs.com/~linhntaim" target="_blank" rel="noopener") Author's Packages on NPM
                li
                    a(href="https://hub.docker.com/u/linhntaim" target="_blank" rel="noopener") Author's Images on Docker
            h3 Ecosystem
            ul
                li
                    a(href="https://github.com/linhntaim/vue-app" target="_blank" rel="noopener") vue-app
                li
                    a(href="https://github.com/linhntaim/vue-define" target="_blank" rel="noopener") vue-define
                li
                    a(href="https://github.com/linhntaim/vue-bus" target="_blank" rel="noopener") vue-bus
                li
                    a(href="https://github.com/linhntaim/vue-router" target="_blank" rel="noopener") vue-router
                li
                    a(href="https://github.com/linhntaim/vue-services" target="_blank" rel="noopener") vue-services
                li
                    a(href="https://github.com/linhntaim/vue-uses" target="_blank" rel="noopener") vue-uses
                li
                    a(href="https://github.com/linhntaim/vue-utils" target="_blank" rel="noopener") vue-utils
</template>

<script>
/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

import Vue from 'vue'

export default {
    name: 'Home',
    data() {
        return {
            vueVersion: Vue.version,
        }
    },
}
</script>

<style lang="scss" scoped>
h3 {
    margin: 40px 0 0;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}

a {
    color: #42b983;
}
</style>
