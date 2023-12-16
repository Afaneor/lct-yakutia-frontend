import { BaseModel, BaseModelProps, G_GMP_APP_URL } from 'src/models/Base'

export interface SalesChannelFields extends BaseModelProps {
  name: string
  key_name: string
  description: string
}

export class SalesChannelModel extends BaseModel {
  static modelName = 'sales_channels'

  static url() {
    return `${G_GMP_APP_URL}/sales-channels/`
  }
}
