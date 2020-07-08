import {LocaleManager} from '@dsquare-gbu/vue-uses'
import {localizationCookieStore} from '../utils'

export function importLocale(locale) {
    return import(`./lang/${locale}`)
}

export const localeManager = new LocaleManager(importLocale, localizationCookieStore.retrieve().locale)