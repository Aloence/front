import {makeAutoObservable} from "mobx";

export default class DeviceStore {
    constructor() {
        this._brands = []
        this._devices = []
        this._selectedBrand = {}
        makeAutoObservable(this)
    }

    changeDev(id,device){
        for ( let i = 0; i<this.devices.length;i++){
            let dev = this.devices[i]
            if(dev.id === id){
                dev.img = device.img
                dev.price = device.price
                dev.name = device.name
                dev.brand = device.brand
                dev.characteristics = device.characteristics
            }
        }
    }
    
    deleteDev(index){
        this.devices.splice(index,1)
    }
    
    setBrands(brands) {
        this._brands = brands
    }
    setDevices(devices) {
        this._devices = devices
    }
    setSelectedBrand(brand) {
        this._selectedBrand = brand
    }

    get brands() {
        return this._brands
    }
    get devices() {
        return this._devices
    }
    get selectedBrand() {
        return this._selectedBrand
    }
}
