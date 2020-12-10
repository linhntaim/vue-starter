/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

import {PrerequisiteService} from './admin/prerequisite'
import {DeviceService} from './admin/device'
import {AuthService} from './admin/auth'
import {AccountService} from './admin/account'
import {AccountNotificationService} from './admin/account-notification'
import {ActivityLogService} from './admin/activity-log'
import {AppOptionService} from './admin/app-option'
import {DataExportService} from './admin/data-export'
import {RoleService} from './admin/role'
import {PasswordService} from './admin/password'
import {CommandService} from './admin/command'
import {SystemLogService} from './admin/system-log'
import {HandledFileService} from './admin/handled-file'
// TODO: Import

// TODO

export const adminPrerequisiteService = () => new PrerequisiteService()
export const adminDeviceService = () => new DeviceService()
export const adminAuthService = () => new AuthService()
export const adminAccountService = () => new AccountService()
export const adminAccountNotificationService = () => new AccountNotificationService()
export const adminPasswordService = () => new PasswordService()
export const adminCommandService = () => new CommandService()
export const adminSystemLogService = () => new SystemLogService()
export const adminHandledFileService = () => new HandledFileService()
export const adminActivityLogService = () => new ActivityLogService()
export const adminAppOptionService = () => new AppOptionService()
export const adminDataExportService = () => new DataExportService()
export const adminRoleService = () => new RoleService()
// TODO: Export

// TODO
