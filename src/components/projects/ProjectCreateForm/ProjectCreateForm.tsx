import React, { Suspense } from 'react'
import { FCC } from 'src/types'
import { Form, Input, Spin } from 'antd'
import { SelectSearchable } from 'src/components'
import { ProductsModel } from 'src/models/Products'
import { useTranslation } from 'src/hooks'
const MDEditor = React.lazy(() => import('@uiw/react-md-editor'))

export const ProjectCreateForm: FCC = () => {
  const { t } = useTranslation()

  return (
    <>
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
    </>
  )
}

ProjectCreateForm.displayName = 'ProjectCreateForm'

export default ProjectCreateForm
