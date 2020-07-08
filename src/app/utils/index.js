import {
    CallbackWaiter,
    ConsoleLog,
    JsCookieHandler,
    Crypto,
    DateTimeHelper,
    DeviceCookieStore,
    FacebookSdk,
    GoogleApi,
    IntervalCaller,
    JqueryUi,
    LocalCacheHandler,
    LocalizationCookieStore,
    NumberFormatHelper,
    PassportCookieStore,
    PermissionChecker,
    ServerClock,
    TimeoutCaller,
} from '@dsquare-gbu/vue-utils'
import {
    APP_COOKIE,
    APP_DEBUG,
    APP_LOG_ONLY,
    CLOCK_BLOCK_KEYS,
    CLOCK_BLOCK_RANGE,
    DEFAULT_DEVICE,
    DEFAULT_LOCALIZATION,
} from '../config'
import Select2Ui from './select2-ui'

export const log = new ConsoleLog(APP_DEBUG, APP_LOG_ONLY)
export const cacheHandler = new LocalCacheHandler()
export const crypto = new Crypto()
export const cookieHandler = new JsCookieHandler(crypto, {
    domain: APP_COOKIE.domain,
    expires: APP_COOKIE.expires,
    path: APP_COOKIE.path,
    secret: APP_COOKIE.secret,
})
export const passportCookieStore = new PassportCookieStore(cookieHandler, APP_COOKIE.names.default, {
    accessToken: null,
    tokenType: null,
    refreshToken: null,
    tokenEndTime: 0,
})
export const localizationCookieStore = new LocalizationCookieStore(cookieHandler, APP_COOKIE.names.localization, DEFAULT_LOCALIZATION)
export const deviceCookieStore = new DeviceCookieStore(cookieHandler, APP_COOKIE.names.device, DEFAULT_DEVICE)
export const ui = new Select2Ui(new JqueryUi())
export const callbackWaiter = new CallbackWaiter()
export const timeoutCaller = new TimeoutCaller()
export const intervalCaller = new IntervalCaller()
export const serverClock = new ServerClock(CLOCK_BLOCK_KEYS, CLOCK_BLOCK_RANGE)

export const numberFormatHelper = new NumberFormatHelper(DEFAULT_LOCALIZATION)
export const dateTimeHelper = new DateTimeHelper(DEFAULT_LOCALIZATION)

export const permissionChecker = new PermissionChecker()

export const googleApi = new GoogleApi()
export const facebookSdk = new FacebookSdk(FACEBOOK_SERVICE)