import { ROUTES } from '@constants/routing'
import { Header } from '@organisms/Header'
import { Home } from '@pages/Home'
import { Login } from '@pages/Login'
import { Products } from '@pages/Products'
import { Register } from '@pages/Register'
import { Reports } from '@pages/Reports'
import { Supplies } from '@pages/Supplies'
import { WriteOffs } from '@pages/WriteOffs'
import { authStore } from '@store/useAuthStore.ts'
import { Navigate, Route, Routes } from 'react-router-dom'

interface IProtectedRouteProps {
  token: string | null | undefined
  children: React.ReactNode
}

const ProtectedRoute = ({ token, children }: IProtectedRouteProps) => {
  if (!token) {
    return <Navigate to={ROUTES.LOGIN} replace />
  }
  return children
}

export const AppRouter = () => {
  const token = authStore((state) => state.token)
  return (
    <>
      <Routes>
        <Route
          path={ROUTES.INDEX}
          element={
            <ProtectedRoute token={token}>
              <Header />
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.PRODUCTS}
          element={
            <ProtectedRoute token={token}>
              <Header />
              <Products />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.SUPPLIES}
          element={
            <ProtectedRoute token={token}>
              <Header />
              <Supplies />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.WRITEOFF}
          element={
            <ProtectedRoute token={token}>
              <Header />
              <WriteOffs />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.REPORTS_PRODUCTS}
          element={
            <ProtectedRoute token={token}>
              <Header />
              <Reports />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.REPORTS_PRODUCTS}
          element={
            <ProtectedRoute token={token}>
              <Header />
              <Reports />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.REPORTS_WRITEOFF}
          element={
            <ProtectedRoute token={token}>
              <Header />
              <Reports />
            </ProtectedRoute>
          }
        />

        <Route path={ROUTES.REGISTER} element={<Register />} />
        <Route path={ROUTES.LOGIN} element={<Login />} />
      </Routes>
    </>
  )
}
