import React from 'react'
import { RadarChartOutlined } from '@ant-design/icons'
import { lazy } from 'react'
import { useTranslation } from 'src/hooks'
import { Link } from 'src/routes/routesList'
import { ProjectsUsersRoutesNames } from 'src/routes/projectsUserRoutes'

const Projects = lazy(
  () => import('src/pages/projects/ProjectsPage/ProjectsPage')
)
const Project = lazy(() => import('src/pages/projects/ProjectPage/ProjectPage'))
const Users = lazy(() => import('src/pages/projectsUsers/UsersPage/UsersPage'))
const UsersRequests = lazy(
  () => import('src/pages/usersRequests/RequestsPage/RequestsPage')
)
const Gena = lazy(() => import('src/pages/gena/GenaPage/GenaPage'))

export const ProjectsRoutesNames = {
  PROJECTS: 'projects',
  PROJECT: 'project',
  PROJECTS_USERS: 'projects-users',
}

export const ChannelActionsRoutesNames = {
  CHANNELS: 'channels',
}

export const ProjectChannelTypesUrl = `${ProjectsRoutesNames.PROJECTS}/:id/${ChannelActionsRoutesNames.CHANNELS}/:channelType`

export const ProjectsRoutes = () => {
  const { t } = useTranslation()
  return [
    {
      title: t('Проекты'),
      to: ProjectsRoutesNames.PROJECTS,
      component: <Projects />,
      icon: <RadarChartOutlined />,
      isNavLink: true,
    },
    {
      title: t('Проект'),
      to: `/${ProjectsRoutesNames.PROJECTS}/:id`,
      component: <Project />,
      isNavLink: false,
      childrenList: [],
    },
    {
      to: `/${ProjectsRoutesNames.PROJECTS}/:id/${ProjectsUsersRoutesNames.PROJECTS_USERS}`,
      component: <Users />,
      isNavLink: false,
    },
    {
      to: `/${ProjectsRoutesNames.PROJECTS}/:id/channels/:projectSalesChannelId/requests`,
      component: <UsersRequests />,
      isNavLink: false,
    },
    {
      to: `/${ProjectsRoutesNames.PROJECTS}/:id/channels/:projectSalesChannelId/requests/:requestId`,
      component: <Gena />,
      isNavLink: false,
    },
    // {
    //   title: t('Страница генерации персонального предложения для пользователя'),
    //   to: `${ProjectChannelTypesUrl}/users/:userId`,
    //   component: <Gena />,
    // },
  ] as Link[]
}
