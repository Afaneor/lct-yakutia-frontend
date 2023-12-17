import React from 'react'
import { FCC } from 'src/types'
import {
  PageWrapper,
  PaginatedTable,
  PromptModalBtn,
  LoadDataModal,
} from 'src/components'
import { useTranslation } from 'src/hooks'
import { UsersPageActions } from 'src/components/users/UsersPageActions'
import { Columns } from 'src/pages/usersRequests/Columns'
import { useNavigate, useParams } from 'react-router-dom'
import { usePaginatedFetchData } from 'src/services/base/usePaginatedFetchData'
import { ProjectSalesChannelModel, UsersRequestsModel } from 'src/models'
import { Space } from 'antd'
import { useEntityPage } from 'src/pages/hooks/useEntityPage'

const usersRequestsModel = UsersRequestsModel
const model = ProjectSalesChannelModel

export const RequestsPage: FCC = () => {
  const [title] = React.useState('Запросы формирования предложения')
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = React.useState(false)
  const { t } = useTranslation()
  const columns = Columns(usersRequestsModel)
  const { projectSalesChannelId } = useParams<{
    id: string
    projectSalesChannelId: string
  }>()

  const handleIsOpen = () => {
    setIsOpen(true)
  }

  const {
    data,
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
    refetch,
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
  const handleIsClose = () => {
    setIsOpen(false)
    refetch()
  }
  return (
    <PageWrapper
      title={title}
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
        { title },
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
        // @ts-ignore
        columns={columns}
        isLoading={isLoadingTableData || isFetching}
        onTableChange={handlePaginationChange}
        onRowClick={({ record }) => {
          navigate(`${record.id}`)
        }}
      />
    </PageWrapper>
  )
}

RequestsPage.displayName = 'RequestsPage'

export default RequestsPage
