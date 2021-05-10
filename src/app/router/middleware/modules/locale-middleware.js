/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

import {Middleware} from '../middleware'

export class LocaleMiddleware extends Middleware {
    handle() {
        this.log('locale', 'middleware')

        const query = this.to().query
        const locale = query.locale ? query.locale : (query.lang ? query.lang : null)
        if (locale) {
            this.store().dispatch('account/updateLocale', {
                locale: locale,
                doneCallback: () => this.next(),
            })
        }
        else {
            this.next()
        }
    }
}
