import { makeAutoObservable } from "mobx"

export default class UserStore {
    constructor() {
        this._isAuth = false
        this._user = {}
        this._role = ''
        makeAutoObservable(this)
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