import {intervalCaller, timeoutCaller, ui} from '../../utils'
import {CommonMiddleware} from '@dsquare-gbu/vue-uses'
import AuthMiddleware from './modules/auth-middleware'
import LocaleMiddleware from './modules/locale-middleware'
import PermissionMiddleware from './modules/permission-middleware'
import ServerMiddleware from './modules/server-middleware'
import StopMiddleware from './modules/stop-middleware'

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
const localeMiddleware = new LocaleMiddleware()
const serverMiddleware = new ServerMiddleware()
const permissionMiddleware = new PermissionMiddleware()
const stopMiddleware = new StopMiddleware()

export const all = {
    before: [
        serverMiddleware,
        commonMiddleware,
        authMiddleware,
        localeMiddleware,
        permissionMiddleware,
    ],
    after: [
        commonMiddleware,
    ],
}

export const error = {
    before: [
        serverMiddleware,
        commonMiddleware,
        authMiddleware,
        localeMiddleware,
        stopMiddleware,
    ],
    after: [
        commonMiddleware,
    ],
}
