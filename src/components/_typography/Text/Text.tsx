import React from 'react'
import { Typography } from 'antd'
import { FCC } from 'src/types'
import { TextProps } from 'antd/es/typography/Text'

const { Text: AntText } = Typography

export const Text: FCC<TextProps> = (props) => {
  const { children } = props
  return (
    <AntText {...props} data-testid='test-Text'>
      {children}
    </AntText>
  )
}

Text.displayName = 'Text'

export default Text
