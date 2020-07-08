<template lang="pug">
    nav.navbar.navbar-expand.navbar-light.bg-white.topbar.mb-4.static-top.shadow
        button#sidebarToggleTop.btn.btn-link.d-md-none.rounded-circle.mr-3
            i.fa.fa-bars
        ul.navbar-nav.ml-auto
            li.nav-item.dropdown.no-arrow(v-if="isLoggedIn")
                a#userDropdown.nav-link.dropdown-toggle(href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false")
                    span.mr-2.d-none.d-lg-inline.text-gray-600.small {{ currentUser.display_name }}
                    img.img-profile.rounded-circle(v-if="avatar" :src="avatar")
                .dropdown-menu.dropdown-menu-right.shadow.animated--grow-in(aria-labelledby="userDropdown")
                    router-link.dropdown-item(:to="{path: '/me'}")
                        i.fas.fa-user.fa-sm.fa-fw.mr-2.text-gray-400
                        | {{ $t('pages._me._') }}
                    .dropdown-divider
                    a.dropdown-item(href="#" data-toggle="modal" data-target="#logoutModal")
                        i.fas.fa-sign-out-alt.fa-sm.fa-fw.mr-2.text-gray-400
                        | {{ $t('actions.logout') }}
            li.nav-item.dropdown.locale-dropdown.no-arrow
                a.nav-link.dropdown-toggle.no-arrow(href="#" data-toggle="dropdown")
                    span.flag-icon.d-inline-block(:class="'flag-icon-' + localeMappingFlagIconNameDefs[currentUser.localization.locale]")
                    span.ml-2.text-gray-600 {{ currentUser.localization.locale.toUpperCase() }}
                .dropdown-menu.dropdown-menu-right.shadow.animated--grow-in
                    a.dropdown-item.px-3(v-for="metaLocale in metadata.locales" @click.prevent="onLocaleClicked(metaLocale)" :class="{'active': metaLocale.code === currentUser.localization.locale}" href="#")
                        span.flag-icon.d-inline-block(:class="'flag-icon-' + localeMappingFlagIconNameDefs[metaLocale.code]")
                        span.ml-2 {{ metaLocale.name }}
</template>

<script>
    import {log} from '../../app/utils'
    import {mapActions, mapGetters} from 'vuex'
    import {LOCALE_MAPPING_FLAG_ICON_NAME_DEF} from '../../app/config'

    export default {
        name: 'BaseHeader',
        data() {
            return {
                loading: false,

                localeMappingFlagIconNameDefs: LOCALE_MAPPING_FLAG_ICON_NAME_DEF,
            }
        },
        computed: {
            ...mapGetters({
                isLoggedIn: 'account/isLoggedIn',
                currentUser: 'account/user',
                metadata: 'prerequisite/metadata',
            }),
            avatar() {
                return this.currentUser && this.currentUser.url_avatar ?
                    this.currentUser.url_avatar : null
            },
        },
        mounted() {
            this.init()
        },
        methods: {
            ...mapActions({
                require: 'prerequisite/require',
                accountUpdateLocale: 'account/updateLocale',
            }),
            init() {
                this.loading = true
                this.require({
                    names: ['locales'],
                    doneCallback: () => {
                        this.loading = false

                        this.$forceUpdate()
                    },
                    errorCallback: err => {
                        this.loading = false

                        log.write(err, 'base_header')
                    },
                })
            },
            onLocaleClicked(locale) {
                if (locale.code === this.currentUser.localization.locale) return

                this.loading = true
                this.accountUpdateLocale({
                    locale: locale.code,
                    doneCallback: () => {
                        this.loading = false

                        this.$bus.emit('localeChanged')
                    },
                })
            },
        },
    }
</script>

<style lang="scss" scoped>
    .locale-dropdown {
        .flag-icon {
            width: 1.45em;
            border: 1px solid rgba(0, 0, 0, .12);
        }
    }
</style>