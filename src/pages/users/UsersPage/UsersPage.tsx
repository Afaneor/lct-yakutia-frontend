import React from 'react'
import styles from './StatisticsPage.module.scss'
import { FCC } from 'src/types'
import { PageWrapper, PaginatedTable } from 'src/components'
import { useTablePageParams, useTranslation } from 'src/hooks'
import { UsersPageActions } from 'src/components/users/UsersPageActions'
import { Columns } from 'src/pages/users/Columns'
import LoadDataModal from '../../../components/_base/LoadDataModal/LoadDataModal'
import { useNavigate, useParams } from 'react-router-dom'
import { ProjectUsersModel } from 'src/models/ProjectsUsers'
import { usePaginatedFetchData } from 'src/services/base/usePaginatedFetchData'

interface UsersPageProps {
  prop?: any
}

const model = ProjectUsersModel

export const UsersPage: FCC<UsersPageProps> = ({ prop }) => {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = React.useState(false)
  const { t } = useTranslation()
  const columns = Columns()
  const { id, salesChannelId } = useParams<{
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
  }: any = usePaginatedFetchData({
    model,
    defFilters: {
      // ...companyFilter,
      // ...getAllFilterSP(),
    },
    options: {
      // enabled: !!getAllFilterSP()?.getValue(filterKey),
    },
  })

  const { page, pageSize } = useTablePageParams(10, 0)
  return (
    <PageWrapper
      title={t('Пользователи')}
      breadcrumbs={[{ title: t('Пользователи'), href: '/users' }]}
      actions={<UsersPageActions onUpload={handleIsOpen} />}
    >
      <LoadDataModal isOpen={isOpen} onClose={handleIsClose} />
      <PaginatedTable
        pageSize={pageSize}
        page={page}
        dataCount={1}
        columns={columns}
        filter={{ project: id, salesChannel: salesChannelId }}
        onRowClick={({ record }) => {
          navigate(`${record.id.value}`)
        }}
      />
    </PageWrapper>
  )
}

UsersPage.displayName = 'UsersPage'

export default UsersPage
