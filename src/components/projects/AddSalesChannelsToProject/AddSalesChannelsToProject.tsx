import React from 'react'
import { Modal, Button, Form } from 'antd'
import { SalesChannelModel } from 'src/models'
import { SelectSearchable } from 'src/components'
import { useTranslation } from 'src/hooks'
import { PlusCircleOutlined } from '@ant-design/icons'

interface AddChannelsModalProps {
  channels: number[]
  isLoading?: boolean
  visible: boolean
  onCancel: () => void
  onShowModal: () => void
  onAdd: (selectedChannels: Record<string, number[]>) => void
}
const formName = 'addSalesChannelsToProject'
export const AddSalesChannelsToProject: React.FC<AddChannelsModalProps> = ({
  visible,
  isLoading,
  onCancel,
  onAdd,
  onShowModal,
  channels,
}) => {
  const { tF } = useTranslation()
  const [form] = Form.useForm()

  const handleAdd = (values: Record<string, number[]>) => {
    onAdd(values)
  }

  const handleCancel = () => {
    form.resetFields()
    onCancel()
  }

  return (
    <>
      <Button type='text' icon={<PlusCircleOutlined />} onClick={onShowModal} />
      <Modal
        title={tF('Добавить каналы связи в проект')}
        open={visible}
        onCancel={handleCancel}
        footer={[
          <Button key='cancel' onClick={handleCancel}>
            {tF('Отменить')}
          </Button>,
          <Button
            loading={isLoading}
            key='add'
            type='primary'
            htmlType={'submit'}
            form={formName}
          >
            {tF('Добавить')}
          </Button>,
        ]}
      >
        <Form
          form={form}
          name={formName}
          initialValues={{ sales_channels: channels }}
          layout='vertical'
          onFinish={handleAdd}
        >
          <Form.Item label={tF('Каналы связи')} name={'sales_channels'}>
            <SelectSearchable model={SalesChannelModel} mode={'multiple'} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
