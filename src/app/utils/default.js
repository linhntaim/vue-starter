/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

import {
    AppOptions,
    BearerTokenCookieStore,
    CallbackWaiter,
    ConsoleLog,
    JsCookieHandler,
    Crypto,
    DateTimer,
    DeviceCookieStore,
    FileHelper,
    IntervalCaller,
    IP,
    LocalCacheHandler,
    SettingsCookieStore,
    NumberFormatter,
    PermissionChecker,
    ServerClock,
    TimeoutCaller,
} from '@dsquare-gbu/vue-utils'
import {
    APP_COOKIE,
    APP_DEBUG,
    APP_KEY,
    APP_LOG_ONLY,
    CLOCK_BLOCK_KEYS,
    CLOCK_BLOCK_RANGE,
    DEFAULT_DEVICE,
    DEFAULT_SETTINGS,
} from '../config'
import BootstrapUi from './bootstrap-ui'

export const log = new ConsoleLog(APP_DEBUG, APP_LOG_ONLY)
export const cacheHandler = new LocalCacheHandler()
export const crypto = new Crypto()
export const cookieHandler = new JsCookieHandler(crypto, {
    expires: APP_COOKIE.expires,
    path: APP_COOKIE.path,
    domain: APP_COOKIE.domain,
    secret: APP_COOKIE.secret,
})
export const bearerTokenCookieStore = new BearerTokenCookieStore(cookieHandler, APP_COOKIE.names.default, {
    accessToken: null,
    tokenType: null,
    refreshToken: null,
    expiresIn: 0,
})
export const settingsCookieStore = new SettingsCookieStore(cookieHandler, APP_COOKIE.names.settings, DEFAULT_SETTINGS)
export const deviceCookieStore = new DeviceCookieStore(cookieHandler, APP_COOKIE.names.device, DEFAULT_DEVICE)
export const ui = new BootstrapUi()
export const callbackWaiter = new CallbackWaiter()
export const timeoutCaller = new TimeoutCaller()
export const intervalCaller = new IntervalCaller()
export const serverClock = new ServerClock(CLOCK_BLOCK_KEYS, CLOCK_BLOCK_RANGE)
export const ip = new IP()

export const numberFormatter = new NumberFormatter(DEFAULT_SETTINGS)
export const dateTimer = new DateTimer(DEFAULT_SETTINGS)

export const fileHelper = new FileHelper(numberFormatter)

export const permissionChecker = new PermissionChecker()

export const appOptions = new AppOptions()

export const encrypt = function (data) {
    return typeof data === 'object' ?
        crypto.encryptJson(data, APP_KEY)
        : crypto.encrypt(data, APP_KEY)
}

export const decrypt = function (encrypted) {
    return crypto.decrypt(encrypted, APP_KEY)
}

export const decryptJson = function (encrypted) {
    return crypto.decryptJson(encrypted, APP_KEY)
}