// MongoForm.tsx
import React from 'react'
import { Form, Input, Button } from 'antd'
import { FCC } from 'src/types'

interface MongoFormProps {
  onDataUploaded: () => void
}

export const MongoForm: FCC<MongoFormProps> = ({ onDataUploaded }) => {
  const onFinish = (values: any) => {
    // Обработка данных формы, например, вызов onDataUploaded
    onDataUploaded()
  }

  return (
    <Form onFinish={onFinish} layout='vertical'>
      {/* Поля для Mongo */}
      <Form.Item
        label='DB Name'
        name='dbname'
        rules={[{ required: true, message: 'DB Name is required' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label='Collection Name'
        name='collection_name'
        rules={[{ required: true, message: 'Collection Name is required' }]}
      >
        <Input />
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

export default MongoForm
