import React, { useState } from 'react'
import { Input, Button, List, Avatar } from 'antd'
import { SendOutlined } from '@ant-design/icons'
import { useTranslation } from 'src/hooks'

interface Message {
  id: number
  text: string
  isUser: boolean
}

export const Chat: React.FC = () => {
  const { tF } = useTranslation()
  const chatRef = React.useRef<HTMLDivElement>(null)

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: tF('Сформируйте мне предложение со следующими характеристиками:'),
      isUser: false,
    },
  ])
  const [inputValue, setInputValue] = useState<string>('')

  const addMessage = (text: string, isUser: boolean) => {
    const newMessage: Message = {
      id: messages.length + 1,
      text,
      isUser,
    }
    setMessages([...messages, newMessage])
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
  // Автоматическая прокрутка чата при добавлении новых сообщений
  React.useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    }
  }, [messages])

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: 'calc(100vh - 240px)',
      }}
    >
      <div
        ref={chatRef}
        style={{ flex: 1, overflowY: 'auto', padding: '16px' }}
      >
        {messages.map((message) => (
          <div
            key={message.id}
            style={{
              textAlign: message.isUser ? 'right' : 'left',
              marginBottom: '8px',
            }}
          >
            <div
              style={{
                backgroundColor: message.isUser ? '#1890ff' : '#1890ff33',
                padding: '8px',
                borderRadius: '8px',
                display: 'inline-block',
                maxWidth: '50%',
              }}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-end', padding: '16px' }}>
        <Input.TextArea
          style={{ flex: 1, marginRight: '8px' }}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onPressEnter={handleEnterPress}
          placeholder='Введите ваш вопрос и нажмите Enter'
        />
        <Button
          disabled={inputValue.trim() === ''}
          type='primary'
          icon={<SendOutlined />}
          onClick={() => addMessage(inputValue, true)}
        />
      </div>
    </div>
  )
}

export default Chat
