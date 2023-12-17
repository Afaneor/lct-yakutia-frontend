import React from 'react'
import styles from './SalesChannelsPage.module.scss'
import { FCC } from 'src/types'
import { ProductsRoutesNames } from 'src/routes/productsRoutes'
import { SalesChannelFields, SalesChannelModel } from 'src/models'
import { Card, Col, List, Typography } from 'antd'
import { EntityItemsPageWrapperPage } from 'src/components'
import { useTranslation } from 'src/hooks'
import { SalesChannelsRoutesNames } from 'src/routes/salesChannelsRoutes'
const { Title, Paragraph } = Typography
interface SalesChannelsPageProps {
  prop?: any
}

const MODEL = SalesChannelModel
export const SalesChannelsPage: FCC<SalesChannelsPageProps> = ({ prop }) => {
  const [PageTitle] = React.useState('Каналы связи')
  const { t } = useTranslation()
  return (
    <EntityItemsPageWrapperPage
      pageTitle={PageTitle}
      model={MODEL}
      breadcrumbs={[
        {
          href: `/${SalesChannelsRoutesNames.SALES_CHANNELS}`,
          title: PageTitle,
        },
      ]}
      itemsRender={(item: SalesChannelFields) => (
        <Col key={item?.id} xs={24} md={12} xl={8}>
          <Card
            hoverable
            title={item?.name}
            style={{
              height: '100%',
            }}
          >
            <Paragraph
              ellipsis={{ rows: 3, expandable: true, symbol: t('далее') }}
            >
              {item?.description}
            </Paragraph>
          </Card>
        </Col>
      )}
    />
  )
}

SalesChannelsPage.displayName = 'SalesChannelsPage'

export default SalesChannelsPage
