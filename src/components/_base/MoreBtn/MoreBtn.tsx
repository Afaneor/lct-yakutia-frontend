import React from 'react'
import { FCC } from 'src/types'
import styles from './MoreBtn.module.scss'
import { Button } from 'antd'
import { useTranslation } from 'src/hooks'

interface MoreBtnProps {
  isLoading?: boolean
  onMore: () => void
}
export const MoreBtn: FCC<MoreBtnProps> = ({ isLoading, onMore }) => {
  const { t } = useTranslation()
  return (
    <Button
      className={styles.container}
      type={'primary'}
      loading={isLoading}
      onClick={() => onMore()}
    >
      {t('Показать еще')}
    </Button>
  )
}

MoreBtn.displayName = 'MoreBtn'

export default MoreBtn
