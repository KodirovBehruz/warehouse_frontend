import { Button, Card, Form, Input, message, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@constants/routing.tsx'
import { ILoginValues } from '@models/delivery/contracts/IAuthContracts.ts'
import { authStore } from '@store/useAuthStore.ts'

const { Link } = Typography

export const Login = () => {
	const { login, loading } = authStore()
	const navigate = useNavigate()

	const onFinish = async (values: ILoginValues) => {
		const result = await login(values)
		if (result.success) {
			message.success(result.message)
			navigate(ROUTES.INDEX)
		} else {
			message.error(result.message)
		}
	}

	return (
		<Card
			title='Авторизация'
			style={{ maxWidth: 400, margin: 'auto', marginTop: 50 }}
		>
			<Form name='login' onFinish={onFinish} layout='vertical'>
				<Form.Item
					label='Email'
					name='email'
					rules={[{ required: true, message: 'Введите email!', type: 'email' }]}
				>
					<Input placeholder='Введите email' />
				</Form.Item>
				<Form.Item
					label='Пароль'
					name='password'
					rules={[{ required: true, message: 'Введите пароль!' }]}
				>
					<Input.Password placeholder='Введите пароль' />
				</Form.Item>
				<Form.Item>
					<Button type='primary' htmlType='submit' loading={loading} block>
						Войти
					</Button>
				</Form.Item>
				<Form.Item style={{ textAlign: 'center', marginBottom: 0 }}>
					У вас нет аккаунта?{' '}
					<Link onClick={() => navigate(ROUTES.REGISTER)}>Создать аккаунт</Link>
				</Form.Item>
			</Form>
		</Card>
	)
}
