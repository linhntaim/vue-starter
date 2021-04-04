<template lang="pug">
    .home
        img(alt="Vue logo" src="../../../assets/logo.png")
        .hello
            h1 Welcome to Your Vue Starter App
            p
                | For a guide and recipes on how to configure / customize this project,
                br
                | check out the&nbsp;
                a(href="http://git-gbu.japaneast.cloudapp.azure.com/base/vue-starter/blob/master/README.md" target="_blank" rel="noopener") README.md
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
                    a(href="http://git-gbu.japaneast.cloudapp.azure.com/base/vue-starter" target="_blank" rel="noopener") Homepage
                li
                    a(href="https://homepage-gbu.azurewebsites.net/back-end/" target="_blank" rel="noopener") Back-end Docs
                li
                    a(href="http://git-gbu.japaneast.cloudapp.azure.com/" target="_blank" rel="noopener") Gitlab
                li
                    a(href="http://git-gbu.japaneast.cloudapp.azure.com/base/" target="_blank" rel="noopener") Base Projects
                li
                    a(href="https://www.npmjs.com/settings/dsquare-gbu/packages" target="_blank" rel="noopener") Packages on NPM
                li
                    a(href="https://hub.docker.com/orgs/gbuatdsquare" target="_blank" rel="noopener") Images on Docker
            h3 Ecosystem
            ul
                li
                    a(href="http://git-gbu.japaneast.cloudapp.azure.com/base/vue-app" target="_blank" rel="noopener") vue-app
                li
                    a(href="http://git-gbu.japaneast.cloudapp.azure.com/base/vue-bus" target="_blank" rel="noopener") vue-bus
                li
                    a(href="http://git-gbu.japaneast.cloudapp.azure.com/base/vue-router" target="_blank" rel="noopener") vue-router
                li
                    a(href="http://git-gbu.japaneast.cloudapp.azure.com/base/vue-services" target="_blank" rel="noopener") vue-services
                li
                    a(href="http://git-gbu.japaneast.cloudapp.azure.com/base/vue-uses" target="_blank" rel="noopener") vue-uses
                li
                    a(href="http://git-gbu.japaneast.cloudapp.azure.com/base/vue-utils" target="_blank" rel="noopener") vue-utils
</template>

<script>
/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

export default {
    name: 'Home',
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
