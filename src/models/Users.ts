import { BaseModel, BaseModelProps, ProfilesModelProps } from 'src/models'
import { PermissionRulesProps } from 'src/services/base/types'

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
