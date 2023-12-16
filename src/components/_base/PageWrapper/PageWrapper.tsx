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
import { NavLink } from 'react-router-dom'

const { Content } = Layout
const { Title, Text } = Typography

export interface BreadCrumbItemProps {
  href?: string
  title: React.ReactNode
}
interface PageWrapperProps {
  noEmptyData?: boolean
  title?: string
  description?: string
  actions?: React.ReactNode
  itemsCount?: number
  breadcrumbs?: BreadCrumbItemProps[]
}

export const PageWrapper: FCC<PageWrapperProps> = ({
  actions,
  noEmptyData,
  title,
  children,
  description,
  breadcrumbs = [],
  itemsCount,
}) => {
  const prepareBreadcrumbs = breadcrumbs.map((item) => {
    return {
      ...item,
      title: <NavLink to={item?.href || ''}>{item.title}</NavLink>,
    }
  })
  const breadcrumbItems = [
    {
      href: '',
      title: (
        <NavLink to={'/'}>
          <HomeOutlined />
        </NavLink>
      ),
    },
    ...prepareBreadcrumbs,
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
        {!noEmptyData && itemsCount === 0 ? <EmptyData /> : null}
        {children}
      </Content>
    </Layout>
  )
}

PageWrapper.displayName = 'PageWrapper'

export default PageWrapper
