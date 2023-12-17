import React from 'react'
import styles from './StatisticsPage.module.scss'
import { FCC } from 'src/types'
import { PageWrapper, PaginatedTable } from 'src/components'
import { useTranslation } from 'src/hooks'
import { Columns } from 'src/pages/usersRequests/Columns'
import { useNavigate, useParams } from 'react-router-dom'
import { ProjectUsersModel } from 'src/models/ProjectsUsers'
import { usePaginatedFetchData } from 'src/services/base/usePaginatedFetchData'

const model = ProjectUsersModel

export const UsersPage: FCC = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const columns = Columns()
  const { id } = useParams<{
    id: string
    salesChannelId: string
  }>()

  const {
    dataCount,
    rowData,
    isFetching,
    isLoading,
    page,
    pageSize,
    handlePaginationChange,
  }: any = usePaginatedFetchData({
    model,
    defFilters: { project: id },
    options: {
      enabled: !!id,
    },
  })
  return (
    <PageWrapper
      title={t('Пользователи')}
      itemsCount={dataCount}
      breadcrumbs={[{ title: t('Пользователи'), href: '/users' }]}
    >
      <PaginatedTable
        dataSource={rowData}
        pageSize={pageSize}
        page={page}
        dataCount={dataCount}
        columns={columns}
        isLoading={isLoading || isFetching}
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
