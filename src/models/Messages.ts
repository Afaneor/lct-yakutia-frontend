import {
  BaseModel,
  BaseModelProps,
  LLM_MODEL,
  UsersModelProps,
  UsersRequestsFields,
} from 'src/models'

export interface MessageFields extends BaseModelProps {
  text: string
  message_type: string
  status: string
  request_data: UsersRequestsFields
  parent: MessageFields
  user: UsersModelProps
}

export class MessagesModel extends BaseModel {
  static modelName = 'messages'

  static url() {
    return `${LLM_MODEL}/messages/`
  }
}
