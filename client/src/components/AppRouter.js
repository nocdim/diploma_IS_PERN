import React, { useContext } from 'react'
import {Routes, Route} from 'react-router-dom'
import { authRoutes, publicRoutes } from '../routes'
import { Context } from '../index'

const AppRouter = () => {
    const { user } = useContext(Context)

    return (
        <Routes>
            {user.isAuth && authRoutes.map(({path, element}) => 
                <Route key={path} exact path={path} element={element}/>
            )}
            {publicRoutes.map(({path, element}) => 
                <Route key={path} exact path={path} element={element}/>
            )}
        </Routes>
    )
}
export default AppRouter