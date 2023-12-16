import React, { lazy, Suspense, useMemo } from 'react'
import { FCC } from 'src/types'
import { Col, Divider, notification, Row } from 'antd'
import { GoToEntityDetail, SalesChannelListItem } from 'src/components'
import { useTranslation } from 'src/hooks'
import { Outlet, useParams } from 'react-router-dom'
import { ChannelActionsRoutesNames } from 'src/routes/projectsRoutes'
import {
  useExtraActionsPost,
  useFetchOneItem,
  useUpdateItem,
} from 'src/services/base/hooks'
import { ProjectSalesChannelModel, ProjectsModel } from 'src/models'
import { ProductsRoutesNames } from 'src/routes/productsRoutes'
import { AddSalesChannelsToProject } from 'src/components/projects/AddSalesChannelsToProject/AddSalesChannelsToProject'
import styles from 'src/pages/products/ProductPage/ProductPage.module.scss'
import CardDetailSection from '../../../components/_base/CardDetailSection/CardDetailSection'
const EditableMarkdown = React.lazy(
  () => import('src/components/_base/EditableMarkdown/EditableMarkdown')
)

const PageWrapper = lazy(
  () => import('src/components/_base/PageWrapper/PageWrapper')
)

export const ProjectPage: FCC = () => {
  const { t } = useTranslation()
  const { id } = useParams<{ id: string }>()
  const [isShowAddSalesChannelsModal, setIsShowAddSalesChannelsModal] =
    React.useState(false)

  const {
    data,
    refetch,
  }: {
    data: any
    isLoading: boolean
    refetch: CallableFunction
  } = useFetchOneItem({
    model: ProjectsModel,
    id: Number(id),
    options: {
      enabled: !!id,
    },
  })

  const channelsCardsFakeData = useMemo(() => {
    return [
      {
        id: 1,
        title: t('СМС'),
        to: `${ChannelActionsRoutesNames.CHANNELS}/sms`,
      },
      {
        id: 2,
        title: t('ПУШ'),
        to: `${ChannelActionsRoutesNames.CHANNELS}/push`,
      },
      {
        id: 3,
        title: t('КУРЬЕР'),
        to: `${ChannelActionsRoutesNames.CHANNELS}/courier`,
      },
    ]
  }, [t])

  const { mutate: updateProject } = useUpdateItem(ProjectsModel)

  const handleUpdate = (field: string, text: string) => {
    updateProject(
      { id: data?.data?.id, fields: { [field]: text } },
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

  const {
    mutate: addSalesChannelsToProject,
    isLoading: isAddSalesChannelsToProjectLoading,
  } = useExtraActionsPost('addSalesChannelsToProject')

  const handleAddSalesChannelsToProject = (
    salesChannels: Record<string, number[]>
  ) => {
    addSalesChannelsToProject(
      {
        url: ProjectSalesChannelModel.multiCreateUrl(),
        record: { ...salesChannels, project: data?.data?.id },
      },
      {
        onSuccess: () => {
          refetch()
          setIsShowAddSalesChannelsModal(false)
          notification.success({
            message: t('Успешно добавлено'),
          })
        },
        onError: (err) => {
          notification.error({
            message: t('Не удалось добавить'),
          })
          console.error(err)
        },
      }
    )
  }
  const handleShowAddSalesChannelsModal = (isShow: boolean) => {
    setIsShowAddSalesChannelsModal(isShow)
  }

  return (
    <PageWrapper
      title={data?.data?.name}
      breadcrumbs={[
        {
          title: t('Проекты'),
          href: '/projects',
        },
        {
          title: data?.data?.name,
        },
      ]}
    >
      <>
        <Row gutter={[16, 16]}>
          <Col xs={24} xl={12}>
            <CardDetailSection title={'Описание'}>
              {data?.data ? (
                <EditableMarkdown
                  text={data?.data?.description}
                  onSave={(text) => handleUpdate('description', text)}
                />
              ) : null}
            </CardDetailSection>
          </Col>
          <Col xs={24} xl={12}>
            <CardDetailSection
              title={`${t('Продукт')}: ${data?.data?.product?.name}`}
              extra={
                <GoToEntityDetail
                  url={`/${ProductsRoutesNames.PRODUCTS}/${data?.data?.product?.id}`}
                />
              }
            >
              {data?.data?.product?.description}
            </CardDetailSection>
          </Col>
          <Col xs={24} xl={12}>
            <CardDetailSection
              title={t('Дополнительные данные для формирования запроса в LLM')}
            >
              {data?.data ? (
                <EditableMarkdown
                  text={data?.data?.prompt}
                  onSave={(text) => handleUpdate('prompt', text)}
                />
              ) : null}
            </CardDetailSection>
          </Col>
          <Col xs={24} xl={12}>
            <CardDetailSection
              title={t('Каналы связи')}
              extra={
                <AddSalesChannelsToProject
                  isLoading={isAddSalesChannelsToProjectLoading}
                  visible={isShowAddSalesChannelsModal}
                  onAdd={handleAddSalesChannelsToProject}
                  onCancel={() => handleShowAddSalesChannelsModal(false)}
                  onShowModal={() => handleShowAddSalesChannelsModal(true)}
                />
              }
            >
              <SalesChannelListItem data={data?.data?.sales_channels} />
            </CardDetailSection>
          </Col>
          <Divider />
          <Col xs={24}>
            <CardDetailSection title={t('Статистика')}>
              Тут будет статистика
            </CardDetailSection>
          </Col>
        </Row>
        <Row gutter={[16, 16]}></Row>
        <Suspense>
          <Outlet />
        </Suspense>
      </>
    </PageWrapper>
  )
}

ProjectPage.displayName = 'ProjectPage'

export default ProjectPage
