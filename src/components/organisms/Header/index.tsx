import { ROUTES } from '@constants/routing'
import { HeaderNavbar } from '@molecules/HeaderNavbar'
import { authStore } from '@store/useAuthStore.ts'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import styles from './index.module.scss'

export const Header = () => {
  const logout = authStore((state) => state.logout)
  const loading = authStore((state) => state.loading)
  const navigate = useNavigate()

  const handleLogout = async () => {
    const result = await logout()
    if (result.success) {
      navigate(ROUTES.LOGIN)
    } else {
      alert(result.message)
    }
  }
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <p>Warehouse</p>
        </div>
        <HeaderNavbar />
        <Button onClick={handleLogout} loading={loading}>
          Выйти
        </Button>
      </div>
    </header>
  )
}
