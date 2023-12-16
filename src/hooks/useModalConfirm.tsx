import { Modal, ModalFuncProps } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import React from 'react'
import { useTranslation } from 'src/hooks/useTranslation'

export const useModalConfirm = () => {
  const { t } = useTranslation()

  const [modal, contextHolder] = Modal.useModal()
  const modalConfirm = (props: ModalFuncProps) => {
    modal.confirm({
      title: t('Подтвердите действие'),
      icon: <ExclamationCircleOutlined />,
      content: t('Действительно?'),
      okText: t('Ок'),
      cancelText: t('Отмена'),
      centered: true,
      ...props,
    })
  }
  return { modal, contextHolder, modalConfirm }
}
