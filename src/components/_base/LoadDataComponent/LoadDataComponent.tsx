import React from 'react'
import { Upload, Button, message } from 'antd'
import { UploadOutlined } from '@ant-design/icons'

interface LoadDataComponentProps {
  onDataUploaded: () => void
}

export const LoadDataComponent: React.FC<LoadDataComponentProps> = ({
  onDataUploaded,
}) => {
  const customRequest = ({ file, onSuccess }: any) => {
    const formData = new FormData()
    formData.append('csvFile', file)

    fetch('YOUR_BACKEND_API_ENDPOINT', {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          message.success(`${file.name} успешно загружен`, 5)
          onDataUploaded()
        } else {
          message.error(`${file.name} не удалось загрузить.`, 5)
        }
      })
      .catch((error) => {
        message.error(`Произошла ошибка: ${error.message}`)
      })
      .finally(() => {
        onSuccess('ok')
      })
  }

  const beforeUpload = (file: any) => {
    const isCSV = file.type === 'text/csv'
    if (!isCSV) {
      message.error('Пожалуйста, загрузите файл CSV!')
    }
    return isCSV
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

  return (
    <div
      onDrop={onDrop}
      onDragOver={onDragOver}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        border: '2px dashed #ccc',
        borderRadius: '4px',
        cursor: 'pointer',
      }}
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
  )
}

export default LoadDataComponent
