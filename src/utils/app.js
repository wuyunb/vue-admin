import cookie from 'cookie_js';

export function getToken(){
    return cookie.get('admin_toKen')
}

export function setToken(token){
    return cookie.set('admin_toKen',token)
}