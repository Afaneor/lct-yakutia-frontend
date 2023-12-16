import React, { useState, useRef, useEffect, Suspense } from 'react'
import ReactMarkdown from 'react-markdown'
import { DeleteOutlined } from '@ant-design/icons'
import { useTranslation } from 'src/hooks'
import { Spin } from 'antd'
const MDEditor = React.lazy(() => import('@uiw/react-md-editor'))
interface EditableMarkdownProps {
  text: string
  onSave: (text: string) => void
}
const EditableMarkdown: React.FC<EditableMarkdownProps> = ({
  text,
  onSave,
}) => {
  const { tF } = useTranslation()
  const defText = text ? text : tF('Нажмите, чтобы добавить текст')
  const [isEditing, setEditing] = useState(false)
  const [content, setContent] = useState<string>(text)
  const [markdown, setMarkdown] = useState<string>(defText)
  const [isHovered, setHovered] = useState(false)

  const markdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMarkdown(defText)
  }, [defText])
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        markdownRef.current &&
        !markdownRef.current.contains(event.target as Node)
      ) {
        setEditing(false)
        setHovered(false)
        setMarkdown(content)
        onSave(content)
      }
    }

    if (isEditing) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isEditing, content, onSave])

  const handleEdit = () => {
    setEditing(true)
  }

  const handleChange = (value?: string) => {
    setContent(value || '')
  }
  return (
    <div
      ref={markdownRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {isEditing ? (
        <Suspense fallback={<Spin spinning />}>
          <MDEditor
            data-color-mode={'light'}
            value={content}
            onChange={handleChange}
          />
        </Suspense>
      ) : (
        <div
          style={{
            boxShadow: isHovered ? '0 0 0 1px #d9d9d9' : 'none',
            cursor: 'pointer',
            borderRadius: '6px',
          }}
          onClick={handleEdit}
        >
          <Suspense fallback={<Spin spinning />}>
            <ReactMarkdown>{markdown}</ReactMarkdown>
          </Suspense>
        </div>
      )}
    </div>
  )
}

export default EditableMarkdown
