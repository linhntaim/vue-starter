/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

import {timeoutCaller} from './default'
import {LocaleChange} from './locale-change'
import {Screen} from './screen'
import {APP_TITLE_SEPARATOR} from '../config'

export function headTitle(...titles) {
    return titles.join(' ' + APP_TITLE_SEPARATOR + ' ')
}

export const localeChange = new LocaleChange(timeoutCaller)
export const currentScreen = new Screen()

// TODO:
//  Define global utils
//  Example:
//  export utils = new Utils()

// TODO