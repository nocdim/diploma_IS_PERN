import React, { useState, useContext } from 'react'
import { Card, Container, Form, Button, Row } from 'react-bootstrap'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { REGISTRATION_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../utils/consts'
import { login, registration } from "../http/userAPI"
import { observer } from 'mobx-react-lite';
import { Context } from "../index"

const Auth = observer(() => {
    const { user } = useContext(Context)
    const location = useLocation()
    const navigate = useNavigate()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPass, setConfirmPass] = useState('')

    const click = async () => {
        try {
            let data
            if (isLogin) {
                data = await login(email, password)
            } else {
                data = await registration(email, password, confirmPass)
            }
            localStorage.setItem('userInfo', user)
            localStorage.setItem('userRole', data.role)
            localStorage.setItem('userIsAuth', true)
            user.setUser(user)
            user.setRole(data.role)
            user.setIsAuth(true)
            navigate(SHOP_ROUTE)
        } catch (e) {
            alert(e.response.data.message)
        }

    }

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{ height: window.innerHeight - 54 }}
        >
            <Card style={{ width: 600 }} className="p-5">
                <h2 className="m-auto">{isLogin ? 'Авторизация' : "Регистрация"}</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите ваш email..."
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите ваш пароль..."
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />
                    {!isLogin 
                    ? 
                    <Form.Control
                        className="mt-3"
                        placeholder="Подтвердите ваш пароль..."
                        value={confirmPass}
                        onChange={e => setConfirmPass(e.target.value)}
                        type="password"
                    />
                    : <></>
                    }
                    <Row className="d-flex justify-content-between mt-3">
                        {isLogin ?
                            <div>
                                Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйся!</NavLink>
                            </div>
                            :
                            <div>
                                Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink>
                            </div>
                        }
                        <Button
                            onClick={click}
                            className="mt-3 align-self-end"
                            variant={"outline-success"}>
                            {isLogin ? 'Войти' : 'Зарегистрироваться'}
                        </Button>
                    </Row>

                </Form>
            </Card>
        </Container>
    )
})

export default Auth