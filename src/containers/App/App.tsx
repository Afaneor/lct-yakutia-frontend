import React, { lazy, Suspense, useContext } from 'react'
import { CurrentUserContext, LayoutLoading } from 'src/components'

const AppRouter = lazy(() => import('src/containers/AppRouter/AppRouter'))

const NotAuthAppRouter = lazy(
  () => import('src/containers/AppRouter/NotAuthorizedRouter')
)

export const App: React.FC = () => {
  const { isAuthorized, isLoading } = useContext(CurrentUserContext)

  if (isLoading) {
    return <LayoutLoading />
  }

  return (
    <Suspense fallback={<LayoutLoading />}>
      {isAuthorized ? <AppRouter /> : <NotAuthAppRouter />}
    </Suspense>
  )
}

App.displayName = 'App'

export default App
