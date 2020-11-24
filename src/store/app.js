import { Promise } from "core-js"
import {setToken} from '@/utils/app.js'
import {Login} from '@/api/login'
const state = {
  isCollapse: JSON.parse(sessionStorage.getItem('isCollapse')) || false,
  to_ken:'',
  user_name:''
}

const mutations = {
  SET_COLLAPSE(state) {
    state.isCollapse = !state.isCollapse
    sessionStorage.setItem('isCollapse', JSON.stringify(state.isCollapse))
  }
}

const actions = {
  login (context,data){
    return new Promise((resolve,reject)=>{
      Login(data).then(res=>{
        if (res.resCode == 0 ) {
          setToken(res.data.token)
          context.state.to_ken = res.data.token
          context.state.user_name = res.data.username
        }
        resolve(res)
      }).catch(error =>{
        resolve(error)
      })
    })
  }
}
const modules = {}

export default {
  namespaced:true, //处理命名空间
  state,
  mutations,
  actions,
  modules,
};