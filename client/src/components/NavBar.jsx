import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from "../index"
import { observer } from "mobx-react-lite"
import { Nav, Options, Menu, MenuLink, Logo } from './styled/NavBar'
import { ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, ORDERS_ROUTE, SHOP_ROUTE } from '../utils/consts';
import { fetchUser } from '../http/userAPI';

const NavBar = observer(() => {
    const [isOpen, setIsOpen] = useState(false)
    const [name, setName] = useState('')
    const { user } = useContext(Context)
    const navigate = useNavigate()
    let link = window.location.href.substring(21)
    const userId = localStorage.getItem('userId')        
        
    useEffect(() => {
        fetchUser().then((data) => {
            setName(data.email)
        })
    }, [])
    
    const logOut = () => {
        localStorage.setItem('userInfo', {})
        localStorage.setItem('userRole', '')
        localStorage.setItem('userIsAuth', false)
        localStorage.setItem('userId', 0)
        setName('')
        user.setUser({})
        user.setRole('')
        user.setIsAuth(false)
        navigate(SHOP_ROUTE)
    }

    return (
        <Nav link={link}>
            <Logo link={link} onClick={() => navigate(SHOP_ROUTE)}>
                Food<span>Shop</span>
            </Logo>
            
            <Options onClick={() => setIsOpen(!isOpen)}>
                <span />
                <span />
                <span />
            </Options>
            {user.isAuth & user.role === 'ADMIN' ?
                <Menu isOpen={isOpen}>
                    <MenuLink link={link} onClick={() => navigate(ADMIN_ROUTE)}>Админ панель</MenuLink>
                    <MenuLink link={link} onClick={() => logOut()}>Выйти</MenuLink>
                </Menu>
                : user.isAuth & user.role === 'USER' ?
                <Menu isOpen={isOpen}>
                    <MenuLink link={link} style={{pointerEvents: 'none'}} disabled>{name}</MenuLink>
                    <MenuLink link={link} onClick={() => navigate(ORDERS_ROUTE)}>Ваши покупки</MenuLink>
                    <MenuLink link={link} onClick={() => navigate(BASKET_ROUTE)}>Корзина</MenuLink>
                    <MenuLink link={link} onClick={() => logOut()}>Выйти</MenuLink>
                </Menu>
                :
                <Menu isOpen={isOpen}>
                    <MenuLink link={link} onClick={() => navigate(LOGIN_ROUTE)}>Авторизация</MenuLink>
                </Menu>
            }
        </Nav>
    )
})

export default NavBar