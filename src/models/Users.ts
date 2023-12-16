import { BaseModel, BaseModelProps, ProfilesModelProps } from 'src/models'
import { PermissionRulesProps } from 'src/services/base/types'

export enum Roles {
  READ_ONLY_USER = 'read_only_user',
  COMPANY_ADMIN = 'company_admin',
  PLATFORM_ADMIN = 'platform_admin',
}

export interface UserRole {
  [key: number]: Roles
}
export interface UsersModelProps extends BaseModelProps {
  profileId?: number
  username: string
  avatar: string
  email: string
  first_name: string
  last_name: string
  firstName: string
  secondName: string
  lastName: string
  is_active: boolean
  permissionRules: PermissionRulesProps
  profile: ProfilesModelProps
  role: UserRole
  lastLogin: string
  twoFactor: boolean
}

export class UsersModel extends BaseModel {
  static modelName = 'users'

  static url() {
    return '/user/users'
  }

  static changePasswordUrl() {
    return `${this.url()}/change-password/`
  }
}
