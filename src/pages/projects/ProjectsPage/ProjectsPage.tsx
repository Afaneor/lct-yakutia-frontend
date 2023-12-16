import React from 'react'
import { FCC } from 'src/types'
import { useTranslation } from 'src/hooks'
import { ProjectCard, ProjectCreateForm } from 'src/components/projects'
import { Col } from 'antd'
import { ProjectFields, ProjectsModel } from 'src/models'
import { EntityItemsPageWrapperPage } from 'src/components'
import { ProjectsRoutesNames } from 'src/routes/projectsRoutes'

const MODEL = ProjectsModel
export const ProjectsPage: FCC = () => {
  const { tF } = useTranslation()
  const [PageTitle] = React.useState(tF('Проекты'))

  return (
    <EntityItemsPageWrapperPage
      pageTitle={PageTitle}
      model={MODEL}
      breadcrumbs={[
        {
          href: `/${ProjectsRoutesNames.PROJECTS}`,
          title: PageTitle,
        },
      ]}
      formItemsRender={<ProjectCreateForm />}
      itemsRender={(item: ProjectFields, onDelete) => (
        <Col key={item.id} xs={24} md={12} xl={8}>
          <ProjectCard
            id={item.id}
            title={item.name}
            product={item.product.name}
            description={item.description}
            onDelete={onDelete}
          />
        </Col>
      )}
    />
  )
}

ProjectsPage.displayName = 'ProjectsPage'

export default ProjectsPage
