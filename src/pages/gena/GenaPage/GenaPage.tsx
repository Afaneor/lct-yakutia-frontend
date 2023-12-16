import React from 'react'
import styles from './GenaPage.module.scss'
import { FCC } from 'src/types'
import { PageWrapper } from 'src/components'
import { useTranslation } from 'src/hooks'
import Chat from '../../../components/_base/Chat/Chat'
import { Card, Col, Row } from 'antd'

interface GenaPageProps {
  prop?: any
}
export const GenaPage: FCC<GenaPageProps> = ({ prop }) => {
  const { t } = useTranslation()

  return (
    <PageWrapper
      title={t('Действуй, Гена!')}
      description={t(
        'Здесь Гена поможет тебе сгенерировать персональные маркетинговые предложения для клиентов'
      )}
    >
      <Row justify={'center'}>
        <Col xs={24} xl={12}>
          <Chat />
        </Col>
      </Row>
    </PageWrapper>
  )
}

GenaPage.displayName = 'GenaPage'

export default GenaPage
