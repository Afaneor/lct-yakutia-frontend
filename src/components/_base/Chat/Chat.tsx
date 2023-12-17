import React, { useState } from 'react'
import styles from './Chat.module.scss'
import { Input, Button, Row, Card, Select, Space, Form } from 'antd'
import { SendOutlined } from '@ant-design/icons'
import { FCC } from 'src/types'
import { useGetChoicesListFromChoices } from 'src/hooks/useGetDisplayName'
import { MessageFields, MessagesModel } from 'src/models/Messages'
import { useTranslation } from 'src/hooks'

interface ChatProps {
  isLoading?: boolean
  messages: MessageFields[]
  onChangeMessageStatus?: (messageId: number | string, status: string) => void
}

const messagesModel = MessagesModel
export const Chat: FCC<ChatProps> = ({
  messages,
  onChangeMessageStatus,
  isLoading,
}) => {
  const getChoicesListFromChoices = useGetChoicesListFromChoices()
  const { tF } = useTranslation()
  const [inputValue, setInputValue] = useState<string>('')

  const addMessage = (text: string, isUser: boolean) => {
    // Логика обработки сообщения
    setInputValue('')
  }

  const handleEnterPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (inputValue.trim() !== '') {
        addMessage(inputValue, true)
      }
    }
  }

  React.useEffect(() => {
    // Логика обработки новых сообщений
  }, [messages])

  const statusOptions = getChoicesListFromChoices(
    messagesModel.modelName,
    'status'
  )?.map((option: Record<string, any>) => ({
    ...option,
    label: option.display_name,
  }))

  return (
    <div className={styles.container}>
      <div style={{ overflowY: 'auto', padding: '16px' }}>
        {messages?.map((message) => (
          <Row
            key={message.id}
            justify={message.message_type === 'system' ? 'start' : 'end'}
            style={{ paddingBottom: '16px' }}
          >
            <Card
              style={{
                backgroundColor:
                  message.message_type !== 'system'
                    ? 'rgba(22,119,255,0.49)'
                    : '',
                maxWidth: '60%',
              }}
              actions={
                message.message_type === 'system'
                  ? [
                      <Space
                        key='status'
                        direction={'vertical'}
                        style={{
                          display: 'flex',
                          justifyContent: 'flex-end',
                          padding: '0 16px',
                        }}
                      >
                        <Form initialValues={{ status: message.status }}>
                          <Form.Item label={tF('Статус')} name='status'>
                            <Select
                              loading={isLoading}
                              options={statusOptions}
                              onChange={(value) => {
                                onChangeMessageStatus?.(message.id, value)
                              }}
                            />
                          </Form.Item>
                        </Form>
                      </Space>,
                    ]
                  : []
              }
            >
              <Space direction='vertical'>{message.text}</Space>
            </Card>
          </Row>
        ))}
      </div>
      {/*// TODO: Переделать на форму, добавить логику*/}
      {/*<div style={{ display: 'flex', alignItems: 'flex-end', padding: '16px' }}>*/}
      {/*  <Input.TextArea*/}
      {/*    style={{ flex: 1, marginRight: '8px' }}*/}
      {/*    value={inputValue}*/}
      {/*    onChange={(e) => setInputValue(e.target.value)}*/}
      {/*    onPressEnter={handleEnterPress}*/}
      {/*    placeholder='Введите ваш вопрос и нажмите Enter'*/}
      {/*  />*/}
      {/*  <Button*/}
      {/*    disabled={inputValue.trim() === ''}*/}
      {/*    type='primary'*/}
      {/*    icon={<SendOutlined />}*/}
      {/*    onClick={() => addMessage(inputValue, true)}*/}
      {/*  />*/}
      {/*</div>*/}
    </div>
  )
}

export default Chat
