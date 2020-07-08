import {routes} from './app/router'
import {store} from './app/store'
import {use, routerUse, vuexUse, i18Use, AppMiddleware, SessionMiddleware} from '@dsquare-gbu/vue-uses'
import VueBus from '@dsquare-gbu/vue-bus'
import VueDefine from 'vue-define'
import VueHead from 'vue-head'
import {importLocale} from './app/locales'
import {localizationCookieStore} from './app/utils'

const appMiddleware = new AppMiddleware()

export default {
    define: use(VueDefine),
    bus: use(VueBus),
    head: use(VueHead),
    i18Use: vuexUse(importLocale, localizationCookieStore.retrieve().locale),
    router: routerUse(routes, [
        appMiddleware,
        new SessionMiddleware(),
    ], [
        appMiddleware,
    ]),
    store: vuexUse(store),
}