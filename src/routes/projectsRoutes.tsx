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
  () => import('src/pages/usersRequests/UsersPage/UsersPage')
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
      title: t('Каналы'), // TODO: переименовать в "Каналы связи"
      to: 'channels',
      component: <Projects />,
      icon: <RadarChartOutlined />,
      isNavLink: true,
    },
    {
      title: t('Статистика'),
      to: 'statistics',
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
      to: `/${ProjectsRoutesNames.PROJECTS}/:id/channels/:projectSalesChannelId`,
      component: <UsersRequests />,
      isNavLink: false,
    },
    // // роуты для каналов связи
    // {
    //   title: t('Статистика канала связи проекта'),
    //   to: `${ProjectChannelTypesUrl}/statistics`,
    //   component: <Statistics />,
    //   isNavLink: false,
    // },
    // {
    //   title: t('Пользователи канала связи проекта'),
    //   to: `${ProjectChannelTypesUrl}/users`,
    //   component: <Users />,
    //   isNavLink: false,
    // },
    // {
    //   title: t('Рассылка канала связи проекта'),
    //   to: `${ProjectChannelTypesUrl}/mailing`,
    //   component: <Mailing />,
    //   isNavLink: false,
    // },
    {
      title: t('Страница генерации персонального предложения для пользователя'),
      to: `${ProjectChannelTypesUrl}/users/:userId`,
      component: <Gena />,
    },
  ] as Link[]
}
