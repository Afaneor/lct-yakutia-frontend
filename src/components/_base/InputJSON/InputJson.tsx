import React, { useState } from 'react'
import { FC } from 'react'
import { Input, Form } from 'antd'
import { useTranslation } from 'src/hooks'

interface JsonInputProps {
  label?: string
  name?: string
  initialValue?: string
  onChange?: (value: string) => void
}

export const InputJson: FC<JsonInputProps> = ({
  label,
  name,
  initialValue,
  onChange,
}) => {
  const { t } = useTranslation()
  const [value, setValue] = useState<string>(initialValue || '')

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = e.target.value
    setValue(inputValue)
    if (onChange) {
      onChange(inputValue)
    }
  }

  return (
    <Form.Item label={label} name={name}>
      <Input.TextArea
        value={value}
        onChange={handleInputChange}
        placeholder={t('Введите JSON-объект')}
        autoSize={{ minRows: 3, maxRows: 6 }}
      />
    </Form.Item>
  )
}

export default InputJson
