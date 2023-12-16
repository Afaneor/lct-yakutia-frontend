import { BaseModel, BaseModelProps, G_GMP_APP_URL } from 'src/models/Base'

export interface ProjectSalesChannelFields extends BaseModelProps {
  name: string
  key_name: string
  description: string
}

export class ProjectSalesChannelModel extends BaseModel {
  static modelName = 'project_sales_channels'

  static url() {
    return `${G_GMP_APP_URL}/projects-sales-channels/`
  }

  static multiCreateUrl() {
    return `${G_GMP_APP_URL}/projects-sales-channels/multiple-create/`
  }
}
