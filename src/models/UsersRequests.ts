import {
  BaseModel,
  BaseModelProps,
  ProfilesModelProps,
  ProjectSalesChannelFields,
  ProjectSalesChannelModel,
  USERS_REQUESTS_URL,
  UsersModelProps,
} from 'src/models'
import { PermissionRulesProps } from 'src/services/base/types'

export interface UsersRequestsModelProps extends BaseModelProps {
  project_sale_channel: ProjectSalesChannelFields
  user: UsersModelProps
  client_id: string
  source_client_info: string
  client_data: Record<string, any>
  client_data_decoding: Record<string, any>
  status: string
  success_type: string
  messages: any[]
  actual_message: string
  permission_rules: Record<string, any>
}

export class UsersRequestsModel extends BaseModel {
  static modelName = 'users_requests'

  static url() {
    return `${USERS_REQUESTS_URL}/users-requests/`
  }
}
