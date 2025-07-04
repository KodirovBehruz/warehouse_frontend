import { ROUTES } from '@constants/routing.tsx'
import { IRegisterValues } from '@models/delivery/contracts/IAuthContracts.ts'
import { authStore } from '@store/useAuthStore.ts'
import { Button, Card, Form, Input, message, Typography } from 'antd'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
const { Link } = Typography

export const Register: FC = () => {
  const { register, loading } = authStore()
  const navigate = useNavigate()

  const onFinish = async (values: IRegisterValues) => {
    const result = await register(values)
    if (result.success) {
      message.success(result.message)
      navigate(ROUTES.INDEX)
    } else {
      message.error(result.message)
    }
  }

  return (
    <Card title="Регистрация" style={{ maxWidth: 400, margin: 'auto', marginTop: 50 }}>
      <Form name="register" onFinish={onFinish} layout="vertical">
        <Form.Item
          label="Имя"
          name="name"
          rules={[{ required: true, message: 'Введите имя!', type: 'string' }]}
        >
          <Input placeholder="Введите имя" />
        </Form.Item>
        <Form.Item
          label="Фамилия"
          name="lastName"
          rules={[{ required: true, message: 'Введите фамилия!', type: 'string' }]}
        >
          <Input placeholder="Введите фамилия" />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Введите email!', type: 'email' }]}
        >
          <Input placeholder="Введите email" />
        </Form.Item>
        <Form.Item
          label="Номер телефона"
          name="phoneNumber"
          rules={[{ required: true, message: 'Введите номер телефона!', type: 'string' }]}
        >
          <Input placeholder="Введите номер телефона" />
        </Form.Item>
        <Form.Item
          label="Пароль"
          name="password"
          rules={[{ required: true, message: 'Введите пароль!' }]}
        >
          <Input.Password placeholder="Введите пароль" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Войти
          </Button>
        </Form.Item>
        <Form.Item style={{ textAlign: 'center', marginBottom: 0 }}>
          У вас уже есть аккаунт <Link onClick={() => navigate(ROUTES.LOGIN)}>Войти</Link>
        </Form.Item>
      </Form>
    </Card>
  )
}
