/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

import {currentScreen} from '../../../utils'
import {Middleware} from '../middleware'

export default class ScreenMiddleware extends Middleware {
    handle() {
        this.log('screen', 'middleware')

        currentScreen.updateByRouter(this.to())

        this.next()
    }
}