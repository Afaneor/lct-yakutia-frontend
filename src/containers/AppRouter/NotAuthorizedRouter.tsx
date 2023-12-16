import React, { createElement } from 'react'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { RootError } from 'src/components'
import { LayoutContainer } from 'src/containers'
import { LoginPage } from 'src/pages/LoginPage'

const NotAuthorizedRouter: React.FC = () => {
  const router = createBrowserRouter([
    {
      path: '',
      element: <LayoutContainer />,
      errorElement: <RootError />,
      children: [
        { index: true, element: <Navigate to='/login' replace /> },
        {
          path: 'login',
          element: <LoginPage />,
        },
      ],
    },
  ])

  return createElement(RouterProvider, { router })
}

export default NotAuthorizedRouter
