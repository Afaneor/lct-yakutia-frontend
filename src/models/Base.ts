import { PermissionRulesProps } from 'src/services/base/types'

export interface BaseModelProps {
  id: string | number
  createdAt: Date
  updatedAt: Date
  permissionRules: PermissionRulesProps
  contentType: string | number
}

export const G_GMP_APP_URL = 'g-gmp'

export class BaseModel {
  static modelName = 'base'
  static url() {
    return ''
  }

  static detailUrl(id: string | number) {
    return `${this.url()}${id}/`
  }
  static stageTransitionUrl() {
    return `${this.url()}/multiple-stage-transition/`
  }

  static downloadXlsUrl() {
    return `${this.url()}/excel/`
  }

  static getStagesCounterUrl() {
    return `${this.url()}/get-stages-counter/`
  }

  static historyUrl() {
    return `${this.url()}/history/`
  }
}
