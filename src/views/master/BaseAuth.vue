<template lang="pug">
    div
        #wrapper
            base-sidebar
            #content-wrapper.d-flex.flex-column
                #content
                    base-header
                    .container-fluid
                        router-view
                base-footer
        a.scroll-to-top.rounded(href="#page-top" data-toggle="tooltip" :title="$t('master.base.top')")
            i.fas.fa-angle-up
        a.scroll-to-back.rounded(@click.prevent="onPageBackClicked()" href="#page-back" data-toggle="tooltip" :title="$t('master.base.back')")
            i.fas.fa-angle-left
        logout-modal
</template>

<script>
/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

import {ui} from '../../app/utils'
import BaseHeader from './BaseHeader'
import BaseFooter from './BaseFooter'
import BaseSidebar from './BaseSidebar'
import LogoutModal from '../components/LogoutModal'

export default {
    name: 'BaseAuth',
    components: {
        BaseSidebar,
        BaseHeader,
        BaseFooter,
        LogoutModal,
    },
    mounted() {
        this.initUi()
    },
    destroyed() {
        this.destroyUi()
    },
    methods: {
        onPageBackClicked() {
            this.$router.back()
        },

        initUi() {
            const $window = ui.query(window).get(),
                $document = ui.query(document).get(),
                $body = ui.query('body').get(),
                $sidebar = ui.query('.sidebar').get(),
                $sidebarCollapse = ui.query('.sidebar .collapse').get(),
                $scrollToTop = ui.query('.scroll-to-top').get(),
                $scrollToBack = ui.query('.scroll-to-back').get(),
                $htmlBody = ui.query('html, body').get()

            $body.attr('id', 'page-top')
            ui.query('[data-toggle="tooltip"]').get().tooltip()

            let flag576 = $window.width() < 576 ? 1 : 2
            $window.on('resize', function () {
                // Close any open menu accordions when window is resized below 768px
                const flag576c = $window.width() < 576 ? 1 : 2
                if (flag576c !== flag576) {
                    if (flag576c === 1) {
                        if (!$sidebar.hasClass('toggled')) {
                            $body.toggleClass('sidebar-toggled')
                            $sidebar.toggleClass('toggled')
                        }
                    }
                    else {
                        if ($sidebar.hasClass('toggled')) {
                            $body.toggleClass('sidebar-toggled')
                            $sidebar.toggleClass('toggled')
                        }
                    }
                    flag576 = flag576c
                }

                if ($window.width() < 768) {
                    $sidebarCollapse.collapse('hide')
                }
            })

            $document.on('click', '#sidebarToggle, #sidebarToggleTop', function () {
                // Toggle the side navigation
                $body.toggleClass('sidebar-toggled')
                $sidebar.toggleClass('toggled')
                if ($sidebar.hasClass('toggled')) {
                    $sidebarCollapse.collapse('hide')
                }
            }).on('mousewheel DOMMouseScroll wheel', 'body.fixed-nav .sidebar', function (e) {
                // Prevent the content wrapper from scrolling when the fixed side navigation hovered over
                if ($window.width() > 768) {
                    const e0 = e.originalEvent,
                        delta = e0.wheelDelta || -e0.detail
                    this.scrollTop += (delta < 0 ? 1 : -1) * 30
                    e.preventDefault()
                }
            }).on('scroll', function () {
                // Scroll to top button appear
                const scrollDistance = ui.query(this).get().scrollTop()
                if (scrollDistance > 100) {
                    $scrollToTop.fadeIn()
                    $scrollToBack.addClass('has-top')
                }
                else {
                    $scrollToTop.fadeOut()
                    $scrollToBack.removeClass('has-top')
                }
            }).on('click', 'a.scroll-to-top', function (e) {
                // Smooth scrolling using jQuery easing
                const $anchor = ui.query(this).get()
                $htmlBody.stop().animate({
                    scrollTop: ui.query($anchor.attr('href')).get().offset().top,
                }, 1000, 'easeInOutExpo')
                e.preventDefault()
            })
        },

        destroyUi() {
            const $window = ui.query(window).get(),
                $document = ui.query(document).get(),
                $body = ui.query('body').get()

            $body.removeAttr('id')
            ui.query('[data-toggle="tooltip"]').get().tooltip('dispose')

            $window.off('resize')
            $document.off('click', '#sidebarToggle, #sidebarToggleTop')
                .off('mousewheel DOMMouseScroll wheel', '#body.fixed-nav .sidebar')
                .off('scroll')
                .off('click', 'a.scroll-to-top')
        },
    },
}
</script>
