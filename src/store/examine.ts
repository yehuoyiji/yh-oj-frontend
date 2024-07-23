import {StoreOptions} from "vuex";
import ACCESS_ENUM from "@/access/accessEnum";


export default {
    namespaced: true,
    state: () => (
        {
            activeTab: ''
        }
    ),

    actions:{
        changeActiveTab({commit, state}, payload) {
            commit("changeActiveTab", payload)
        }
    },
    mutations: {
        changeActiveTab(state, val) {
            state.activeTab = val
        }
    }
}as StoreOptions<any>