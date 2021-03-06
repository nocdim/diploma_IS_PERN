import { Navigate } from 'react-router-dom'
import Admin from './pages/Admin'
import AdminEditPage from './pages/AdminEditPage'
import Basket from './pages/Basket'
import Shop from './pages/Shop'
import Auth from './pages/Auth'
import ProductPage from './pages/ProductPage'
import Orders from './pages/Orders'
import OrderComplete from './pages/OrderComplete'
import Search from './pages/Search'
import { 
    ADMIN_ROUTE, 
    ADMIN_EDIT_ROUTE, 
    BASKET_ROUTE, 
    PRODUCT_ROUTE, 
    LOGIN_ROUTE, 
    REGISTRATION_ROUTE, 
    SHOP_ROUTE, 
    NON_EXISTENT_ROUTE, 
    SUCCESS_ROUTE, 
    ORDERS_ROUTE, 
    SEARCH_ROUTE 
} from './utils/consts'

const params = {
    id: '/:id',
    subject: '/:subject'
}

export const authAdminRoutes = [
    {
        path: ADMIN_ROUTE,
        element: <Admin />
    },
    {
        path: ADMIN_EDIT_ROUTE + params.subject + params.id,
        element: <AdminEditPage />
    },
    {
        path: SEARCH_ROUTE,
        element: <Search />
    }
]

export const authUserRoutes = [
    {
        path: BASKET_ROUTE,
        element: <Basket />
    },
    {
        path: ORDERS_ROUTE,
        element: <Orders />
    },
    {
        path: SUCCESS_ROUTE,
        element: <OrderComplete />
    },
    {
        path: SEARCH_ROUTE,
        element: <Search />
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