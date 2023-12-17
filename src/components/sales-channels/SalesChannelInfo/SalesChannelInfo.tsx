import React from 'react'
import { FCC } from 'src/types'
import { Button, Form, Modal } from 'antd'
import { useTranslation } from 'src/hooks'

interface SalesChannelInfoProps {
  title?: string
  isLoading?: boolean
  isOpen: boolean
  onOk: () => void
  onCancel: () => void
}
export const SalesChannelInfo: FCC<SalesChannelInfoProps> = ({
  children,
  isOpen,
  title,
  isLoading,
  onOk,
  onCancel,
}) => {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  return (
    <Modal
      confirmLoading={isLoading}
      open={isOpen}
      title={title}
      onOk={onOk}
      width={800}
      onCancel={onCancel}
      footer={[
        <Button type={'primary'} key='ok' onClick={onOk}>
          {t('Ок')}
        </Button>,
      ]}
    >
      <Form form={form} layout='vertical'>
        {children}
      </Form>
    </Modal>
  )
}

SalesChannelInfo.displayName = 'SalesChannelInfo'

export default SalesChannelInfo
