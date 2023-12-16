import React from 'react'
import { FCC } from 'src/types'
import { Form, Input, Button, message } from 'antd'
import { Store } from 'antd/lib/form/interface'
import AuthServices, {
  BASIC_AUTH_STORAGE_KEY,
} from 'src/services/auth/AuthServices'
import { useTranslation } from 'src/hooks'

interface LoginFormProps {
  prop?: any
}
export const LoginForm: FCC<LoginFormProps> = () => {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const [isLoading, setIsLoading] = React.useState(false)
  const onFinish = (values: Store) => {
    setIsLoading(true)
    const { email, password } = values
    const basicAuth = window.btoa(email + ':' + password)
    localStorage.setItem(BASIC_AUTH_STORAGE_KEY, JSON.stringify(basicAuth))
    AuthServices.login('login', {
      email,
      password,
    })
      .then((res: any) => {
        if (res?.status === 200) {
          message.success(t('Авторизация успешна'))
          window.location.href = '/projects'
        }
      })
      .catch((err: any) => {
        localStorage.removeItem(BASIC_AUTH_STORAGE_KEY)
        message.error(t('Ошибка авторизации') + ': ' + err?.data?.detail, 5)
        console.error(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <Form
      form={form}
      name='login-form'
      initialValues={{ remember: true }}
      onFinish={onFinish}
      style={{ maxWidth: '300px', margin: 'auto', marginTop: '50px' }}
    >
      <Form.Item
        name={'email'}
        rules={[{ required: true, message: 'Введите email!' }]}
      >
        <Input placeholder={'Email'} />
      </Form.Item>

      <Form.Item
        name='password'
        rules={[{ required: true, message: 'Введите пароль!' }]}
      >
        <Input.Password placeholder='Пароль' />
      </Form.Item>

      {/*<Form.Item>*/}
      {/*  <Form.Item name='remember' valuePropName='checked' noStyle>*/}
      {/*    <Checkbox>Запомнить меня</Checkbox>*/}
      {/*  </Form.Item>*/}

      {/*  <a style={{ float: 'right' }} href='/'>*/}
      {/*    Забыли пароль?*/}
      {/*  </a>*/}
      {/*</Form.Item>*/}

      <Form.Item>
        <Button
          loading={isLoading}
          type='primary'
          htmlType='submit'
          style={{ width: '100%' }}
        >
          Войти
        </Button>
      </Form.Item>
    </Form>
  )
}

LoginForm.displayName = 'LoginForm'

export default LoginForm
