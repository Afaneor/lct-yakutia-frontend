import React, { Suspense } from 'react'
import { Button, Modal, Form, Input, Spin } from 'antd'
import type { FormInstance } from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'
import { useTranslation } from 'src/hooks'
import { ProjectFields } from 'src/models'
import { SelectSearchable } from 'src/components'
import { ProductsModel } from 'src/models/Products'
const MDEditor = React.lazy(() => import('@uiw/react-md-editor'))

interface ProjectFormProps {
  form: FormInstance
  isLoading?: boolean
  visible: boolean
  onCreate: (values: ProjectFields) => void
  onCancel: () => void
}

const ProjectForm: React.FC<ProjectFormProps> = ({
  visible,
  form,
  isLoading,
  onCreate,
  onCancel,
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
      title={t('Создать проект')}
      okText={t('Создать')}
      cancelText='Отмена'
      onCancel={handleCancel}
      onOk={handleOk}
    >
      <Form form={form} layout='vertical'>
        <Form.Item
          name='name'
          label={t('Название проекта')}
          rules={[{ required: true, message: 'Введите название проекта' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={'product'}
          label={t('Выберите продукт')}
          rules={[{ required: true, message: 'Выберите продукт' }]}
        >
          <SelectSearchable model={ProductsModel} />
        </Form.Item>
        <Suspense fallback={<Spin spinning />}>
          <Form.Item
            name='description'
            label={t('Описание')}
            rules={[{ required: true, message: 'Введите описание проекта' }]}
          >
            <MDEditor data-color-mode={'light'} />
          </Form.Item>
        </Suspense>
        <Suspense fallback={<Spin spinning />}>
          <Form.Item
            name={'prompt'}
            label={t('Дополнительные данные для формирования запроса в LLM')}
          >
            <MDEditor data-color-mode={'light'} />
          </Form.Item>
        </Suspense>
      </Form>
    </Modal>
  )
}

interface ProjectCreationProps {
  form: FormInstance
  isLoading?: boolean
  isVisible: boolean
  showModal: (isShow: boolean) => void
  onCreate: (values: ProjectFields) => void
}

const ProjectCreation: React.FC<ProjectCreationProps> = ({
  onCreate,
  isLoading,
  showModal,
  isVisible,
  form,
}) => {
  const { t } = useTranslation()

  return (
    <div>
      <Button
        type='primary'
        icon={<PlusCircleOutlined />}
        onClick={() => showModal(true)}
      >
        {t('Создать проект')}
      </Button>
      <ProjectForm
        form={form}
        isLoading={isLoading}
        visible={isVisible}
        onCreate={onCreate}
        onCancel={() => showModal(false)}
      />
    </div>
  )
}

export default ProjectCreation
