<template>
  <ant-form
      :model="form"
      name="normal_login"
      class="login-form"
      @finish="onFinish"
      style="max-width: 320px; margin: 0 auto"
  >
    <ant-form-item
        name="username"
    >
      <ant-input v-model:value="form.userAccount" style="height: 40px; font-size: 16px; font-weight: bolder" placeholder="用户名">
        <template #prefix>
          <UserOutlined class="site-form-item-icon" style="margin-right: 5px"/>
        </template>
      </ant-input>
    </ant-form-item>

    <ant-form-item
        name="password"
    >
      <ant-input-password v-model:value="form.userPassword" style="height: 40px;font-size: 16px; font-weight: 700;" placeholder="密码">
        <template #prefix>
          <LockOutlined class="site-form-item-icon" style="margin-right: 5px"/>
        </template>
      </ant-input-password>
    </ant-form-item>

    <ant-form-item
        name="checkpassword"
    >
    <ant-input-password v-model:value="form.checkPassword" style="height: 40px;font-size: 16px; font-weight: 700;" placeholder="确认密码">
      <template #prefix>
        <LockOutlined class="site-form-item-icon" style="margin-right: 5px"/>
      </template>
    </ant-input-password>
    </ant-form-item>


    <ant-form-item>
      <ant-button style="width: 320px; font-size: 18px; height: 40px" type="primary" html-type="submit" class="login-form-button">
        注册
      </ant-button>


    </ant-form-item>
  </ant-form>
</template>
<script setup lang="ts">
import {reactive, computed} from 'vue';
import {UserOutlined, InfoCircleOutlined, LockOutlined} from '@ant-design/icons-vue';
import {UserControllerService, UserLoginRequest, UserRegisterRequest} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import {useRouter} from "vue-router";
import {useStore} from "vuex";
import {
  Button as antButton,
  Form as antForm,
  FormItem as antFormItem,
  Input as antInput,
  InputPassword as antInputPassword
} from 'ant-design-vue'

const router = useRouter()
const store = useStore()
const form = reactive({
  userAccount: '',
  userPassword: '',
  checkPassword: '',
} as UserRegisterRequest)

const onFinish = async () => {
  const res = await UserControllerService.userRegisterUsingPost(form);
  console.log("表单:" + JSON.stringify(form))
  if (res.code === 0) {
    message.success("注册成功")
    await router.push({
      path: "/user/login",
      replace: true //不会占有浏览器的堆栈 即点击返回 不会返回登录页
    })

  } else {
    message.error("注册失败:" + res.message)
  }
};
// const onFinishFailed = errorInfo => {
//   console.log('Failed:', errorInfo);
// };
// const disabled = computed(() => {
//   return !(formState.username && formState.password);
// });
</script>
<style scoped>
#components-form-demo-normal-login .login-form {
  max-width: 300px;
}

#components-form-demo-normal-login .login-form-forgot {
  float: right;
}

#components-form-demo-normal-login .login-form-button {
  width: 100%;
}
</style>