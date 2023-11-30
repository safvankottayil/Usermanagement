import axios from 'axios'
import { Userapi } from '../../Constance'
export const instance= axios.create({
    baseURL:Userapi,
})
instance.interceptors.request.use(config=>{
    const {Token}=JSON.parse(localStorage.getItem('persist:User'))
    let token=Token.split('"')
    config.headers.Authorization=Token?"Token "+token[1]:null
    return config
})

