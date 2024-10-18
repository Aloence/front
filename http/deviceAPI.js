import {$authHost, $host} from "./index";

export const createBrand = async (brand) => {
    const {data} = await $authHost.post('brands', brand)
    return data
}

export const fetchBrands = async () => {
    const {data} = await $host.get('brands', )
    return data
}


export const createDevice = async (device) => {
    const {data} = await $authHost.post('devices', device, {headers:{'Content-Type': 'application/json'}})
    return data
}

export const fetchDevices = async (brandId,search) => {
    const {data} = await $authHost.get('devices',{params:{brandId, search}})
    return data
}

export const editDevice = async(id,device) =>{
    const {data} = await $authHost.put('devices', device, 
                {headers:{'Content-Type': 'application/json'},
                params:{id}})
    return data 
}

export const fetchOneDevice = async (id) => {
    const {data} = await $host.get('devices/' + id)
    return data
}

export const deleteDevice = async(id)=>{
    const {data} = await $host.delete('devices/' + id)
    return data
}
