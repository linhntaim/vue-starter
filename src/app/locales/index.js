import {LocaleManager} from '@dsquare-gbu/vue-uses'
import {settingsCookieStore} from '../utils'
import app from '@dsquare-gbu/vue-app'

export function importLocale(locale) {
    return import(`./lang/${locale}`)
}

export const localeManager = new LocaleManager(app, importLocale, settingsCookieStore.retrieve().locale)