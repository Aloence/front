import {makeAutoObservable} from "mobx";

export default class BasketStore {
    constructor() {
        this._devices = []
        makeAutoObservable(this)
    }

    setDevices(devices) {
        this._devices = devices
    }
    addDevice(device){
        this._devices.push(device)
        localStorage.setItem("basket",JSON.stringify(this._devices))
    }
    delDevice(index){
        this._devices.splice(index,1)
        localStorage.setItem("basket",JSON.stringify(this._devices))
    }
    get devices() {
        return this._devices
    }
}
