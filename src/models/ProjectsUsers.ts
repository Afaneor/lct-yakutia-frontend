import { BaseModel, BaseModelProps, G_GMP_APP_URL } from 'src/models/Base'
import { SalesChannelFields } from 'src/models/SalesChannel'

export interface ProjectUsersFields extends BaseModelProps {
  id: number
  name: string
  description: string
  product: any
  prompt: string
  sales_channels?: SalesChannelFields[]
}

export class ProjectUsersModel extends BaseModel {
  static modelName = 'projects_users'

  static url() {
    return `${G_GMP_APP_URL}/projects-users/`
  }
}
