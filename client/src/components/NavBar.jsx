import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from "../index"
import { observer } from "mobx-react-lite"
import { Nav, Options, Menu, MenuLink, Logo } from '../components/styled/Navbar'
import { ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../utils/consts';

const NavBar = observer(() => {
    const [isOpen, setIsOpen] = useState(false)
    const { user } = useContext(Context)
    const navigate = useNavigate()
    let link = window.location.href.substring(21)

    const logOut = () => {
        localStorage.setItem('userInfo', {})
        localStorage.setItem('userRole', '')
        localStorage.setItem('userIsAuth', false)
        user.setUser({})
        user.setRole('')
        user.setIsAuth(false)
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
                    <MenuLink onClick={() => navigate(ADMIN_ROUTE)}>Админ панель</MenuLink>
                    <MenuLink onClick={() => navigate(BASKET_ROUTE)}>Корзина</MenuLink>
                    <MenuLink onClick={() => logOut()}>Выйти</MenuLink>
                </Menu>
                : user.isAuth & user.role === 'USER' ?
                <Menu isOpen={isOpen}>
                    <MenuLink onClick={() => navigate(BASKET_ROUTE)}>Корзина</MenuLink>
                    <MenuLink onClick={() => logOut()}>Выйти</MenuLink>
                </Menu>
                :
                <Menu isOpen={isOpen}>
                    <MenuLink onClick={() => navigate(LOGIN_ROUTE)}>Авторизация</MenuLink>
                </Menu>
            }
        </Nav>
    )
})

export default NavBar