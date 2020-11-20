import axios from '@/utils/request'


export function GetSm (data){
    return axios({
        method:'post',
        url:'/getSms/',
        data
    })
}


export function Register(data) {
    return axios({
        method:'post',
        url:'/register/',
        data
    })
}

export function Login (data) {
    return axios({
        method:'post',
        url:'/login/',
        data
    })
}