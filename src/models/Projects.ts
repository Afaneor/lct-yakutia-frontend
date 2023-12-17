import { BaseModel, BaseModelProps, G_GMP_APP_URL } from 'src/models/Base'
import { SalesChannelFields } from 'src/models/SalesChannel'
import { ProjectSalesChannelFields } from 'src/models/ProjectSalesChannel'

export interface ProjectFields extends BaseModelProps {
  id: number
  name: string
  description: string
  product: any
  prompt: string
  sales_channels?: SalesChannelFields[]
  projects_sales_channels?: ProjectSalesChannelFields[]
}

export class ProjectsModel extends BaseModel {
  static modelName = 'projects'

  static url() {
    return `${G_GMP_APP_URL}/projects/`
  }

  static addSalesChannelsUrl(id: number) {
    return `${this.url()}${id}/add-sales-channels/`
  }
}
