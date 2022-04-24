import React, { useContext } from 'react';
import { Context } from "../index"
import Navbar from "react-bootstrap/Navbar"
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import { NavLink } from 'react-router-dom';
import { ADMIN_ROUTE, SHOP_ROUTE, LOGIN_ROUTE } from '../utils/consts';
import { Button } from 'react-bootstrap';
import { observer } from "mobx-react-lite"
import { useNavigate } from 'react-router-dom';

const NavBar = observer(() => {
    const { user } = useContext(Context)
    const navigate = useNavigate()

    const logOut = () => {
        localStorage.setItem('userInfo', {})
        localStorage.setItem('userRole', '')
        localStorage.setItem('userIsAuth', false)
        user.setUser({})
        user.setRole('')
        user.setIsAuth(false)
    }

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <NavLink style={{ color: 'white' }} to={SHOP_ROUTE}>Food Shop</NavLink>
                {user.isAuth & user.role === 'ADMIN' ?
                    <Nav className="ml-auto" style={{ color: 'white' }}>
                        <Button
                            variant={"outline-light"}
                            onClick={() => navigate(ADMIN_ROUTE)}
                        >
                            Админ панель
                        </Button>
                        <Button
                            variant={"outline-light"}
                            onClick={() => logOut()}
                        >
                            Выйти
                        </Button>
                    </Nav>
                    : user.isAuth & user.role === 'USER' ?
                        <Nav className="ml-auto" style={{ color: 'white' }}>
                            <Button
                                variant={"outline-light"}
                                onClick={() => logOut()}
                            >
                                Выйти
                            </Button>
                        </Nav>
                        :
                        <Nav className="ml-auto" style={{ color: 'white' }}>
                            <Button
                                variant={"outline-light"}
                                onClick={() => navigate(LOGIN_ROUTE)}

                            >
                                Авторизация</Button>
                        </Nav>
                }
            </Container>
        </Navbar>
    )
})

export default NavBar