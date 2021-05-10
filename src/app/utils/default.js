/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

import {
    AppOptions,
    BearerTokenCookieStore,
    CallbackWaiter,
    ConsoleLog,
    Crypto,
    DateTimer,
    DeviceCookieStore,
    FileHelper,
    IntervalCaller,
    IP,
    JsCookieStoreHandler,
    LocalStoreHandler,
    NumberFormatter,
    Permit,
    ServerClock,
    SettingsCookieStore,
    TimeoutCaller,
} from '@linhntaim/vue-utils'
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
import {BootstrapUi} from './bootstrap-ui'

export const log = new ConsoleLog(APP_DEBUG, APP_LOG_ONLY)
export const crypto = new Crypto(APP_KEY)
export const storeHandler = new LocalStoreHandler(crypto, ['items_per_page'])
export const cookieStoreHandler = new JsCookieStoreHandler(APP_COOKIE.defaultSettings, crypto)
export const bearerTokenCookieStore = new BearerTokenCookieStore(cookieStoreHandler, APP_COOKIE.names.default, {
    accessToken: null,
    tokenType: null,
    refreshToken: null,
    expiresIn: 0,
})
export const settingsCookieStore = new SettingsCookieStore(cookieStoreHandler, APP_COOKIE.names.settings, DEFAULT_SETTINGS)
export const deviceCookieStore = new DeviceCookieStore(cookieStoreHandler, APP_COOKIE.names.device, DEFAULT_DEVICE)
export const ui = new BootstrapUi()
export const callbackWaiter = new CallbackWaiter()
export const timeoutCaller = new TimeoutCaller()
export const intervalCaller = new IntervalCaller()
export const serverClock = new ServerClock(CLOCK_BLOCK_KEYS, CLOCK_BLOCK_RANGE)
export const ip = new IP()

export const numberFormatter = new NumberFormatter(DEFAULT_SETTINGS)
export const dateTimer = new DateTimer(DEFAULT_SETTINGS)

export const fileHelper = new FileHelper(numberFormatter)

export const permit = new Permit()

export const appOptions = new AppOptions()