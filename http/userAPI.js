import {$host} from "./index";

export const registration = async (username, password) => {
    const {data} = await $host.post('users/registration', {username, password})
    return data
}
export const login = async (username, password) => {
    const {data} = await $host.post('users/login',{username, password})
    return data
}