import { BaseModel, BaseModelProps, G_GMP_APP_URL } from 'src/models/Base'
import { SalesChannelFields } from 'src/models/SalesChannel'

export interface ProjectSalesChannelFields extends BaseModelProps {
  sale_channel: SalesChannelFields
  prompt: string
}

export class ProjectSalesChannelModel extends BaseModel {
  static modelName = 'project_sales_channels'

  static url() {
    return `${G_GMP_APP_URL}/projects-sales-channels/`
  }

  static multiCreateUrl() {
    return `${G_GMP_APP_URL}/projects-sales-channels/multiple-create/`
  }

  static addClientFromExcelUrl(projectSalesChannelId?: number | string) {
    return `${G_GMP_APP_URL}/projects-sales-channels/${projectSalesChannelId}/add-client-from-xlsx-file/`
  }
}
