import {StoreOptions} from "vuex";
import ACCESS_ENUM from "@/access/accessEnum";
import {UserControllerService} from "../../generated";



export default {
    namespaced: true,
    state: () => ({
        loginUser: {
            userName: '未登录',
        }
    }),

    actions:{
        async getLoginUser({commit, state}, payload) {
            const res = await UserControllerService.getLoginUserUsingGet();
            console.log("当前用户:" + JSON.stringify(res))
            if (res.code === 0) {
                commit("updateUser", res.data)
            }else {
                commit("updateUser", {...state.loginUser, userRole:ACCESS_ENUM.NOR_LOGIN})
            }

        }
    },
    mutations: {
        updateUser (state, payload) {
            state.loginUser = payload
        },
        logoutUser (state) {

        }
    }
}as StoreOptions<any>