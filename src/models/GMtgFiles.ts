import { BaseModel, BaseModelProps } from 'src/models'

export interface GMtgFilesModelProps extends BaseModelProps {
  gMtgFile: string
  objectId: string | number
}
export class GMtgFilesModel extends BaseModel {
  static modelName = 'gMtgFiles'
  static url() {
    return '/g-mtg-file/g-mtg-files'
  }
}
