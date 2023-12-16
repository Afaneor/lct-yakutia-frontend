import React, { Suspense } from 'react'
import './index.css'
import { App } from './containers'
import reportWebVitals from './reportWebVitals'
import { createRoot } from 'react-dom/client'
import './i18n/i18n'
import { ProSidebarProvider } from 'react-pro-sidebar'
import { ConfigProvider } from 'antd'
import { themeCustom } from 'src/theme/theme'
import './theme/index.scss'
import 'antd/dist/reset.css'
import ruRu from 'antd/locale/ru_RU'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
  NotificationMessageProvider,
  CurrentUserProvider,
} from 'src/components'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
import ru from 'javascript-time-ago/locale/ru.json'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import customParseFormat from 'dayjs/plugin/customParseFormat'

// fix bug: clone.weekday is not a function antd
import localeData from 'dayjs/plugin/localeData'
import weekday from 'dayjs/plugin/weekday'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import weekYear from 'dayjs/plugin/weekYear'
import isoWeek from 'dayjs/plugin/isoWeek'
dayjs.extend(customParseFormat)
dayjs.extend(advancedFormat)
dayjs.extend(weekday)
dayjs.extend(localeData)
dayjs.extend(weekOfYear)
dayjs.extend(weekYear)
dayjs.extend(isoWeek)

TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(ru)

const queryClient = new QueryClient()

const container: Element = document.getElementById('root') as Element
const root = createRoot(container)
root.render(
  // @ts-ignore
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ConfigProvider theme={themeCustom} locale={ruRu}>
        <ProSidebarProvider>
          <NotificationMessageProvider>
            <CurrentUserProvider>
              <App />
            </CurrentUserProvider>
          </NotificationMessageProvider>
        </ProSidebarProvider>
      </ConfigProvider>
    </QueryClientProvider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
