import React, { createContext, useMemo } from 'react'
import { FCC } from 'src/types'
import { useUserGetInfo } from 'src/services/auth/hooks'
import { UsersModelProps } from 'src/models'
import { BASIC_AUTH_STORAGE_KEY } from 'src/services/auth/AuthServices'

interface CurrentUserProviderProps {
  currentUserInfo?: UsersModelProps
  currentUserRoles?: Map<string, string[]>
  isAuthorized?: boolean
  isLoading?: boolean
}

export const CurrentUserContext = createContext<CurrentUserProviderProps>(
  {} as CurrentUserProviderProps
)

export const CurrentUserProvider: FCC<CurrentUserProviderProps> = ({
  children,
}) => {
  const { data, isLoading }: { data: any; isLoading: boolean } = useUserGetInfo(
    {
      refetchOnWindowFocus: false,
    }
  )
  const basicAuth = localStorage.getItem(BASIC_AUTH_STORAGE_KEY)
  const isAuthorized = useMemo(() => Boolean(basicAuth), [basicAuth])

  return (
    <CurrentUserContext.Provider
      value={{
        currentUserInfo: data?.data,
        isAuthorized: isAuthorized,
        isLoading,
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  )
}

CurrentUserProvider.displayName = 'CurrentUserProvider'

export default CurrentUserProvider
