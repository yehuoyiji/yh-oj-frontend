<template>
  <div id="globalHeader" class="gloheader">
    <a-row id="globalHeader" class="grid-demo" style="padding-right: 45px" align="center" :wrap="false">
      <a-col flex="auto">
        <a-menu mode="horizontal" :selected-keys="selectedKeys" :default-selected-keys="['1']"
                @menu-item-click="doMenuClick">
          <a-menu-item  key="0" :style="{ padding: 0, marginRight: '10px' }" @click="toHome" class="menuItemFont">
            <div style="display: flex; align-items: center">
              <div class="title-bar" @click="toHome">
                <img class="logo" src="@/assets/YHLOGO_result.png">
              </div>

            </div>

          </a-menu-item>

          <a-menu-item v-for="item in visibleRoutes" :key="item.path" style="font-size: 16px;">
            <template #icon v-if="item.name === '管理题目'">
              <AppstoreFilled style="font-size: 16px;margin-right: -10px"/>
            </template>
            <template #icon v-if="item.name === '个人中心'">
              <UserOutlined style="font-size: 16px; margin-right: -10px"/>
            </template>
            <template #icon v-if="item.name === '题库'">
              <CalculatorFilled style="font-size: 16px; margin-right: -10px"/>
            </template>
            <template #icon v-if="item.name === '考试'">
              <CodeFilled style="font-size: 16px; margin-right: -10px"/>
            </template>
            <template #icon v-if="item.name === '考试与练习'">
              <ProfileOutlined style="font-size: 16px; margin-right: -10px"/>
            </template>
            <template #icon v-if="item.name === '题目集 '">
              <ProfileOutlined style="font-size: 16px; margin-right: -10px"/>
            </template>
            <template #icon v-if="item.name === '用户管理'">
              <ProfileOutlined style="font-size: 16px; margin-right: -10px"/>
            </template>
            <span v-if="item.name !== '考试页'">
              {{ item.name }}
            </span>
            <span v-else>
              题目集
            </span>
          </a-menu-item>
        </a-menu>

      </a-col>
      <a-col flex="100px"  class="menuItemFont">

        <div v-if="!personDetail">
          <aButton type="primary" @click="toLogin">去登录</aButton>
        </div>
        <div v-else>
          <a-space :size="'large'">
<!--            <a-badge :count="5" dot title="Custom hover text" style="cursor: pointer;">-->
<!--              <icon-notification style="font-size: 24px"/>-->
<!--            </a-badge>-->
            <a-popover>
              <div class="userAvatar">
                <img :src="editUserDetail.userAvatar" style="width: 32px; border-radius: 16px" alt="">
              </div>
              <template #content>
                <a-space direction="vertical">
                  <aButton type="primary" @click="handleClick ">
                    <a-space>
                      <icon-user style="font-size: 18px"  />
                      个人中心
                    </a-space>
                  </aButton>
                  <aButton type="primary" danger @click="logout">
                    <a-space>
                      <icon-poweroff style="font-size: 18px" />
                      退出登录
                    </a-space>
                  </aButton>



                </a-space>
              </template>
            </a-popover>
          </a-space>

        </div>

      </a-col>
    </a-row>
  </div>

  <a-drawer style="display: flex" ok-text="提交" :width="440" :visible="visible" @ok="handleOk" @cancel="handleCancel" >
    <template #title>
      个人中心
    </template>
    <div style="display: flex; flex-direction: column; padding-top: 100px">
      <div style="flex: 2; margin: 0 auto">
        <a-upload :show-upload-list="false"  :custom-request="customRequestImg" >
          <img   :src="editUserDetail.userAvatar" style="width: 150px; border-radius: 10px" alt="">
        </a-upload>
      </div>
      <div style="display: flex;flex: 5;  margin-top: 70px">
        <Form v-bind="formItemLayout" style="flex:5;max-width: 320px;margin: 0 auto;  display: flex; flex-direction: column;  justify-content: center">
          <FormItem  label-align="left" label="用户名:" name="userName">
            <Input width="300" v-model:value="editUserDetail.userName"></Input>
          </FormItem>
          <FormItem label-align="left" label="用户简介" name="userProfile">
            <Input width="300" v-model:value="editUserDetail.userProfile"></Input>
          </FormItem>
        </Form>
      </div>
    </div>
  </a-drawer>
</template>

<script lang="ts" setup>

import {useRouter} from "vue-router";
import {computed, ref} from "vue";
import checkAccess from "@/access/checkAccess";
import {routes} from "@/router/routes";
import {IconNotification, IconPoweroff, IconUser} from "@arco-design/web-vue/es/icon";
import {AppstoreFilled, UserOutlined, CalculatorFilled, CodeFilled, ProfileOutlined} from "@ant-design/icons-vue"
import {useStore} from "vuex";
import { UserControllerService, UserUpdateMyRequest} from "../../generated";
import message from "@arco-design/web-vue/es/message";
import {onMounted} from "@vue/runtime-core";
import {Button as aButton, Upload as aUpload,Input, Form, FormItem} from 'ant-design-vue';


const router = useRouter();
const store = useStore()
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 34 },
    sm: { span: 24 },
  },
};
// 计算属性监听值的变化 如然后重新调用方法
const visibleRoutes = computed(() => {
  const loginUser = store.state.user.loginUser;
  return routes.filter((item, index) => {
    if (item.meta?.hideInMenu) {
      return false;
    }
    // 根据权限过滤菜单

    if (!checkAccess(loginUser as any, item?.meta?.access as any)) {
      console.log(item?.meta?.access)
      return false
    }
    return true;
  })
})

/**
 * 跳转至个人中心页
 */
const toPersonDetailView = () => {
  router.push({
    path: '/about',
    replace: true
  })
}

/**
 * 跳转至登录页面
 */
const toLogin = () => {
  router.push({
    path: '/user/login',
    replace: true
  })
}

const customRequestImg = async (Img: any) => {
  const res = await UserControllerService.uploadUsingPost(Img.file)
  if(res.code === 0) {
    editUserDetail.value.userAvatar = "https://" + res.data
  }else {
    message.error("上传失败:" + res.message);
  }
}

const editUserDetail = ref<UserUpdateMyRequest>({
  userAvatar: '',
  userName: '',
  userProfile: ''
})

const loadUserData = async () => {
  const res = await UserControllerService.getLoginUserUsingGet()
  if(res.code === 0) {
    editUserDetail.value.userAvatar = res.data?.userAvatar
    editUserDetail.value.userName = res.data?.userName
    editUserDetail.value.userProfile = res.data?.userProfile
  }else {
    console.log("personDetail.value" + personDetail.value)
  }

}
let personDetail = computed(() => {
  const loginUser = store.state.user?.loginUser
  console.log("用户名"+ loginUser.userName)
  return loginUser.userName !== '未登录';
})

const visible = ref(false);
const handleClick = () => {
  visible.value = true;
};
const handleOk = async () => {
  console.log("图片" + editUserDetail.value.userAvatar)
  const res = await UserControllerService.updateMyUserUsingPost(
      editUserDetail.value as UserUpdateMyRequest
  )
  if(res.code === 0) {
    message.success("更新成功")
  }else {
    message.error("更新失败:" + res.message)
  }
  visible.value = false;
};
const handleCancel = () => {
  visible.value = false;
}

/**
 * 登出
 */
const logout = async () => {
  const res = await UserControllerService.userLogoutUsingPost();
  if (res.code === 0) {
    message.success("登出成功")
    window.location.reload()
  } else {
    message.error("登出失败" + res.message)
  }
}

//  默认主页
const selectedKeys = ref(['/'])

// 路由跳转时 更新选中的路由项
router.afterEach((to, from, failure) => {
  selectedKeys.value = [to.path]
})
const toHome = () => {
  router.push({
    path: '/',
    replace: true
  })
}
const doMenuClick = (key: string) => {
  router.push({
    path: key
  })
}



onMounted( () => {
  loadUserData()
})
// setTimeout(() => {
//   store.dispatch("user/getLoginUser", {
//     userName: 'yehuo管理员',
//     userRole: ACCESS_ENUM.ADMIN
//   })
// }, 3000)
</script>

<style >

#globalHeader {
  background-color: #fff;
  box-shadow: 0 2px 6px rgba(10, 1, 1, 0.06);

}

.title-bar {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.logo {
  height: 48px;
}

.title {
  //color: #444;
  margin-left: 16px;
  font-size: 18px;
  font-weight: 700;
}

.menuItemFont {

}

.userAvatar {
  cursor: pointer;
  text-align: center;
}
.gloheader {

}
</style>

<style>

</style>
