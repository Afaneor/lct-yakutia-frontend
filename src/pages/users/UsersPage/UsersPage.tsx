import React from 'react'
import styles from './StatisticsPage.module.scss'
import { FCC } from 'src/types'
import { PageWrapper, PaginatedTable } from 'src/components'
import { useTranslation } from 'src/hooks'
import { UsersPageActions } from 'src/components/users/UsersPageActions'
import { Columns } from 'src/pages/users/Columns'
import LoadDataModal from '../../../components/_base/LoadDataModal/LoadDataModal'
import { useNavigate, useParams } from 'react-router-dom'
import { ProjectUsersModel } from 'src/models/ProjectsUsers'
import { usePaginatedFetchData } from 'src/services/base/usePaginatedFetchData'
import { ProductsModel } from 'src/models'

interface UsersPageProps {
  prop?: any
}

const model = ProjectUsersModel
// const model = ProductsModel

export const UsersPage: FCC<UsersPageProps> = ({ prop }) => {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = React.useState(false)
  const { t } = useTranslation()
  const columns = Columns()
  const { id } = useParams<{
    id: string
    salesChannelId: string
  }>()

  const handleIsOpen = () => {
    setIsOpen(true)
  }
  const handleIsClose = () => {
    setIsOpen(false)
  }

  const {
    dataCount,
    rowData,
    refetch,
    fetchNextPage,
    setFilters,
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
      actions={<UsersPageActions onUpload={handleIsOpen} />}
    >
      <LoadDataModal isOpen={isOpen} onClose={handleIsClose} />
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
