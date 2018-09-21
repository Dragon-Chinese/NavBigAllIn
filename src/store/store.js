import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  // 定义状态
  state: {
    isLogin: false,
    userInfo:[],
  },
  mutations: {
        // 登录
        isLoginFn(state, msg) {
            state.isLogin = msg;
            if(msg){
                sessionStorage.setItem("loginStatus",msg)
            }else{
                sessionStorage.removeItem("loginStatus");
            }
        },
        getUserInfo(state,cont){
            state.userInfo=cont;

        }
    }
})

export default store;