<template>
  <div id="userLoginView">
    <h3 style="margin-bottom: 24px">用户登录</h3>
    <a-form
        :model="form"
        style="max-width: 380px;
        margin: 0 auto"
        @finish="handleSubmit"
        label-align="left"
        auto-label-width="true">
      <a-form-item >
        <a-input v-model="form.userAccount" placeholder="用户名">
          <template #prefix>
            <user-outlined />
          </template>
        </a-input>
      </a-form-item>


      <a-form-item tooltip="密码不小于8位" >
        <a-input v-model="form.userPassword" placeholder="密码">
          <template #prefix>
            <LockOutlined />
          </template>
          <template #suffix>
            <a-tooltip title="密码不少8位">
              <info-circle-outlined style="color: rgba(0, 0, 0, 0.45)" />
            </a-tooltip>
          </template>
        </a-input>
      </a-form-item>


      <a-form-item>
        <a-button type="primary" html-type="submit" style="width: 380px; border-radius: 5px">登录</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
  import {reactive} from "vue";
  import {UserControllerService, UserLoginRequest} from "../../../generated";
  import message from "@arco-design/web-vue/es/message"
  import {useRouter} from "vue-router";
  import {useStore} from "vuex";
  import { UserOutlined, InfoCircleOutlined,LockOutlined } from '@ant-design/icons-vue';
  const router = useRouter()
  const store = useStore();
  const form = reactive({
    userAccount: '',
    userPassword: '',
  } as UserLoginRequest)

  const handleSubmit = async () => {
    const res  = await UserControllerService.userLoginUsingPost(form);
    console.log("表单:" + JSON.stringify(form))
    if(res.code === 0) {
      message.success("登录成功")
      await store.dispatch("user/getLoginUser");
      await router.push({
        path: "/",
        replace: true //不会占有浏览器的堆栈 即点击返回 不会返回登录页
      })

    }else {
      message.error("登录失败:" + res.message)
    }

  }
</script>
