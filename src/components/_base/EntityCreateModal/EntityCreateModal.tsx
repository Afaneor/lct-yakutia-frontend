import React, { ReactNode, Suspense } from 'react'
import { Button, Modal, Form, Input, Spin } from 'antd'
import type { FormInstance } from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'
import { useTranslation } from 'src/hooks'
import { SelectSearchable } from 'src/components'
import { ProductsModel } from 'src/models/Products'
import { FCC } from 'src/types'
const MDEditor = React.lazy(() => import('@uiw/react-md-editor'))

interface EntityFormProps {
  form: FormInstance
  isLoading?: boolean
  visible: boolean
  onCreate: (values: Record<string, any>) => void
  onCancel: () => void
}

const EntityForm: FCC<EntityFormProps> = ({
  visible,
  form,
  isLoading,
  onCreate,
  onCancel,
  children,
}) => {
  const { t } = useTranslation()

  const handleOk = async () => {
    try {
      const values = await form.validateFields()
      onCreate({ ...values })
    } catch (error) {
      console.error('Validation failed:', error)
    }
  }

  const handleCancel = () => {
    onCancel()
    form.resetFields()
  }

  return (
    <Modal
      confirmLoading={isLoading}
      open={visible}
      title={t('Создать')}
      okText={t('Создать')}
      cancelText='Отмена'
      onCancel={handleCancel}
      onOk={handleOk}
    >
      <Form form={form} layout='vertical'>
        {children}
      </Form>
    </Modal>
  )
}

interface EntityCreationProps {
  formItemsRender: ReactNode
  form: FormInstance
  isLoading?: boolean
  isVisible: boolean
  showModal: (isShow: boolean) => void
  onCreate: (values: Record<string, any>) => void
}

const EntityCreation: React.FC<EntityCreationProps> = ({
  onCreate,
  isLoading,
  showModal,
  isVisible,
  form,
  formItemsRender,
}) => {
  const { t } = useTranslation()

  return (
    <div>
      <Button
        type='primary'
        icon={<PlusCircleOutlined />}
        onClick={() => showModal(true)}
      >
        {t('Создать')}
      </Button>
      <EntityForm
        form={form}
        isLoading={isLoading}
        visible={isVisible}
        onCreate={onCreate}
        onCancel={() => showModal(false)}
      >
        {formItemsRender}
      </EntityForm>
    </div>
  )
}

export default EntityCreation
