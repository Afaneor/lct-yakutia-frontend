import { BaseModel, BaseModelProps } from 'src/models'

export interface UploadedFileProps extends File {
  lastModified: number
  lastModifiedDate: any
  name: string
  size: number
  type: string
  webkitRelativePath: string
  id: number
}

export interface FileModelProps extends BaseModelProps {
  name: string
}
export class FilesModel extends BaseModel {
  static modelName = 'files'

  static url() {
    return '/g-mtg/files'
  }
}
