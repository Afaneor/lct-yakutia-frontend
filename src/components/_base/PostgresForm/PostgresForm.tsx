// PostgresForm.tsx
import React from 'react'
import { Form, Input, Button } from 'antd'
import { FCC } from 'src/types'

interface PostgresFormProps {
  onDataUploaded: () => void
}

export const PostgresForm: FCC<PostgresFormProps> = ({ onDataUploaded }) => {
  const onFinish = (values: any) => {
    // Обработка данных формы, например, вызов onDataUploaded
    onDataUploaded()
  }

  return (
    <Form onFinish={onFinish} layout='vertical'>
      {/* Поля для Postgres */}
      <Form.Item
        label='DB Name'
        name='db_name'
        rules={[{ required: true, message: 'DB Name is required' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label='User'
        name='user'
        rules={[{ required: true, message: 'User is required' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label='Password'
        name='password'
        rules={[{ required: true, message: 'Password is required' }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        label='Host'
        name='host'
        rules={[{ required: true, message: 'Host is required' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label='Port'
        name='port'
        rules={[{ required: true, message: 'Port is required' }]}
      >
        <Input type='number' />
      </Form.Item>
      <Form.Item
        label='DB Request'
        name='db_request'
        rules={[{ required: true, message: 'DB Request is required' }]}
      >
        <Input.TextArea />
      </Form.Item>
    </Form>
  )
}

export default PostgresForm
