import React, { useState } from 'react'
import styles from './LoadDataModal.module.scss'
import { FCC } from 'src/types'
import { Modal, Tabs, Typography } from 'antd'
import {
  CsvForm,
  LoadDataComponent,
  MongoForm,
  PostgresForm,
} from 'src/components'
import { useTranslation } from 'src/hooks'
import TabPane from 'antd/es/tabs/TabPane'

const { Title } = Typography

export enum LoadDataModalTabs {
  POSTGRES = 'postgres',
  MONGO = 'mongo',
  FILE = 'file',
}
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
  const [activeTab, setActiveTab] = useState<LoadDataModalTabs>(
    LoadDataModalTabs.FILE
  )

  const handleTabChange = (key: string) => {
    setActiveTab(key as LoadDataModalTabs)
  }
  return (
    <Modal
      open={isOpen}
      onOk={onOk}
      onCancel={onClose}
      confirmLoading={false}
      bodyStyle={{ height: 'calc(80vh)', overflow: 'auto' }}
      style={{ top: 10 }}
      width='50%'
      zIndex={1001} // Устанавливаем z-index выше, чем у других модальных окон (по умолчанию 1000)
      destroyOnClose={true} // Закрывать модальное окно при каждом закрытии
      maskClosable={false} // Запрещаем закрывать по клику на заднем плане
    >
      <Tabs activeKey={activeTab} onChange={handleTabChange}>
        <TabPane tab='Файл' key={LoadDataModalTabs.FILE}>
          <Title level={2}>{t('Загрузка данных из файла .csv')}</Title>
          <CsvForm
            onDataUploaded={() => {
              console.log('onDataUploaded for CSV')
            }}
          />
        </TabPane>
        <TabPane tab='Postgres' key={LoadDataModalTabs.POSTGRES}>
          <Title level={2}>{t('Загрузка данных - Postgres')}</Title>
          <PostgresForm
            onDataUploaded={() => {
              console.log('onDataUploaded for Postgres')
            }}
          />
        </TabPane>
        <TabPane tab='Mongo' key={LoadDataModalTabs.MONGO}>
          <Title level={2}>{t('Загрузка данных - Mongo')}</Title>
          <MongoForm
            onDataUploaded={() => {
              console.log('onDataUploaded for Mongo')
            }}
          />
        </TabPane>
      </Tabs>
    </Modal>
  )
}

LoadDataModal.displayName = 'LoadDataModal'

export default LoadDataModal
