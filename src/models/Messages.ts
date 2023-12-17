import { BaseModel, BaseModelProps, LLM_MODEL } from 'src/models'

export interface MessagesFields extends BaseModelProps {
  text: string
}

export class MessagesModel extends BaseModel {
  static modelName = 'messages'

  static url() {
    return `${LLM_MODEL}/messages/`
  }
}
