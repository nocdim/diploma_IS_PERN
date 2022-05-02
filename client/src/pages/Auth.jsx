import React, { useState, useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { REGISTRATION_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../utils/consts'
import { login, registration } from "../http/userAPI"
import { observer } from 'mobx-react-lite';
import { Context } from "../index"
import Background from '../components/styled/Background'
import Input from '../components/Input'
import { Container, Form, Logo } from '../components/styled/Auth';

const Auth = observer(() => {
    const { user } = useContext(Context)
    const location = useLocation()
    const navigate = useNavigate()
    const isLogin = location.pathname === LOGIN_ROUTE
    const isRegistration = location.pathname === REGISTRATION_ROUTE
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPass, setConfirmPass] = useState('')

    const click = async () => {
        try {
            let role
            let data
            if (isLogin) {
                data = await login(email, password)
            } 
            if (isRegistration) {
                data = await registration(email, password, confirmPass, role = 'USER')
            }
            localStorage.setItem('userInfo', user)
            localStorage.setItem('userRole', data.role)
            localStorage.setItem('userIsAuth', true)
            localStorage.setItem('userId', data.id)
            user.setUser(user)
            user.setRole(data.role)
            user.setIsAuth(true)
            navigate(SHOP_ROUTE)
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    return (
        <Background>
            <Container>
                <Form>
                    <Logo onClick={() => navigate(SHOP_ROUTE)}>
                        Food<span>Shop</span>
                    </Logo>
                    <h3>{isLogin ? 'Авторизация' : "Регистрация"}</h3>
                    <Input
                        type="email"
                        placeholder="Введите ваш email..."
                        value={email}
                        onChange={value => setEmail(value)}
                    />
                    <Input
                        type="password"
                        placeholder="Введите ваш пароль..."
                        value={password}
                        onChange={value => setPassword(value)}
                    />
                    {!isLogin
                        ?
                        <Input
                            type="password"
                            placeholder="Подтвердите ваш пароль..."
                            value={confirmPass}
                            onChange={value => setConfirmPass(value)}
                        />
                        : <></>
                    }
                    <button onClick={click}>
                        {isLogin ? 'Войти' : 'Зарегистрироваться'}
                    </button>
                    {isLogin
                        ?
                        <h4>Нет аккаунта? <span onClick={() => navigate(REGISTRATION_ROUTE)}>Зарегистрируйтесь!</span></h4>
                        :
                        <h4>Есть аккаунт? <span onClick={() => navigate(LOGIN_ROUTE)}>Войдите!</span></h4>
                    }
                </Form>
            </Container>
        </Background>
    )
})

export default Auth