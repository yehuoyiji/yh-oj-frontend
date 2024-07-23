<template>
  <div class="viewQuestionHeader">

    <a-grid :cols="{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5, xxl: 6 }" :colGap="6" :rowGap="16" class="grid-demo-grid">
      <a-grid-item class="demo-item">
<!--        <div class="title-bar" @click="toHome">-->
<!--          <img class="logo" src="@/assets/DC-102-1.png">-->
<!--        </div>-->
      </a-grid-item>
      <a-grid-item class="demo-item"></a-grid-item>
      <a-grid-item class="demo-item">


        <Popover  v-if="isclose">
          <template #content>
            <p  style="font-size: 16px">题目集为空,无法判题</p>
          </template>
          <aButton @click="runQuestion" :disabled="isclose"
                   style="float: right; font-size: 16px; height: 37px; text-align: center; color: #5b5858">
            <a-space>
              <CaretRightOutlined STYLE="font-size: 20px"/>
              运行
            </a-space>
          </aButton>
        </Popover>
        <aButton v-else @click="runQuestion" :disabled="isclose"
                 style="float: right; font-size: 16px; height: 37px; text-align: center; color: #5b5858">
          <a-space>
            <CaretRightOutlined STYLE="font-size: 20px"/>
            运行
          </a-space>
        </aButton>
      </a-grid-item>
      <a-grid-item class="demo-item">
        <Popover  v-if="isclose">
          <template #content>
            <p  style="font-size: 16px">题目集为空,无法判题</p>
          </template>
          <aButton @click="doSubmit" :disabled="isclose"
                   style=" font-size: 16px; float: left; height: 37px; text-align: center;color: #01b328">
            <a-space>
              <CloudUploadOutlined STYLE="font-size: 20px"/>
              提交
            </a-space>
          </aButton>
        </Popover>
        <aButton v-else @click="doSubmit" :disabled="isclose"
                 style=" font-size: 16px; float: left; height: 37px; text-align: center;color: #01b328">
          <a-space>
            <CloudUploadOutlined STYLE="font-size: 20px"/>
            提交
          </a-space>
        </aButton>
      </a-grid-item>
      <a-grid-item class="demo-item">

        <div style="display: flex; font-size: 18px; font-weight: 500; height: 100%; justify-content: flex-end; align-items: center; margin-right: 20px">考试剩余时间:</div>
      </a-grid-item>
      <a-grid-item class="demo-item">
        <div style="float: right">
          <a-space :size="'large'">

            <div style="margin-right: 100px">
              <StatisticCountdown :value="Date.now() + remainTime" @finish="finishExam">
              </StatisticCountdown>
            </div>

            <div>
              <Popover  v-if="isclose">
                <template #content>
                  <p  style="font-size: 16px">题目集为空,无法交卷</p>
                </template>
                <aButton type="primary" @click="showConfirmSubmit" :disabled="isclose"
                         style="float: right; font-size: 16px; height: 37px; text-align: center;">
                  <a-space>
                    <ToTopOutlined STYLE="font-size: 22px; font-weight: 700"/>
                    交卷
                  </a-space>
                </aButton>
              </Popover>
              <aButton v-else type="primary" @click="showConfirmSubmit"
                       style="float: right; font-size: 16px; height: 37px; text-align: center;">
                <a-space>
                  <ToTopOutlined STYLE="font-size: 22px; font-weight: 700"/>
                  交卷
                </a-space>
              </aButton>
            </div>
<!--            <a-badge :count="5" dot title="Custom hover text" style="cursor: pointer;">-->
<!--              <icon-notification style="font-size: 24px"/>-->
<!--            </a-badge>-->
<!--            <a-popover trigger="click">-->
<!--              <div class="userAvatar" style="cursor: pointer">-->
<!--                <img :src="editUserDetail.userAvatar" style="width: 32px; border-radius: 16px">-->
<!--              </div>-->
<!--              <template #content>-->
<!--                <a-space direction="vertical">-->
<!--                  <aButton type="primary" @click="logout">登出</aButton>-->
<!--                  <aButton type="primary" @click="handleClick">个人中心</aButton>-->
<!--                </a-space>-->
<!--              </template>-->
<!--            </a-popover>-->
          </a-space>

        </div>
      </a-grid-item>

    </a-grid>
    <Modal v-model:open="confirmSubmit">
      <template #title>
        提交试卷
      </template>

      确认提交试卷吗？


      <template #footer>
        <aButton type="primary" @click="finishExam">确定</aButton>
        <aButton type="primary" @click="cancelSubmitExam">取消</aButton>
      </template>
    </Modal>
    <a-drawer style="display: flex" ok-text="提交" :width="440" :visible="visible" @ok="handleOk"
              @cancel="handleCancel">
      <template #title>
        个人中心
      </template>
      <div style="display: flex; flex-direction: column; padding-top: 100px">
        <div style="flex: 2; margin: 0 auto">
          <a-upload :show-upload-list="false" :custom-request="customRequestImg">
            <img :src="editUserDetail.userAvatar" style="width: 150px; border-radius: 10px" alt="">
          </a-upload>
        </div>
        <div style="display: flex;flex: 5;  margin-top: 70px">
          <Form v-bind="formItemLayout"
                style="flex:5;max-width: 320px;margin: 0 auto;  display: flex; flex-direction: column;  justify-content: center">
            <FormItem label-align="left" label="用户名:" name="userName">
              <Input width="300" v-model:value="editUserDetail.userName"></Input>
            </FormItem>
            <FormItem label-align="left" label="用户简介" name="userProfile">
              <Input width="300" v-model:value="editUserDetail.userProfile"></Input>
            </FormItem>
          </Form>
        </div>
      </div>
    </a-drawer>

  </div>
</template>

<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {CloudUploadOutlined, CaretRightOutlined, ToTopOutlined} from '@ant-design/icons-vue'
import {
  Button as aButton,
  Upload as aUpload,
  Input,
  Form,
  FormItem,
  Modal,
  StatisticCountdown,
  Result,
  Popover
} from 'ant-design-vue';
import {
  ExamSubmitControllerService,
  FileControllerService, QuestionGroupControllerService,
  QuestionSubmitAddRequest,
  QuestionSubmitControllerService,
  UserControllerService,
  UserUpdateMyRequest
} from "../../../generated"
import {computed, ref, toRefs, defineExpose} from "vue";
import message from "@arco-design/web-vue/es/message";
import {IconNotification} from "@arco-design/web-vue/es/icon";
import {useStore} from "vuex";
import {onMounted} from "@vue/runtime-core";
import type {UploadChangeParam} from 'ant-design-vue';
import dayjs from "dayjs";

const confirmSubmit = ref(false)
const formItemLayout = {
  labelCol: {
    xs: {span: 24},
    sm: {span: 6},
  },
  wrapperCol: {
    xs: {span: 34},
    sm: {span: 24},
  },
};
const isSubmitExam = ref(false)
const showConfirmSubmit = () => {
  confirmSubmit.value = true;
}
const cancelSubmitExam = () => {
  confirmSubmit.value = false;
}
const finishExam = () => {
  emit('finishExam', true)
}
const router = useRouter()
const store = useStore()
const props = defineProps({
  //子组件接收父组件传递过来的值
  info: QuestionSubmitAddRequest,
  inputList: [],
  isclose: Boolean,
  timeLimit: Number,
  endTime: ref,
  questionId: Number,
  examId: Number,
})

  //防止页面后退
  history.pushState(null, null, document.URL);
  window.addEventListener('popstate', function () {
    history.pushState(null, null, document.URL);
  });


const endTime1 = ref()
const getTime = () => {
  console.log("考试结束时间", new Date(props.endTime.toString()).getTime())
  console.log("现在时间", new Date().getTime())
  console.log("限制时间",props.timeLimit  * 1000 * 60)
  const endTime1 = (new Date(props.endTime.toString()).getTime() - new Date().getTime()) > props.timeLimit  * 1000 * 60  ? props.timeLimit  * 1000 * 60  : new Date(props.endTime.toString()).getTime() - new Date().getTime()

}
const remainTime = ref()
const getQuestionGroup = async () => {
  const res = await QuestionGroupControllerService.getQuestionGroupByIdUsingGet(props.questionId)
  const endTime = res.data?.endTime
  const timeLimit = res.data?.limitTime
  const endTime1 = (new Date(endTime.toString()).getTime() - new Date().getTime()) > timeLimit  * 1000 * 60  ? timeLimit  * 1000 * 60  : new Date(endTime.toString()).getTime() - new Date().getTime()
  remainTime.value = endTime1
}

const {info, inputList} = toRefs(props)
const visible = ref(false);

const submitExam = () => {
  isSubmitExam.value = true
}
const customRequestImg = async (Img: any) => {
  const res = await FileControllerService.uploadFileUsingPost(Img.file, "user_avatar")
  if (res.code === 0) {
    editUserDetail.value.userAvatar = "https://" + res.data
  } else {
    message.error("上传失败:" + res.message);
  }
}

const editUserDetail = ref<UserUpdateMyRequest>({
  userAvatar: '',
  userName: '',
  userProfile: ''
})

const loadUserData = () => {
  editUserDetail.value.userAvatar = store.state.user.loginUser.userAvatar
  editUserDetail.value.userName = store.state.user.loginUser.userName
  editUserDetail.value.userProfile = store.state.user.loginUser.userProfile
}

onMounted(() => {
  loadUserData()
  getQuestionGroup()
})

const handleClick = () => {
  visible.value = true;
};
const handleOk = async () => {
  console.log("图片" + editUserDetail.value.userAvatar)
  const res = await UserControllerService.updateMyUserUsingPost(
      editUserDetail.value as UserUpdateMyRequest
  )
  if (res.code === 0) {
    message.success("更新成功")
  } else {
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
const response = ref()
const emit = defineEmits(['submit', 'runResultUUID', 'finishExam'])

const doSubmit = async () => {
  if (info.value.questionId === undefined) {
    return;
  }
  if (props.examId === undefined) {
    return
  }
  const res = await ExamSubmitControllerService.submitExamUsingPost({
    code: info.value.code,
    examId: props.examId,
    language: info.value.language,
    questionId: info.value.questionId
  })

  if (res.code === 0) {
    message.success("提交成功")
  } else {
    message.error("提交失败:" + res.message)
  }
  response.value = res.data
  emit('submit', response.value)
  console.log("子组件", response.value)
  console.log(info.value)
}
const runResultUUID = ref()
const runQuestion = async () => {
  if (inputList?.value === undefined || inputList?.value?.length === 0) {
    return
  }
  const res = await QuestionSubmitControllerService.runQuestionUsingPost({
    // code: info.value.code.replace(/\\r\\n/g,"\n"),
    code: info.value.code,
    inputList: inputList.value,
    questionId: info.value.questionId,
    language: info.value.language,
  })

  runResultUUID.value = res.data


  emit('runResultUUID', runResultUUID.value)
}


const toHome = () => {
  router.push({
    path: '/',
    replace: true
  })
}
onMounted(() => {
  getTime()
})
</script>

<style scoped>
.viewQuestionHeader {
  padding: 10px 20px 10px 30px;
}

.logo {
  height: 38px;
  cursor: pointer;
}

.grid-demo-grid .demo-item:nth-child(2n) {

}

.grid-demo-grid .demo-item:nth-child(2n + 1) {

}


</style>
<style>
.arco-drawer-footer > .arco-btn {
  width: 100px !important;
  border-radius: 7px !important;
}
</style>