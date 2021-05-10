/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

import {intervalCaller, timeoutCaller, ui} from '../../utils'
import {AuthMiddleware} from './modules/auth-middleware'
import {CommonMiddleware} from '@linhntaim/vue-uses'
import {DeviceMiddleware} from './modules/device-middleware'
import {LastAccessMiddleware} from './modules/last-access-middleware'
import {LocaleMiddleware} from './modules/locale-middleware'
import {PermissionMiddleware} from './modules/permission-middleware'
import {ScreenMiddleware} from './modules/screen-middleware'
import {ServerMiddleware} from './modules/server-middleware'
import {SettingsMiddleware} from './modules/settings-middleware'

const authMiddleware = new AuthMiddleware()
const commonMiddleware = new CommonMiddleware(
    () => {
        timeoutCaller.clear()
        intervalCaller.clear()
    },
    () => {
        ui.scrollToTop()
    },
)
const deviceMiddleware = new DeviceMiddleware()
const localeMiddleware = new LocaleMiddleware()
const lastAccessMiddleware = new LastAccessMiddleware()
const permissionMiddleware = new PermissionMiddleware()
const screenMiddleware = new ScreenMiddleware()
const serverMiddleware = new ServerMiddleware()
const settingsMiddleware = new SettingsMiddleware()

export const all = {
    before: [
        settingsMiddleware,
        serverMiddleware,
        deviceMiddleware,
        screenMiddleware,
        commonMiddleware,
        authMiddleware,
        localeMiddleware,
        permissionMiddleware,
        lastAccessMiddleware,
    ],
    after: [
        commonMiddleware,
    ],
}

export const error = {
    before: [
        settingsMiddleware,
        serverMiddleware,
        deviceMiddleware,
        screenMiddleware,
        commonMiddleware,
        authMiddleware,
        localeMiddleware,
    ],
    after: [
        commonMiddleware,
    ],
}
