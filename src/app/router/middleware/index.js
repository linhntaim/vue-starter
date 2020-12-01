/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

import {intervalCaller, timeoutCaller, ui} from '../../utils'
import {CommonMiddleware} from '@dsquare-gbu/vue-uses'
import AuthMiddleware from './modules/auth-middleware'
import DeviceMiddleware from './modules/device-middleware'
import LastAccessMiddleware from '@/app/router/middleware/modules/last-access-middleware'
import LocaleMiddleware from './modules/locale-middleware'
import PermissionMiddleware from './modules/permission-middleware'
import ScreenMiddleware from './modules/screen-middleware'
import ServerMiddleware from './modules/server-middleware'
import SettingsMiddleware from './modules/settings-middleware'

const settingsMiddleware = new SettingsMiddleware()
const authMiddleware = new AuthMiddleware()
const deviceMiddleware = new DeviceMiddleware()
const commonMiddleware = new CommonMiddleware(
    () => {
        timeoutCaller.clear()
        intervalCaller.clear()
    },
    () => {
        ui.scrollToTop()
    },
)
const localeMiddleware = new LocaleMiddleware()
const lastAccessMiddleware = new LastAccessMiddleware()
const serverMiddleware = new ServerMiddleware()
const permissionMiddleware = new PermissionMiddleware()
const screenMiddleware = new ScreenMiddleware()

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
