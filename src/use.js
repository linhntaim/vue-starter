/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

import {importLocale} from './app/locales'
import {routes} from './app/router'
import {settingsCookieStore} from './app/utils'
import {store} from './app/store'
import {use, routerUse, vuexUse, i18Use, AppMiddleware, SessionMiddleware} from '@linhntaim/vue-uses'
import {APP_NAME, APP_TITLE_SEPARATOR} from './app/config'
import VueBus from '@linhntaim/vue-bus'
import VueHead from 'vue-head'
// TODO:
//  Import extra plugins

// TODO

const appMiddleware = new AppMiddleware()

export default {
    bus: use(VueBus),
    head: use(VueHead, {
        separator: APP_TITLE_SEPARATOR,
        complement: APP_NAME,
    }),
    i18n: i18Use(importLocale, settingsCookieStore.retrieve().locale),
    store: vuexUse(store),
    router: routerUse(
        routes,
        [
            appMiddleware,
            new SessionMiddleware(),
        ],
        [
            appMiddleware,
        ],
    ),
    // TODO:
    //  Extra plugins

    // TODO
}