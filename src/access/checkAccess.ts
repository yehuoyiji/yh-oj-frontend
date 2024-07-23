import ACCESS_ENUM from "@/access/accessEnum";
import AccessEnum from "@/access/accessEnum";
import store from "@/store";
import {useRoute} from "vue-router";

/**
 *  校验权限 (判断当前用户是否具有某个权限)
 *  @param loginUser 当前登录用户
 *  @param needAccess 需要有的权限
 *  @return boolean 有无权限
 */
const checkAccess = (loginUser: any, needAccess = [ACCESS_ENUM.NOR_LOGIN]) => {
    // 获取当前登录用户具有的权限 (如果没有 loginUser, 则表示未登录)
    // const loginUserAccess = loginUser?.userRole ?? ACCESS_ENUM.NOR_LOGIN
    const loginUserAccess = loginUser?.userRole ?? ACCESS_ENUM.NOR_LOGIN
    const routes = useRoute()
    if(needAccess[0] === ACCESS_ENUM.NOR_LOGIN) {
        return true;
    }

    console.log(needAccess, loginUserAccess)
    console.log("b" + needAccess[0])
    console.log("c" + needAccess[1])
    console.log("数组长度", needAccess.length)
    if(needAccess.includes(loginUserAccess)) {
        console.log("aaaaaa" + needAccess)
        for (let i = 0; i < needAccess.length; i ++) {
            if(needAccess[i] === loginUserAccess) {
                console.log(needAccess[i], loginUserAccess)
                return true
            }
        }
    }

    // return false;
    // for (let i = 0; i < needAccess.length; i++) {
    //
    //     if (needAccess[i] === ACCESS_ENUM.NOR_LOGIN) {
    //         return true;
    //     }
    //     // 用户权限
    //     if (needAccess[i] === ACCESS_ENUM.USER) {
    //         // 如果用户未登录, 表示没有权限
    //         if (loginUserAccess === ACCESS_ENUM.NOR_LOGIN) {
    //             return false;
    //         }
    //     }
    //     // 管理员权限
    //     if (needAccess[i] === ACCESS_ENUM.ADMIN) {
    //         if(needAccess.includes(loginUserAccess)) {
    //
    //             return true;
    //         }
    //         // if (loginUserAccess !== ACCESS_ENUM.ADMIN) {
    //         //     return false;
    //         // }
    //     }
    //     if (needAccess[i] === ACCESS_ENUM.TEACHER) {
    //         if(needAccess.includes(loginUserAccess)) {
    //             return true;
    //         }
    //         // if(loginUserAccess !== ACCESS_ENUM.TEACHER) {
    //         //     return false;
    //         // }
    //     }
    // }

    // return true;
};
export default checkAccess;