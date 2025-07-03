import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import {ROUTES} from "../constants/routing";
import {Products} from "../pages/Products";
import {Header} from "../components/organisms/Header";
import {Supplies} from "../pages/Supplies";
import {Register} from "../pages/Register";
import {authStore} from "../store/useAuthStore.ts";
import {Login} from "../pages/Login";
import {Home} from "../pages/Home";
import {WriteOffs} from "../pages/WriteOffs";
import {Reports} from "../pages/Reports";


const ProtectedRoute = ({ token, children }) => {
    return token ? children : <Navigate to={ROUTES.LOGIN} />
}

export const AppRouter = () => {
    const token = authStore(state => state.token)
    const navigate = useNavigate()
    if (!token) {
        navigate(ROUTES.LOGIN)
    }
    return (
        <>
            <Routes>
                <Route path={ROUTES.INDEX} element={
                    <>
                        <Header />
                        <Home />
                    </>
                }/>
                <Route path={ROUTES.PRODUCTS} element={
                    <ProtectedRoute token={token}>
                        <Header />
                        <Products />
                    </ProtectedRoute>
                }/>
                <Route
                    path={ROUTES.SUPPLIES}
                    element={
                    <ProtectedRoute token={token}>
                        <Header />
                        <Supplies />
                    </ProtectedRoute>
                }/>
                <Route
                    path={ROUTES.WRITEOFF}
                    element={
                        <ProtectedRoute token={token}>
                            <Header />
                            <WriteOffs />
                        </ProtectedRoute>
                }/>
                <Route
                    path={ROUTES.REPORTS.PRODUCTS}
                    element={
                        <ProtectedRoute token={token}>
                            <Header />
                            <Reports />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path={ROUTES.REPORTS.SUPPLIES}
                    element={
                        <ProtectedRoute token={token}>
                            <Header />
                            <Reports />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path={ROUTES.REPORTS.WRITEOFF}
                    element={
                        <ProtectedRoute token={token}>
                            <Header />
                            <Reports />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path={ROUTES.REGISTER}
                    element={<Register />}
                />
                <Route
                    path={ROUTES.LOGIN}
                    element={<Login />}
                />
            </Routes>
        </>
    )
}