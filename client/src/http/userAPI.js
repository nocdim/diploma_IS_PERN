import { $authHost, $host } from "./index";
import jwt_decode from "jwt-decode"


export const registration = async (email, password, confirmPass, role) => {
    const { data } = await $host.post('api/user/registration', {email, password, confirmPass, role})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const registrationAdmin = async (name, password, confirmPass, role) => {
    const { data } = await $host.post('api/user/registrationAdmin', {name, password, confirmPass, role})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const login = async (email, password) => {
    const { data } = await $host.post('api/user/login', {email, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const check = async () => {
    const { data } = await $authHost.get('api/user/auth')
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const fetchAdmins = async () => {
    const { data } = await $authHost.get('api/user/admins')
    return data
}

export const deleteAdmin = async (admin) => {
    await $authHost.delete(`api/user/admin/:${admin.name}`, admin)
}