import reouter from "./index.js";

import {getToken} from '@/utils/app'

const whiteRouter = ['/login']
reouter.beforeEach((to,from,next)=>{
    if (getToken()) {
        next()
    } else {
        if (whiteRouter.indexOf(to.path) !== -1) {
            next()
        } else {
            next('/login')
        }
        console.log(to,from)
    }
})