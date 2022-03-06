import React from 'react'
import {Routes, Route, Redirect} from 'react-router-dom'
import { authRoutes, publicRoutes } from '../routes'


const AppRouter = () => {
    const isAuth = false
    return (
        <Routes>
            {isAuth && authRoutes.map(({path, element}) => 
                <Route exact path={path} element={element}/>
            )}
             {publicRoutes.map(({path, element}) => 
                <Route exact path={path} element={element}/>
            )}
        </Routes>
    )
}
export default AppRouter