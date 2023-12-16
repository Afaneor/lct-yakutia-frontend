import React from 'react'
import styles from './style.module.scss'
import { FCC } from 'src/types'
import { LayoutContainer } from 'src/containers'
import { Space, Typography } from 'antd'
import { useTranslation } from 'src/hooks'
const { Title } = Typography

interface NoInternetComponentProps {
  links: any[]
}
export const NoInternetComponent: FCC<NoInternetComponentProps> = ({
  links,
}) => {
  const { t } = useTranslation()
  return (
    <LayoutContainer links={links}>
      <Space direction={'vertical'} className={styles.container}>
        <div className={styles.containerIcon}>
          <span>No internet</span>
        </div>
        <div className={styles.containerText}>
          <Title level={4} type={'secondary'}>
            {t('Ошибка при подключении к интернету')}
          </Title>
        </div>
      </Space>
    </LayoutContainer>
  )
}

NoInternetComponent.displayName = 'NoInternetComponent'

export default NoInternetComponent
