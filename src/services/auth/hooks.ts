import {
  QueryKey,
  useMutation,
  useQuery,
  UseQueryOptions,
} from '@tanstack/react-query'
import AuthServices from 'src/services/auth/AuthServices'
import {
  LoginValuesTypes,
  SetPasswordValuesTypes,
} from 'src/services/auth/types'
import { useContext } from 'react'
import { CurrentUserContext } from 'src/components'

/**
 * Хук установки пароля пользователя
 */
export const useLogin = () => {
  return useMutation({
    mutationKey: ['login'],
    mutationFn: (credentials: LoginValuesTypes) =>
      AuthServices.login('login', credentials),
  })
}
/**
 * Хук разлогинивания пользователя
 */
export const useLogout = () => {
  localStorage.removeItem('user')

  return useMutation(() => AuthServices.logout('logout'), {
    mutationKey: ['logout'],
    onSuccess: () => localStorage.removeItem('companies'),
  })
}

/**
 * Хук для получения информации о текущем пользователе
 * @param options
 */
export const useUserGetInfo = (options?: UseQueryOptions) => {
  return useQuery(['getInfo'] as QueryKey, () => AuthServices.getUserInfo(), {
    ...options,
  })
}

/**
 * Хук отправки запроса на восстановление пароля
 */
export const useForgotPassword = () => {
  return useMutation({
    mutationKey: ['forgotPassword'],
    mutationFn: (email: string) => AuthServices.forgot({ email }),
  })
}

/**
 * Хук установки нового пароля
 */
export const useSetPassword = () => {
  return useMutation({
    mutationKey: ['setPassword'],
    mutationFn: ({ password1, password2, extraPath }: SetPasswordValuesTypes) =>
      AuthServices.setPasswords({
        password1,
        password2,
        extraPath,
      }),
  })
}

/**
 * Хук для получения информации о текущем пользователе
 */
export const useUserContext = () => {
  return useContext(CurrentUserContext)
}
