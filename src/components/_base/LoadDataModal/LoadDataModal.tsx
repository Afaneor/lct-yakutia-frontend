import React, { useState } from 'react'
import styles from './LoadDataModal.module.scss'
import { FCC } from 'src/types'
import { message, Modal, Tabs, Typography } from 'antd'
import {
  CsvForm,
  LoadDataComponent,
  MongoForm,
  PostgresForm,
} from 'src/components'
import { useFileAsFormData, useTranslation } from 'src/hooks'
import TabPane from 'antd/es/tabs/TabPane'
import { data } from 'autoprefixer'
import { useCreateItem, useExtraActionsPost } from 'src/services/base/hooks'
import { ProjectSalesChannelModel } from 'src/models'
import { useParams } from 'react-router-dom'
import { AxiosResponse } from 'axios'
import apiClient from 'src/plugins/apiClient'

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

const model = ProjectSalesChannelModel
export const LoadDataModal: FCC<LoadDataModalProps> = ({
  onOk,
  isOpen,
  onClose,
}) => {
  const { projectSalesChannelId } = useParams()
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState<LoadDataModalTabs>(
    LoadDataModalTabs.FILE
  )

  const createDataFromXlsx = ({ file, client_data_decoding }: any) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('client_data_decoding', client_data_decoding)
    apiClient
      .post(
        `api/${model.addClientFromExcelUrl(projectSalesChannelId)}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      .then((response: any) => {
        if (response.status === 201) {
          message.success(`${file.name} успешно загружен`, 5)
          onClose()
        }
      })
      .catch((error: any) => {
        message.error(`Произошла ошибка при загрузке файла ${file.name}`, 5)
        console.error(error)
      })
      .finally(() => {
        // onSuccess('ok')
      })
  }
  const handleAddClientFromXLSX = (data: Record<string, any>) => {
    createDataFromXlsx({
      file: data.fileList[0],
      client_data_decoding: data.jsonValue,
    })
  }
  const handleTabChange = (key: string) => {
    setActiveTab(key as LoadDataModalTabs)
  }

  return (
    <Modal
      open={isOpen}
      onOk={onOk}
      onCancel={onClose}
      confirmLoading={false}
      footer={null}
      bodyStyle={{ height: 'calc(80vh)', overflow: 'auto' }}
      style={{ top: 10 }}
      width='50%'
      zIndex={1001} // Устанавливаем z-index выше, чем у других модальных окон (по умолчанию 1000)
      destroyOnClose={true} // Закрывать модальное окно при каждом закрытии
      maskClosable={false} // Запрещаем закрывать по клику на заднем плане
    >
      <Tabs activeKey={activeTab} onChange={handleTabChange}>
        <TabPane tab='Файл' key={LoadDataModalTabs.FILE}>
          <Title level={2}>{t('Загрузка данных из файла .xlsx')}</Title>
          <CsvForm onDataUploaded={handleAddClientFromXLSX} />
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
