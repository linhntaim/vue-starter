import {Middleware} from '@dsquare-gbu/vue-uses'

export default class LocaleMiddleware extends Middleware {
    handle() {
        this.log('locale', 'middleware')

        const query = this.to().query
        const locale = query.locale ? query.locale : (query.lang ? query.lang : null)
        if (locale) {
            this.store().dispatch('account/updateLocale', {
                locale: locale,
                doneCallback: () => this.next(),
            })
        } else {
            this.next()
        }
    }
}
