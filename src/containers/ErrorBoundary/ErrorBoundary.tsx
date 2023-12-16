import React, { ErrorInfo, PropsWithChildren } from 'react'
import { BoundaryComponent } from 'src/components/_base/BoundaryComponent'
import { useRouteError } from 'react-router-dom'
import { NoInternetComponent } from 'src/components'

interface ErrorBoundaryProps {
  children: React.ReactNode
}

export interface StateProps {
  errorInfo: ErrorInfo | null
  error: Error | null
}
class ErrorBoundary extends React.Component<ErrorBoundaryProps, StateProps> {
  constructor(props: Readonly<ErrorBoundaryProps>) {
    super(props)
    this.state = { error: null, errorInfo: null }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    })
  }
  render() {
    if (this.state.errorInfo) {
      return (
        <BoundaryComponent
          error={this.state.error}
          componentStack={this.state.errorInfo?.componentStack}
        />
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary

interface ErrorBoundaryMainProps extends PropsWithChildren {
  links: Record<string, any>[]
}
export function ErrorBoundaryMain({
  children,
  links,
}: ErrorBoundaryMainProps): any {
  const error: Error | any = useRouteError()
  if (error) {
    console.error('chunk loader error name: ', error.name)
    if (error.name === 'ChunkLoadError') {
      return <NoInternetComponent links={links} />
    }
    return (
      <BoundaryComponent error={error?.message} componentStack={error?.stack} />
    )
  }
  return children
}
