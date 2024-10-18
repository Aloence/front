import {makeAutoObservable} from "mobx";

export default class UserStore {
    constructor() {
        this._isAuth = false
        this._user = {}
        this._role = false
        makeAutoObservable(this)
    }

    setIsAuth(bool) {
        this._isAuth = bool
    }
    setUser(user) {
        this._user = user
    }
    setRole(bool){
        this._role = bool
    }

    get isAuth() {
        return this._isAuth
    }
    get role() {
        return this._role
    }
    get user() {
        return this._user
    }
}
