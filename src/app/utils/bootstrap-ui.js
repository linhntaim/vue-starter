/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

import {JqueryUi} from '@linhntaim/vue-utils'
import {timeoutCaller} from './default'

export class BootstrapUi extends JqueryUi {
    onMounted() {
        const $body = this.query('body').get()

        // trick, support multiple modals
        let zIndex = 1050
        const __this = this
        this.query(document).get().on('show.bs.modal', '.modal', function () {
            zIndex += 2
            __this.query(this).get().css('z-index', zIndex)
            timeoutCaller.register(() => {
                $body.children('.modal-backdrop:last').css('z-index', zIndex - 1)
            })
        }).on('hidden.bs.modal', '.modal', function () {
            zIndex -= 2
        })

        $body.tooltip({
            selector: '[data-toggle="tooltip"]',
        })
    }

    onBeforeDestroy() {
        this.query(document).get().off('show.bs.modal')
            .off('hidden.bs.modal')
        this.query('body').get().tooltip('dispose')
    }

    onRouteChanged() {
        this.query('[data-toggle="tooltip"]').get().tooltip('hide')
    }
}