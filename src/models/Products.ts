import { BaseModel, BaseModelProps, G_GMP_APP_URL } from 'src/models/Base'

export interface ProductsFields extends BaseModelProps {
  id: number
  name: string
  key_name: string
  description: string
}

export class ProductsModel extends BaseModel {
  static modelName = 'products'

  static url() {
    return `${G_GMP_APP_URL}/products/`
  }
}
