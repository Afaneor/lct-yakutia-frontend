import React from 'react'
import styles from './PromptModalBtn.module.scss'
import { FCC } from 'src/types'
import { FileTextOutlined } from '@ant-design/icons'
import { Button, Modal } from 'antd'
import EditableMarkdown from 'src/components/_base/EditableMarkdown/EditableMarkdown'
import { useTranslation } from 'src/hooks'

interface PromptModalBtnProps {
  isLoading?: boolean
  prompt: string
  onUpdate: (value: string) => void
}
export const PromptModalBtn: FCC<PromptModalBtnProps> = ({
  prompt,
  isLoading,
  onUpdate,
}) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const { t } = useTranslation()
  const handleIsOpen = () => {
    setIsOpen(true)
  }
  const handleIsClose = () => {
    setIsOpen(false)
  }
  return (
    <>
      <Button
        type={'dashed'}
        icon={<FileTextOutlined />}
        onClick={handleIsOpen}
      >
        {t('Данные для формирования запроса')}
      </Button>
      <Modal
        title={t('Дополнительные данные для формирования запроса в LLM')}
        open={isOpen}
        onCancel={handleIsClose}
        confirmLoading={isLoading}
        footer={false}
        width={800}
        destroyOnClose={true}
      >
        <EditableMarkdown text={prompt} onSave={onUpdate} />
      </Modal>
    </>
  )
}

PromptModalBtn.displayName = 'PromptModalBtn'

export default PromptModalBtn
