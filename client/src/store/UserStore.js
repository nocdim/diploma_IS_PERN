import { makeAutoObservable } from "mobx"

export default class UserStore {
    constructor() {
        this._isAuth = localStorage.getItem('userIsAuth')
        this._user = localStorage.getItem('userInfo')
        this._role = localStorage.getItem('userRole')
        this._admins = []
        this._users = []
        makeAutoObservable(this)
    }

    setAdmins(admins) {
        this._admins = admins
    }
    setUsers(users) {
        this._users = users
    }
    setIsAuth(bool) {
        this._isAuth = bool
    }
    setUser(user) {
        this._user = user
    }
    setRole(str) {
        this._role = str
    }
    get admins() {
        return this._admins
    }
    get users() {
        return this._users
    }
    get isAuth() {
        return this._isAuth
    }
    get user() {
        return this._user
    }
    get role() {
        return this._role
    }
}