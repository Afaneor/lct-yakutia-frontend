import React from 'react'

import { useRouteError } from 'react-router-dom'

export function RootError(): JSX.Element {
  const err = useRouteError() as RouteError
  return (
    <div>
      <strong>Error {err.status || 500}</strong>:{' '}
      {err.statusText ?? err.message}
    </div>
  )
}

type RouteError = Error & { status?: number; statusText?: string }
