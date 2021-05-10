/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

import {AccountService} from './home/account'
import {AuthService} from './home/auth'
import {DeviceService} from './home/device'
import {PrerequisiteService} from './home/prerequisite'
// TODO: Import

// TODO

export const homePrerequisiteService = () => new PrerequisiteService()
export const homeDeviceService = () => new DeviceService()
export const homeAuthService = () => new AuthService()
export const homeAccountService = () => new AccountService()
// TODO: Export

// TODO