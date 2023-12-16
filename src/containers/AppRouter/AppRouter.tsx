import React, { lazy, useCallback, useRef } from 'react'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { Link, RoutesList } from 'src/routes'
import { ErrorBoundaryMain, LayoutContainer } from 'src/containers'
import { ProjectsRoutesNames } from 'src/routes/projectsRoutes'
const NotFound404 = lazy(() => import('src/pages/NotFound/NotFound'))

// контекст для сохранения бесконечного скрола в таблице
export const KeepAlive = React.createContext({ tableScroll: {} })

export const AppRouter: React.FC = () => {
  const tableScroll = useRef({ top: 0 })
  const links = RoutesList() as Link[]

  const getRoutes = useCallback((authLinks: Link[]) => {
    return authLinks.map(({ childrenList, to, component }) => {
      const route = { path: to, element: component } as Record<string, any>
      if (childrenList?.length) {
        route.children = getRoutes(childrenList)
      }
      return route
    })
  }, [])

  const routes = getRoutes(links)

  const router = createBrowserRouter([
    {
      path: '/',
      element: <LayoutContainer links={links} isAuthorized={true} />,
      children: [
        {
          index: true,
          element: <Navigate to={`/${ProjectsRoutesNames.PROJECTS}`} replace />,
        },
        { path: '*', element: <NotFound404 /> },
        ...routes,
      ],
      errorElement: <ErrorBoundaryMain links={links} />,
    },
  ])

  return (
    <KeepAlive.Provider value={{ tableScroll: tableScroll.current }}>
      <RouterProvider router={router} />
    </KeepAlive.Provider>
  )
}

AppRouter.displayName = 'AppRouter'

export default AppRouter
