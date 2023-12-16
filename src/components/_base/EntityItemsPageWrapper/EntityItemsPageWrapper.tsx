import React, { ReactNode } from 'react'
import { FCC } from 'src/types'
import PageWrapper from '../../../components/_base/PageWrapper/PageWrapper'
import { useTranslation } from 'src/hooks'
import { Card, Col, Form, message, Modal, Row } from 'antd'
import EntityCreation from 'src/components/_base/EntityCreateModal/EntityCreateModal'
import { useInfinityFetchData } from 'src/services/base/useInfinityFetchData'
import { MoreBtn } from 'src/components'
import { useCreateItem, useDeleteItem } from 'src/services/base/hooks'
import { BaseModel } from 'src/models'

interface EntityItemsPageWrapperProps<T> {
  pageTitle?: string
  model: typeof BaseModel
  breadcrumbs?: { href: string; title: string }[]
  actions?: React.ReactNode
  itemsRender?: (item: T, handleDelete: (id: number) => void) => React.ReactNode
  formItemsRender?: ReactNode
}
export const EntityItemsPageWrapperPage: FCC<
  EntityItemsPageWrapperProps<any>
> = ({
  model: MODEL,
  breadcrumbs,
  actions,
  itemsRender,
  pageTitle,
  formItemsRender,
}) => {
  const { tF } = useTranslation()
  const [isModalVisible, setIsModalVisible] = React.useState(false)
  const [form] = Form.useForm()
  const [modal, contextHolder] = Modal.useModal()

  const {
    dataCount,
    rowData,
    fetchNextPage,
    refetch,
    isFetching,
    isLoading,
    hasNextPage,
  }: any = useInfinityFetchData({
    model: MODEL,
    defFilters: {},
  })

  const { mutate: create, isLoading: isCreating } = useCreateItem(MODEL)

  const handleCreate = (values: Record<string, any>) => {
    create(values, {
      onSuccess: () => {
        form.resetFields()
        refetch()
        setIsModalVisible(false)
      },
    })
  }

  const { mutate: remove, isLoading: isRemoving } = useDeleteItem(MODEL)

  const handleRemove = (id: number) => {
    modal.confirm({
      title: tF('Вы уверены, что хотите удалить?'),
      onOk: () => {
        remove(id, {
          onSuccess: () => {
            message.success('Успешно удалено')
            refetch()
          },
          onError: (err) => {
            message.error('Ошибка при удалении')
            console.error(err)
          },
        })
      },
    })
  }

  return (
    <PageWrapper
      title={pageTitle}
      itemsCount={dataCount}
      actions={
        <>
          {actions}
          {formItemsRender ? (
            <EntityCreation
              showModal={setIsModalVisible}
              form={form}
              isLoading={isCreating}
              isVisible={isModalVisible}
              formItemsRender={formItemsRender}
              onCreate={handleCreate}
            />
          ) : null}
        </>
      }
      breadcrumbs={breadcrumbs}
    >
      <Row gutter={[24, 24]}>
        {rowData?.map((item: Record<string, any>, index: number) =>
          itemsRender ? (
            itemsRender(item, handleRemove)
          ) : (
            <Col key={index} xs={24} sm={12} md={8} lg={6}>
              <Card title={item.name} hoverable>
                {item.description}
              </Card>
            </Col>
          )
        )}
      </Row>
      {hasNextPage && (
        <MoreBtn
          isLoading={isFetching || isLoading}
          onMore={() => {
            fetchNextPage()
          }}
        />
      )}
      {contextHolder}
    </PageWrapper>
  )
}

EntityItemsPageWrapperPage.displayName = 'EntityItemsPageWrapperPage'

export default EntityItemsPageWrapperPage
