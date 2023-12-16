import React from 'react'
import styles from './StatisticsPage.module.scss'
import { FCC } from 'src/types'
import { CardDetailSection, PageWrapper, PaginatedTable } from 'src/components'
import { useTranslation } from 'src/hooks'
import { UsersPageActions } from 'src/components/users/UsersPageActions'
import { Columns } from 'src/pages/usersRequests/Columns'
import LoadDataModal from '../../../components/_base/LoadDataModal/LoadDataModal'
import { useNavigate, useParams } from 'react-router-dom'
import { ProjectUsersModel } from 'src/models/ProjectsUsers'
import { usePaginatedFetchData } from 'src/services/base/usePaginatedFetchData'
import {
  ProductsModel,
  ProjectSalesChannelModel,
  UsersRequestsModel,
} from 'src/models'
import { Button, Col, Space } from 'antd'
import { FileTextOutlined } from '@ant-design/icons'
import PromptModalBtn from '../../../components/_base/PromptModalBtn/PromptModalBtn'
import { useEntityPage } from 'src/pages/hooks/useEntityPage'

interface UsersPageProps {
  prop?: any
}

const usersRequestsModel = UsersRequestsModel
const model = ProjectSalesChannelModel
// const model = ProductsModel

export const UsersPage: FCC<UsersPageProps> = ({ prop }) => {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = React.useState(false)
  const { t } = useTranslation()
  const columns = Columns()
  const { projectSalesChannelId } = useParams<{
    id: string
    projectSalesChannelId: string
  }>()

  const handleIsOpen = () => {
    setIsOpen(true)
  }
  const handleIsClose = () => {
    setIsOpen(false)
  }
  const {
    data,
    refetch,
    id,
    isLoading,
    handleUpdate,
  }: {
    id?: string
    data: any
    isLoading: boolean
    refetch: CallableFunction
    handleUpdate: CallableFunction
  } = useEntityPage(model, projectSalesChannelId)

  const {
    dataCount,
    rowData,
    fetchNextPage,
    setFilters,
    isFetching,
    isLoading: isLoadingTableData,
    page,
    pageSize,
    handlePaginationChange,
  }: any = usePaginatedFetchData({
    model: usersRequestsModel,
    defFilters: { project_sale_channel: projectSalesChannelId },
    options: {
      enabled: !!projectSalesChannelId,
    },
  })
  return (
    <PageWrapper
      title={t('Пользовательские запросы')}
      itemsCount={dataCount}
      noEmptyData
      breadcrumbs={[
        {
          title: t('Проекты'),
          href: '/projects',
        },
        {
          title: data?.data?.project?.name,
          href: `/projects/${id}`,
        },
        { title: t('Пользовательские запросы') },
      ]}
      actions={
        <Space direction={'horizontal'}>
          <PromptModalBtn
            prompt={data?.data?.prompt}
            isLoading={isLoading}
            onUpdate={(text) => handleUpdate('prompt', text)}
          />
          <UsersPageActions onUpload={handleIsOpen} />
        </Space>
      }
    >
      <LoadDataModal isOpen={isOpen} onClose={handleIsClose} />
      <PaginatedTable
        dataSource={rowData}
        pageSize={pageSize}
        page={page}
        dataCount={dataCount}
        columns={columns}
        isLoading={isLoadingTableData || isFetching}
        onTableChange={handlePaginationChange}
        onRowClick={({ record }) => {
          navigate(`${record.id.value}`)
        }}
      />
    </PageWrapper>
  )
}

UsersPage.displayName = 'UsersPage'

export default UsersPage
