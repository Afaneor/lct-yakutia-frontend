import React, { useState } from 'react'
import styles from './LoadDataComponent.module.scss'
import { Upload, Button, message, Space, List } from 'antd'
import {
  UploadOutlined,
  DeleteOutlined,
  DownloadOutlined,
} from '@ant-design/icons'
import InputJson from '../InputJSON/InputJson'
import { useTranslation } from 'src/hooks'

interface LoadDataComponentProps {
  onDataUploaded: (data: any) => void
}

export const LoadDataComponent: React.FC<LoadDataComponentProps> = ({
  onDataUploaded,
}) => {
  const { t } = useTranslation()
  const [fileList, setFileList] = useState<any[]>([])
  const [jsonValue, setJsonValue] = useState<string>('')

  const customRequest = ({ file, onSuccess }: any) => {
    setFileList([file])
    onSuccess('ok')
  }

  const beforeUpload = (file: any) => {
    const isXLSX =
      file.type ===
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    if (!isXLSX) {
      message.error('Пожалуйста, загрузите файл XLSX!')
    }
    return isXLSX
  }

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()

    const fileList = Array.from(e.dataTransfer.files)

    if (fileList.length === 1) {
      const file = fileList[0]

      if (beforeUpload(file)) {
        customRequest({
          file,
          onSuccess: (response: any) => {
            console.log(response)
          },
        })
      }
    } else {
      message.error('Можно загрузить только один файл.')
    }
  }

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleJsonChange = (value: string) => {
    setJsonValue(value)
  }

  const handleSendButtonClick = () => {
    if (fileList.length === 0) {
      message.error('Пожалуйста, загрузите файл!')
      return
    }
    if (jsonValue === '') {
      message.error('Пожалуйста, введите JSON!')
      return
    }

    // Отправка данных на бэкенд (вызов нужного API)
    console.log('Отправка данных:', { fileList, jsonValue })
    // Сбросить состояние
    setFileList([])
    setJsonValue('')
    onDataUploaded({ fileList, jsonValue })
  }

  const handleDeleteFile = (file: any) => {
    const updatedFileList = fileList.filter((item) => item !== file)
    setFileList(updatedFileList)
  }

  return (
    <Space direction='vertical' style={{ width: '100%' }}>
      {fileList.length === 0 ? (
        <div
          onDrop={onDrop}
          onDragOver={onDragOver}
          className={styles.container}
        >
          <Upload
            customRequest={customRequest}
            beforeUpload={beforeUpload}
            showUploadList={false}
          >
            <Button icon={<UploadOutlined />}>Выберите файл</Button>
          </Upload>
          <p style={{ marginTop: '10px' }}>или перетащите его сюда</p>
        </div>
      ) : (
        <List
          header={<div>Список загруженных файлов</div>}
          bordered
          dataSource={fileList}
          renderItem={(file) => (
            <List.Item
              actions={[
                <Button
                  key={file.uid}
                  icon={<DeleteOutlined />}
                  onClick={() => handleDeleteFile(file)}
                />,
              ]}
            >
              {file.name}
            </List.Item>
          )}
        />
      )}
      <InputJson
        label={t(
          'Введите расшифровку данных о клиенте в json формате, где ключ название поля, а значение его описание на русском языке'
        )}
        initialValue={jsonValue}
        onChange={handleJsonChange}
      />
      <Button
        type='primary'
        icon={<DownloadOutlined />}
        onClick={handleSendButtonClick}
      >
        {t('Загрузить')}
      </Button>
    </Space>
  )
}

export default LoadDataComponent
