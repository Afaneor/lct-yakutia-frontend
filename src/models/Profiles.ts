import {
  BaseModel,
  BaseModelProps,
  UsersModelProps,
} from 'src/models'
import { PermissionRulesProps } from 'src/services/base/types'

export interface ProfilesModelProps extends BaseModelProps {
  additionalInformation: string
  user: UsersModelProps
  avatar: string
  phone: string
  role: string
  notification_settings: {
    [key: string]: string | boolean
  }
  permission_rules: PermissionRulesProps
  entityFlags: Record<string, boolean>
  firstName: string
  lastName: string
}

export class ProfilesModel extends BaseModel {
  static modelName = 'profiles'
  static url() {
    return '/user/profiles'
  }
}
