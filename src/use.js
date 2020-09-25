/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

import {importLocale} from './app/locales'
import {routes} from './app/router'
import {store} from './app/store'
import {settingsCookieStore} from './app/utils'
import {use, routerUse, vuexUse, i18Use, AppMiddleware, SessionMiddleware} from '@dsquare-gbu/vue-uses'
import VueBus from '@dsquare-gbu/vue-bus'
import VueDefine from 'vue-define'
import VueHead from 'vue-head'

const appMiddleware = new AppMiddleware()

export default {
    define: use(VueDefine),
    bus: use(VueBus),
    head: use(VueHead),
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