import React from 'react'
import { FCC } from 'src/types'
import { Button } from 'antd'
import { useTranslation } from 'src/hooks'

interface MoreBtnProps {
  isLoading?: boolean
  onMore: () => void
}
export const MoreBtn: FCC<MoreBtnProps> = ({ isLoading, onMore }) => {
  const { t } = useTranslation()
  return (
    <Button type={'primary'} loading={isLoading} onClick={() => onMore()}>
      {t('Показать еще')}
    </Button>
  )
}

MoreBtn.displayName = 'MoreBtn'

export default MoreBtn
