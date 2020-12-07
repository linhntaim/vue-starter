/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */
import {PrerequisiteService} from '@/app/services/default/admin/prerequisite'
import {DeviceService} from '@/app/services/default/admin/device'
import {AuthService} from '@/app/services/default/admin/auth'
import {AccountService} from '@/app/services/default/admin/account'
import {AccountNotificationService} from '@/app/services/default/admin/account-notification'
import {ActivityLogService} from '@/app/services/default/admin/activity-log'
import {AppOptionService} from '@/app/services/default/admin/app-option'
import {DataExportService} from '@/app/services/default/admin/data-export'
import {RoleService} from '@/app/services/default/admin/role'
import {PasswordService} from '@/app/services/default/admin/password'
import {CommandService} from '@/app/services/default/admin/command'
import {SystemLogService} from '@/app/services/default/admin/system-log'
import {HandledFileService} from '@/app/services/default/admin/handled-file'

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
