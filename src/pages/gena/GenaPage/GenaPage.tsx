import React from 'react'
import { FCC } from 'src/types'
import { PageWrapper, Chat } from 'src/components'
import { useTranslation } from 'src/hooks'
import { Col, notification, Row } from 'antd'
import { useEntityPage } from 'src/pages/hooks/useEntityPage'
import { ProjectSalesChannelModel } from 'src/models'
import { useParams } from 'react-router-dom'
import { useFetchItems, useUpdateItem } from 'src/services/base/hooks'
import { MessagesModel } from 'src/models/Messages'
import { APP_NAME } from 'src/constants'

const model = MessagesModel
export const GenaPage: FCC = () => {
  const { t } = useTranslation()
  const { projectSalesChannelId, requestId } = useParams<{
    id: string
    projectSalesChannelId: string
    requestId: string
  }>()

  const {
    data,
    id,
    refetch,
  }: {
    id?: string
    data: any
    isLoading: boolean
    refetch: CallableFunction
    handleUpdate: CallableFunction
  } = useEntityPage(ProjectSalesChannelModel, projectSalesChannelId)

  const { data: messagesData } = useFetchItems(model, {
    request_data: requestId,
  })

  const { mutate: update, isLoading: isLoadingUpdate } = useUpdateItem(model)

  const handleUpdate = (id: string | number, field: string, text: string) => {
    update(
      { id, fields: { [field]: text } },
      {
        onSuccess: () => {
          refetch()
          notification.success({
            message: t('Успешно обновлено'),
          })
        },
        onError: () => {
          notification.error({
            message: t('Не удалось обновить'),
          })
        },
      }
    )
  }

  return (
    <PageWrapper
      title={t('Действуй, Гена!')}
      breadcrumbs={[
        {
          title: t('Проекты'),
          href: '/projects',
        },
        {
          title: data?.data?.project?.name,
          href: `/projects/${id}`,
        },
        {
          title: t('Запросы формирования предложения'),
          href: `/projects/${id}/channels/${projectSalesChannelId}/requests`,
        },
      ]}
      description={t(
        `Здесь ${APP_NAME} поможет тебе сгенерировать персональные маркетинговые предложения для клиентов`
      )}
    >
      <Row justify={'center'}>
        <Col xs={24} xl={12}>
          <Chat
            isLoading={isLoadingUpdate}
            messages={messagesData?.data?.results}
            onChangeMessageStatus={(messageId, status) => {
              handleUpdate(messageId, 'status', status)
            }}
          />
        </Col>
      </Row>
    </PageWrapper>
  )
}

GenaPage.displayName = 'GenaPage'

export default GenaPage
