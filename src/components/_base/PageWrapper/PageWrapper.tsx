import React, { Suspense } from 'react'
import styles from './PageWrapper.module.scss'
import { FCC } from 'src/types'
import {
  Badge,
  Breadcrumb,
  Col,
  Layout,
  Row,
  Space,
  Spin,
  Typography,
} from 'antd'
import { HomeOutlined, UserOutlined } from '@ant-design/icons'
import EmptyData from '../EmptyData/EmptyData'

const { Content } = Layout
const { Title, Text } = Typography

export interface BreadCrumbItemProps {
  href?: string
  title: React.ReactNode
}
interface PageWrapperProps {
  title?: string
  description?: string
  actions?: React.ReactNode
  itemsCount?: number
  breadcrumbs?: BreadCrumbItemProps[]
}

export const PageWrapper: FCC<PageWrapperProps> = ({
  actions,
  title,
  children,
  description,
  breadcrumbs = [],
  itemsCount,
}) => {
  const breadcrumbItems = [
    {
      href: '',
      title: <HomeOutlined />,
    },
    ...breadcrumbs,
  ]
  return (
    <Layout>
      <Content>
        <Breadcrumb
          style={{
            marginBottom: '12px',
          }}
          items={breadcrumbItems}
        />
        <div
          style={{
            marginBottom: '26px',
          }}
        >
          <Row gutter={[16, 16]} justify={'space-between'}>
            <Col xs={24} xl={12}>
              <Space direction={'horizontal'} size={10}>
                <Title
                  level={2}
                  style={{
                    margin: 0,
                  }}
                >
                  {title}
                </Title>
                {itemsCount ? <Badge count={itemsCount} /> : null}
              </Space>
            </Col>
            <Col>{actions}</Col>
          </Row>
          <div>
            <Text type='secondary'>{description}</Text>
          </div>
        </div>
        {itemsCount === 0 ? <EmptyData /> : null}
        {children}
      </Content>
    </Layout>
  )
}

PageWrapper.displayName = 'PageWrapper'

export default PageWrapper
