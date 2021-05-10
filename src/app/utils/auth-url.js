export class AuthUrl {
    constructor(url, authParams) {
        this.url = url
        this.authParams = authParams
    }

    get() {
        const parser = new URL(this.url)
        if (parser.hostname === window.location.hostname) {
            return this.url
        }
        const authQuery = Object.keys(this.authParams).map(key => key + '=' + this.authParams[key]).join('&')
        if (parser.search) {
            parser.search += '&' + authQuery
        }
        else {
            parser.search = authQuery
        }
        return parser.toString()
    }
}