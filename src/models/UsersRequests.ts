import {
  BaseModel,
  BaseModelProps,
  LLM_MODEL,
  ProjectSalesChannelFields,
  UsersModelProps,
} from 'src/models'

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
    return `${LLM_MODEL}/requests-data/`
  }
}
