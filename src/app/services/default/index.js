/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

import {PrerequisiteService} from '@/app/services/default/common/prerequisite'
import {DeviceService} from '@/app/services/default/common/device'
import {AuthService} from '@/app/services/default/common/auth'
import {AccountService} from '@/app/services/default/common/account'
// TODO: Import

// TODO

export const commonPrerequisiteService = () => new PrerequisiteService()
export const commonDeviceService = () => new DeviceService()
export const commonAuthService = () => new AuthService()
export const commonAccountService = () => new AccountService()
// TODO: Export

// TODO