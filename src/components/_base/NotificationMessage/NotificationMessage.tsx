import { notification } from 'antd'
import React, { useContext } from 'react'
import { ArgsProps, NotificationInstance } from 'antd/es/notification/interface'
import { FCC } from 'src/types'

export const NotificationMessageContext = React.createContext({
  api: {} as NotificationInstance,
})

export const useNotification = () => {
  const { api }: { api: NotificationInstance } = useContext(
    NotificationMessageContext
  )
  const notifyInfo = (props: ArgsProps) => {
    api.info(props)
  }
  const notifySuccess = (props: ArgsProps) => {
    api.success(props)
  }
  const notifyError = (props: ArgsProps) => {
    api.error(props)
  }
  const notifyWarning = (props: ArgsProps) => {
    api.warning(props)
  }
  const notifyOpen = (props: ArgsProps) => {
    api.open({ ...props, style: { backgroundColor: 'red' } })
  }
  return { notifyInfo, notifySuccess, notifyError, notifyWarning, notifyOpen }
}
export const NotificationMessageProvider: FCC = ({ children }) => {
  const [api, contextHolder] = notification.useNotification()

  return (
    <NotificationMessageContext.Provider value={{ api }}>
      {contextHolder}
      {children}
    </NotificationMessageContext.Provider>
  )
}

NotificationMessageProvider.displayName = 'NotificationMessageProvider'

export default NotificationMessageProvider
