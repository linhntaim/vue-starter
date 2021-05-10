/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

import {parseEnv} from 'dotenv-packed'
import {CssBuilder} from './classes/css-builder'

parseEnv()

new CssBuilder().build([
    'style',
], [
    // TODO: Stable CSS Files

    // TODO
])
