import React from 'react'
import { FCC } from 'src/types'
import { Button, Empty } from 'antd'
import { useTranslation } from 'src/hooks'

interface EmptyDataProps {
  onCreate?: () => void
}
export const EmptyData: FCC<EmptyDataProps> = ({ onCreate }) => {
  const { t } = useTranslation()
  return (
    <Empty
      imageStyle={{ height: 60 }}
      description={<span>{t('Ничего не найдено')}</span>}
    >
      {onCreate ? <Button type='primary'>Create Now</Button> : null}
    </Empty>
  )
}

EmptyData.displayName = 'EmptyData'

export default EmptyData
