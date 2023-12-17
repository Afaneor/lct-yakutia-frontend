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
import { message, Space } from 'antd'
import { useEntityPage } from 'src/pages/hooks/useEntityPage'
import { useExtraActionsPost, useUpdateItem } from 'src/services/base/hooks'
import { MessagesModel } from 'src/models/Messages'

const usersRequestsModel = UsersRequestsModel
const model = ProjectSalesChannelModel

export const RequestsPage: FCC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [title] = React.useState('Запросы для формирования предложения')
  const [isOpen, setIsOpen] = React.useState(false)
  const [selectedRowKeys, setSelectedRowKeys] = React.useState<React.Key[]>([])

  const { projectSalesChannelId } = useParams<{
    id: string
    projectSalesChannelId: string
  }>()

  const { mutate: userRequestUpdate } = useUpdateItem(
    usersRequestsModel,
    'usersRequestsUpdate'
  )

  const handleUserRequestUpdate = (
    recordId: string | number,
    dataIndex: string,
    val: unknown
  ) => {
    userRequestUpdate(
      {
        id: recordId,
        fields: {
          [dataIndex]: val,
        },
      },
      {
        onSuccess: () => {
          message.success('Запрос успешно обновлен')
          refetch()
        },
        onError: (err) => {
          message.error('Не удалось обновить запрос')
          console.log(err)
        },
      }
    )
  }

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys((prevState) => {
      return [...prevState, ...newSelectedRowKeys]
    })
  }

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

  const { mutate: createOffers } = useExtraActionsPost('createOffers')
  const handleCreateOffers = () => {
    createOffers(
      {
        url: MessagesModel.multipleCreationUrl(),
        record: {
          ids: selectedRowKeys,
          project_sale_channel: projectSalesChannelId,
        },
      },
      {
        onSuccess: () => {
          message.success(
            'Запрос на формирование предложений успешно отправлен'
          )
          setSelectedRowKeys([])
          refetch()
        },
        onError: (err) => {
          message.error(
            'Не удалось отправить запрос на формирование предложений'
          )
          console.log(err)
        },
      }
    )
  }
  const handleIsClose = () => {
    setIsOpen(false)
    refetch()
  }

  const columns = Columns(usersRequestsModel, handleUserRequestUpdate)

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
          <UsersPageActions
            isDisabled={selectedRowKeys.length === 0}
            onUpload={handleIsOpen}
            onCreate={handleCreateOffers}
          />
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
        rowSelection={{
          selectedRowKeys,
          onChange: onSelectChange,
        }}
      />
    </PageWrapper>
  )
}

RequestsPage.displayName = 'RequestsPage'

export default RequestsPage
