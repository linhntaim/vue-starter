/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

export const APP_ENV = process.env.VUE_APP_ENV
export const APP_KEY = process.env.VUE_APP_KEY.substr(0, 7) === 'base64:' ? atob(process.env.VUE_APP_KEY.substr(7)) : process.env.VUE_APP_KEY
export const APP_DEBUG = process.env.VUE_APP_DEBUG === 'true'
export const APP_LOG_ONLY = process.env.VUE_APP_LOG_ONLY ? process.env.VUE_APP_LOG_ONLY.split(',') : []
export const APP_ID = process.env.VUE_APP_ID
export const APP_NAME = process.env.VUE_APP_NAME
export const APP_TITLE_SEPARATOR = process.env.VUE_APP_TITLE_SEPARATOR ? process.env.VUE_APP_TITLE_SEPARATOR : '|'
export const APP_AUTHOR = process.env.VUE_APP_AUTHOR
export const APP_DESCRIPTION = process.env.VUE_APP_DESCRIPTION
export const APP_EMAIL = process.env.VUE_APP_EMAIL
export const APP_CLIENT_ADMIN = 'admin'
export const APP_CLIENT_HOME = 'home'
export const APP_HOST_SELF = 'self'
export const APP_HOST_SUB = 'sub'
export const APP_ADMIN_HOST = process.env.VUE_APP_ADMIN_HOST
export const APP_ADMIN_HOST_SUB_PATH = process.env.VUE_APP_ADMIN_HOST_SUB_PATH
export const APP_ADMIN_URL = APP_ADMIN_HOST === APP_HOST_SUB ? window.location.origin + APP_ADMIN_HOST_SUB_PATH : process.env.VUE_APP_ADMIN_URL
export const APP_ADMIN_PATH = APP_ADMIN_HOST === APP_HOST_SUB ? APP_ADMIN_HOST_SUB_PATH : ''
export const APP_HOME_HOST = process.env.VUE_APP_HOME_HOST
export const APP_HOME_HOST_SUB_PATH = process.env.VUE_APP_HOME_HOST_SUB_PATH
export const APP_HOME_URL = APP_HOME_HOST === APP_HOST_SUB ? window.location.origin + APP_HOME_HOST_SUB_PATH : process.env.VUE_APP_HOME_URL
export const APP_HOME_PATH = APP_HOME_HOST === APP_HOST_SUB ? APP_HOME_HOST_SUB_PATH : ''
export const APP_ASSETS_HOST = process.env.VUE_APP_ASSETS_HOST
export const APP_ASSETS_HOST_SUB_PATH = process.env.VUE_APP_ASSETS_HOST_SUB_PATH
export const APP_ASSETS_URL = APP_ASSETS_HOST === APP_HOST_SUB ? window.location.origin + APP_ASSETS_HOST_SUB_PATH : process.env.VUE_APP_ASSETS_URL
export const APP_ASSETS_PATH = APP_ASSETS_HOST === APP_HOST_SUB ? APP_ASSETS_HOST_SUB_PATH : ''
export const APP_SERVICE_HOST = process.env.VUE_APP_SERVICE_HOST
export const APP_SERVICE_HOST_SUB_PATH = process.env.VUE_APP_SERVICE_HOST_SUB_PATH
export const APP_SERVICE_URL = APP_SERVICE_HOST === APP_HOST_SUB ? window.location.origin + APP_SERVICE_HOST_SUB_PATH : process.env.VUE_APP_SERVICE_URL
export const APP_CLIENT = process.env.VUE_APP_CLIENT ? process.env.VUE_APP_CLIENT : APP_CLIENT_ADMIN
export const APP_URL = APP_CLIENT === APP_CLIENT_ADMIN ? APP_ADMIN_URL : APP_HOME_URL
export const APP_HOST = APP_CLIENT === APP_CLIENT_ADMIN ? APP_ADMIN_HOST : APP_HOME_HOST
export const APP_HOST_SUB_PATH = APP_CLIENT === APP_CLIENT_ADMIN ? APP_ADMIN_HOST_SUB_PATH : APP_HOME_HOST_SUB_PATH
const basicAuthException = process.env.VUE_APP_SERVICE_HEADER_BASIC_AUTHORIZATION_EXCEPTION
const hasBasicAuth = process.env.VUE_APP_SERVICE_HEADER_BASIC_AUTHORIZATION
    && (!basicAuthException || basicAuthException.split(',').every(regex => !(new RegExp(regex)).test(window.location.hostname)))
const headerTokenAuthorization = hasBasicAuth ? process.env.VUE_APP_SERVICE_HEADER_TOKEN_AUTHORIZATION_NAME : 'Authorization'
export const APP_DEFAULT_SERVICE = {
    baseUrl: APP_SERVICE_URL,
    clientId: process.env.VUE_APP_SERVICE_CLIENT_ID,
    clientSecret: process.env.VUE_APP_SERVICE_CLIENT_SECRET,
    hasBasicAuth: hasBasicAuth,
    basicAuth: process.env.VUE_APP_SERVICE_HEADER_BASIC_AUTHORIZATION,
    tokenRefreshEnabled: process.env.VUE_APP_SERVICE_TOKEN_REFRESH_ENABLED === 'true',
    tokenAutoRevokeBefore: (parseInt(process.env.VUE_APP_SERVICE_TOKEN_AUTO_REVOKE_BEFORE) | 0) * 1000,
    headerTokenAuthorization: headerTokenAuthorization,
    headerClientIdEnabled: process.env.VUE_APP_SERVICE_HEADER_CLIENT_ID_ENABLED === 'true',
    requestParams: {
        tokenType: '_x_token_type',
        accessToken: '_x_access_token',
        authorization: '_x_authorization',
    },
    headers: {
        clientId: process.env.VUE_APP_SERVICE_HEADER_CLIENT_ID_NAME,
        screen: process.env.VUE_APP_SERVICE_HEADER_SCREEN_NAME,
        settings: process.env.VUE_APP_SERVICE_HEADER_SETTINGS_NAME,
        device: process.env.VUE_APP_SERVICE_HEADER_DEVICE_NAME,
    },
    headerEncryptExcepts: process.env.VUE_APP_SERVICE_HEADER_ENCRYPT_EXCEPTS ?
        (excepts => {
            excepts = excepts.filter(except => !!except)
            excepts.push(headerTokenAuthorization)
            return excepts
        })(process.env.VUE_APP_SERVICE_HEADER_ENCRYPT_EXCEPTS.split(',')) : [headerTokenAuthorization],
}
export const APP_COOKIE = {
    names: {
        default: process.env.VUE_APP_COOKIE_DEFAULT_NAME,
        device: process.env.VUE_APP_COOKIE_DEVICE_NAME,
        settings: process.env.VUE_APP_COOKIE_SETTINGS_NAME,
    },
    disabled: {
        device: process.env.VUE_APP_COOKIE_DISABLE_DEVICE,
        settings: process.env.VUE_APP_COOKIE_DISABLE_SETTINGS,
    },
    defaultSettings: {
        expires: function () {
            return new Date(new Date().getTime() + 365 * 24 * 3600 * 1000)
        },
        path: '/',
        domain: (process.env.VUE_APP_COOKIE_INCLUDE_SUBDOMAINS === 'true' ? '.' : '')
            + (process.env.VUE_APP_COOKIE_DOMAIN ? process.env.VUE_APP_COOKIE_DOMAIN : window.location.hostname),
    },
}
export const DEFAULT_PREREQUISITE_LIFETIME = 31622400
export const DEFAULT_SETTINGS = {
    appId: APP_ID,
    appUrl: APP_URL,
    locale: process.env.VUE_APP_LOCALE,
    country: process.env.VUE_APP_COUNTRY,
    timezone: process.env.VUE_APP_TIMEZONE,
    currency: process.env.VUE_APP_CURRENCY,
    numberFormat: process.env.VUE_APP_NUMBER_FORMAT,
    firstDayOfWeek: 0,
    longDateFormat: 0,
    shortDateFormat: 0,
    longTimeFormat: 0,
    shortTimeFormat: 0,
}
export const DEFAULT_DEVICE = {
    provider: 'browser',
    secret: null,
}
export const ITEMS_PER_PAGE_LIST = [10, 20, 50, 100]
export const TOAST_DEF = {
    primary: 'primary',
    success: 'success',
    info: 'info',
    warning: 'warning',
    danger: 'danger',
    secondary: 'secondary',
    default: 'default',
}
export const ERROR_LEVEL = {
    1: {text: 'info'},
    2: {text: 'warning'},
    3: {text: 'error'},
    4: {text: 'success'},
}
export const ERROR_LEVEL_DEF = {
    none: 0,
    info: 1,
    warning: 2,
    error: 3,
    success: 4,
}
export const ERROR_MESSAGE_LEVEL = {
    1: {text: 'user_failed'},
    2: {text: 'database_failed'},
    3: {text: 'application_failed'},
    4: {text: 'unhandled_error'},
}
export const EXPORT_STATE_DEF = {
    exporting: 1,
    exported: 2,
    failed: 3,
}
export const CLOCK_BLOCK_RANGE = 30
export const CLOCK_BLOCK_KEYS = [
    'u&9zBJT4ztfLQM?Mp22r7ApPx$F3=jGkVMPGzhuxubrG^JawRe9haGpJrL^CaL8X',
    'FazYe6ghQ?n86GTDpFYYt!4AZM%%*Ye48!7w^MRqe?w#yjPLE-Lgq*Uy@jbq+7r*',
    'VMnJMTquv?vvux33G!?D6!jxeKDt?Yfqjx+*e7B6+C@7UU=qe3WsS*QPYxexHjkB',
    'm_dbQ7RH4bXynUr&9H%kVQcZp8gdHz3gqES-QN5nJH8p%yN@Gs@Vmz9Lv5*u6T+P',
    'Q-YfkLfu#8Dg2ZFAQH%ttbemgKudsx&#cWtr6uRW5&bNLNDRvmaD-mc!thtXGQ!9',
    'f^j&3cDj&J4$*-*yw3meFfC_Qc_r^4G+*td87YB58xF2JPUrQ!N68JDWvN*aC!AZ',
    'y?M3x_=tB5S!Dn!^yvKPEPdHs5$7!t^@rvUM2Yd%2gKbS$D&BVw5+LWzLCUJB+S?',
    'R^dANH-e^*?h6UK@uCR_a?dSX%aj7L%!^mM=#xzFY9E*=x3aF9uaLwvHBj4VHCVH',
]
export const APP_ROUTE = {
    root: {
        name: 'root',
    },
    redirectIfAuthenticated: {
        name: 'root',
    },
    redirectIfUnauthenticated: {
        name: 'login',
    },
    redirectAfterAuthenticated: {
        name: 'root',
    },
    redirectAfterUnauthenticated: {
        name: 'root',
    },
    authenticate: {
        name: 'login',
    },
    unauthenticate: {
        name: 'logout',
    },
    maintenance: {
        name: 'maintenance',
    },
    limitation: {
        name: 'limitation',
    },
    badRequest: {
        name: 'bad_request',
    },
    unauthenticated: {
        name: 'unauthenticated',
    },
    unauthorized: {
        name: 'unauthorized',
    },
    notFound: {
        name: 'not_found',
    },
    internalServerError: {
        name: 'internal_server_error',
    },
    serviceUnavailable: {
        name: 'service_unavailable',
    },
    resetPassword: {
        name: 'reset_password',
    },
}
export const APP_ERROR_ROUTE_NAMES = [
    APP_ROUTE.badRequest.name,
    APP_ROUTE.unauthenticated.name,
    APP_ROUTE.unauthorized.name,
    APP_ROUTE.notFound.name,
    APP_ROUTE.internalServerError.name,
    APP_ROUTE.serviceUnavailable.name,
]
export const APP_OPTION = {
    yes: 1,
    no: 2,
}
export const LOCALE_MAPPING_FLAG_ICON_NAME_DEF = {
    en: 'gb',
    ja: 'jp',
    vi: 'vn',
}
export const LOCALE_MAPPING_MOMENT_DEF = {
    en: 'en-gb',
    ja: 'ja',
    vi: 'vi',
}
const maxChunkUploadSize = parseInt(process.env.VUE_APP_MAX_CHUNK_UPLOAD_SIZE) | 0
export const MAX_CHUNK_UPLOAD_SIZE = maxChunkUploadSize ? maxChunkUploadSize : 1024 * 1024 // 1 MB, default