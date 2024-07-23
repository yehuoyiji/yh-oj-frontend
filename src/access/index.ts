
import ACCESS_ENUM from "@/access/accessEnum";
import router from "@/router";
import store from "@/store";
import checkAccess from "@/access/checkAccess";

router.beforeEach(async (to, from, next) => {
    console.log("登录的用户信息:" + JSON.stringify(store.state.user.loginUser))

    let loginUser = store.state.user.loginUser
    // 如果之前没登陆过，自动登录
    if(!loginUser || !loginUser.userRole) {
        // 加await 异步 是为了等用户登录成功之后, 在执行后续代码
        await store.dispatch("user/getLoginUser")
        loginUser = store.state.user.loginUser
    }

    const needAccess = (to.meta?.access as any) ?? [ACCESS_ENUM.NOR_LOGIN];
    //要跳转的页面需要登录
    for (let i = 0; i < needAccess.length; i++)
    if(needAccess[i] !== ACCESS_ENUM.NOR_LOGIN) {
        // 没登陆 跳转至登录页面
        if(!loginUser || !loginUser.userRole || loginUser.userRole === ACCESS_ENUM.NOR_LOGIN) {
            next(`/user/login?redirect=${to.fullPath}`);
            return;
        }
        if( !checkAccess(loginUser, needAccess )) {
            console.log("无权限"+to.path)
            next('/noAuth')
            return;
        }
    }

    next();
})