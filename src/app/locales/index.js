/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

import {LocaleManager} from '@dsquare-gbu/vue-uses'
import {settingsCookieStore} from '../utils'
import {app} from '@dsquare-gbu/vue-app'

export function importLocale(locale) {
    return import(`./lang/${locale}`)
}

export const localeManager = new LocaleManager(app, importLocale, settingsCookieStore.retrieve().locale)