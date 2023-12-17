import React from 'react'
import { FCC } from 'src/types'
import { Layout } from 'antd'
import { LoginForm } from 'src/components'
import { useTranslation } from 'src/hooks'
import { APP_NAME } from 'src/constants'

const { Header, Content } = Layout

export const LoginPage: FCC = () => {
  const { t } = useTranslation()
  return (
    <Layout
      className='layout'
      style={{
        height: '100vh',
      }}
    >
      <Header
        style={{
          textAlign: 'center',
          color: '#fff',
          backgroundColor: '#4096ff',
        }}
      >
        <h1>{APP_NAME}</h1>
      </Header>
      <Content style={{ padding: '10px 50px', textAlign: 'center' }}>
        <h1>{t('Авторизация')}</h1>
        <LoginForm />
      </Content>
    </Layout>
  )
}

LoginPage.displayName = 'LoginPage'
