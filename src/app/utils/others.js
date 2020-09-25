/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

import {LocaleChange} from './locale-change'
import {timeoutCaller} from './default'

export const localeChange = new LocaleChange(timeoutCaller)

// TODO:
//  Define global utils
//  Example:
//  export utils = new Utils()

// TODO