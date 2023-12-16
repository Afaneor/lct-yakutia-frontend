import React from 'react'
import styles from './LoadDataModal.module.scss'
import { FCC } from 'src/types'
import { Modal, Typography } from 'antd'
import { LoadDataComponent, PageWrapper } from 'src/components'
import { useTranslation } from 'src/hooks'

const { Title } = Typography
interface LoadDataModalProps {
  isOpen: boolean
  onClose: () => void
  onOk?: () => void
}
export const LoadDataModal: FCC<LoadDataModalProps> = ({
  onOk,
  isOpen,
  onClose,
}) => {
  const { t } = useTranslation()

  return (
    <Modal
      open={isOpen}
      onOk={onOk}
      onCancel={onClose}
      confirmLoading={false}
      bodyStyle={{ height: 'calc(80vh)', overflow: 'auto' }}
      style={{ top: 10 }}
      width='80%'
      zIndex={1001} // Устанавливаем z-index выше, чем у других модальных окон (по умолчанию 1000)
      destroyOnClose={true} // Закрывать модальное окно при каждом закрытии
      maskClosable={false} // Запрещаем закрывать по клику на заднем плане
    >
      <Title level={2}>{t('Загрузка данных')}</Title>
      <LoadDataComponent
        onDataUploaded={() => {
          console.log('onDataUploaded')
        }}
      />
    </Modal>
  )
}

LoadDataModal.displayName = 'LoadDataModal'

export default LoadDataModal
