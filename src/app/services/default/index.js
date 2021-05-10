/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

import {AccountService} from './common/account'
import {AuthService} from './common/auth'
import {DeviceService} from './common/device'
import {PrerequisiteService} from './common/prerequisite'
// TODO: Import

// TODO

export const commonPrerequisiteService = () => new PrerequisiteService()
export const commonDeviceService = () => new DeviceService()
export const commonAuthService = () => new AuthService()
export const commonAccountService = () => new AccountService()
// TODO: Export

// TODO