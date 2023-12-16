import React, { Suspense } from 'react'
import styles from './PersonalOfferText.module.scss'
import { FCC } from 'src/types'
import { Popover, Typography } from 'antd'

const { Text } = Typography
const MarkdownPreview = React.lazy(() => import('@uiw/react-markdown-preview'))

interface PersonalOfferTextProps {
  text?: string
  title?: string
}
const MDStyle = {
  backgroundColor: 'transparent',
  color: '#141414',
  width: 500,
}
export const PersonalOfferText: FCC<PersonalOfferTextProps> = ({
  title,
  text,
}) => {
  return (
    <Popover
      content={
        <div
          style={{
            maxWidth: 400,
          }}
        >
          {text}
        </div>
      }
      title={title}
    >
      <Text ellipsis>{text}</Text>
    </Popover>
  )
}

PersonalOfferText.displayName = 'PersonalOfferText'

export default PersonalOfferText
