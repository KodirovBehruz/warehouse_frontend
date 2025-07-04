import { ROUTES } from '@constants/routing.tsx'
import { NavLink } from 'react-router-dom'
import styles from './index.module.scss'

export const HeaderNavbar = () => {
  return (
    <nav className={styles.menu}>
      <NavLink to={ROUTES.INDEX} className={({ isActive }) => (isActive ? styles.active : '')}>
        Главная
      </NavLink>
      <NavLink to={ROUTES.PRODUCTS} className={({ isActive }) => (isActive ? styles.active : '')}>
        Товары
      </NavLink>
      <NavLink to={ROUTES.SUPPLIES} className={({ isActive }) => (isActive ? styles.active : '')}>
        Поставки
      </NavLink>
      <NavLink to={ROUTES.WRITEOFF} className={({ isActive }) => (isActive ? styles.active : '')}>
        Списания
      </NavLink>
    </nav>
  )
}
