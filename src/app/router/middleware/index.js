import {intervalCaller, timeoutCaller, ui} from '../../utils'
import {CommonMiddleware} from '@dsquare-gbu/vue-uses'
import AuthMiddleware from './modules/auth-middleware'
import LocaleMiddleware from './modules/locale-middleware'
import PermissionMiddleware from './modules/permission-middleware'
import ServerMiddleware from './modules/server-middleware'

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
    ],
    after: [
        commonMiddleware,
    ],
}
