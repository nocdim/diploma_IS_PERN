import { Navigate } from 'react-router-dom'
import Admin from './pages/Admin'
import AdminEditPage from './pages/AdminEditPage'
import Basket from './pages/Basket'
import Shop from './pages/Shop'
import Auth from './pages/Auth'
import ProductPage from './pages/ProductPage'
import { ADMIN_ROUTE, ADMIN_EDIT_ROUTE, BASKET_ROUTE, PRODUCT_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE, NON_EXISTENT_ROUTE } from './utils/consts'

const params = {
    id: '/:id',
    subject: '/:subject'
}

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        element: <Admin />
    },
    {
        path: ADMIN_EDIT_ROUTE + params.subject + params.id,
        element: <AdminEditPage />
    },
    {
        path: BASKET_ROUTE,
        element: <Basket />
    }
]

export const publicRoutes = [
    {
        path: SHOP_ROUTE,
        element: <Shop />
    },
    {
        path: LOGIN_ROUTE,
        element: <Auth />
    },
    {
        path: REGISTRATION_ROUTE,
        element: <Auth />
    },
    {
        path: PRODUCT_ROUTE + params.id,
        element: <ProductPage />
    },
    {
        path: NON_EXISTENT_ROUTE,
        element: <Navigate to="/" />
    }
]