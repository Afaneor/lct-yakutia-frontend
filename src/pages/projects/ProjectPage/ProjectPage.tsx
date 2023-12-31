import React, { lazy, Suspense } from 'react'
import { FCC } from 'src/types'
import { Col, notification, Row, Space } from 'antd'
import {
  GoToEntityDetail,
  SalesChannelListItem,
  CardDetailSection,
} from 'src/components'
import { useTranslation } from 'src/hooks'
import { Outlet } from 'react-router-dom'
import { useExtraActionsPost } from 'src/services/base/hooks'
import {
  ProjectSalesChannelModel,
  ProjectsModel,
  SalesChannelFields,
} from 'src/models'
import { AddSalesChannelsToProject } from 'src/components/projects/AddSalesChannelsToProject/AddSalesChannelsToProject'
import { useEntityPage } from 'src/pages/hooks/useEntityPage'
import { ProjectsRoutesNames } from 'src/routes/projectsRoutes'
const EditableMarkdown = React.lazy(
  () => import('src/components/_base/EditableMarkdown/EditableMarkdown')
)

const PageWrapper = lazy(
  () => import('src/components/_base/PageWrapper/PageWrapper')
)

const model = ProjectsModel
export const ProjectPage: FCC = () => {
  const { t } = useTranslation()
  const [isShowAddSalesChannelsModal, setIsShowAddSalesChannelsModal] =
    React.useState(false)

  const {
    data,
    refetch,
    handleUpdate,
  }: {
    data: any
    isLoading: boolean
    refetch: CallableFunction
    handleUpdate: CallableFunction
  } = useEntityPage(model)

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
          href: `/${ProjectsRoutesNames.PROJECTS}`,
        },
        {
          title: data?.data?.name,
        },
      ]}
      // TODO: скрыл неиспользуемую кнопку
      // actions={<SettingsButton />}
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
                  tooltip={t('Перейти к источнику')}
                  url={data?.data?.product?.link}
                  target={'_blank'}
                />
              }
            >
              {data?.data?.product?.description}
            </CardDetailSection>
          </Col>
          <Col xs={24}>
            <CardDetailSection
              title={t('Каналы связи')}
              extra={
                <Space direction={'horizontal'}>
                  <AddSalesChannelsToProject
                    channels={data?.data?.projects_sales_channels.map(
                      (channel: SalesChannelFields) => channel.id
                    )}
                    isLoading={isAddSalesChannelsToProjectLoading}
                    visible={isShowAddSalesChannelsModal}
                    onAdd={handleAddSalesChannelsToProject}
                    onCancel={() => handleShowAddSalesChannelsModal(false)}
                    onShowModal={() => handleShowAddSalesChannelsModal(true)}
                  />
                </Space>
              }
            >
              <SalesChannelListItem
                data={data?.data?.projects_sales_channels}
              />
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
