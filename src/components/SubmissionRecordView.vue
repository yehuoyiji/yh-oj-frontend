<template>
  <div class="submissionRecordView">
    <div>
      <!--      <div v-if="!status && (submitId !== '' && submitId !== undefined)">-->
      <!--        <div style="height: 40px; border-bottom: 1px solid #e2eff3; padding: 10px">-->
      <!--          <div style="display: flex; align-items: center">-->
      <!--            <div  class="backAllRecords" @click="backAllRecords">-->
      <!--              <a-space style="color:#0000008C;">-->
      <!--                <ArrowLeftOutlined style="font-size: 16px;" />-->
      <!--                <div style="font-size: 16px">全部提交记录</div>-->
      <!--              </a-space>-->
      <!--            </div>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--        <div>-->

      <!--          {{submitRecord}}-->
      <!--        </div>-->

      <!--      </div>-->
      <div v-if="store.state.user.loginUser.userName !== '未登录' && allSubmitRecords.length > 0">
        <div style="padding: 10px 10px 10px 20px">
          <Spin :spinning="spinning" size="large">
            <div class="problemsItemList" style="height: 100%; margin-top: 10px">
              <div>
                <div class="recordItem" v-for="i in allSubmitRecords">
                  <div style="display: flex; flex: 40; flex-direction: row">
                    <div style="font-size: 16px; flex: 2">
                      <div style="color: #FF2D55" v-if="i?.judgeInfo.message === '编译错误'">
                        {{ i?.judgeInfo.message }}
                      </div>
                      <div style="color: #2DB55D" v-else-if="i?.judgeInfo.message === 'Accepted'">
                        通过
                      </div>
                      <div style="font-size: 14px; margin-top: 3px">
                        {{ moment(i?.createTime).format("YYYY/MM/DD HH:mm:ss") }}
                      </div>
                    </div>
                    <div style="flex: 2; display: flex; justify-content: center; align-items: center">
                      <Tag color="green"
                           style="width: 60px; height: 30px; text-align: center; line-height: 25px; font-size: 16px">
                        {{ i?.language }}
                      </Tag>
                    </div>
                    <div style="flex: 2; display: flex; justify-content: center; align-items: center">
                      <a-space :size="4">
                        <HistoryOutlined style="font-size: 18px"/>
                        <div style="font-size: 16px; display: flex; justify-content: center; align-items: center;"
                             v-if="i?.judgeInfo.message === '编译错误'">
                          N/A
                        </div>
                        <div style="font-size: 16px; display: flex; justify-content: center; align-items: center;"
                             v-else-if="i?.judgeInfo.message === 'Accepted'">
                          {{ i?.judgeInfo.time }} ms
                        </div>
                      </a-space>
                    </div>
                    <div style="flex: 2; display: flex; justify-content: center; align-items: center">
                      <a-space :size="4">
                        <CodeSandboxOutlined style="font-size: 18px"/>

                        <div style="font-size: 16px; display: flex; justify-content: center; align-items: center;"
                             v-if="i?.judgeInfo.message === '编译错误'">
                          N/A
                        </div>
                        <div style="font-size: 16px; display: flex; justify-content: center; align-items: center;"
                             v-else-if="i?.judgeInfo.message === 'Accepted'">
                          {{ i?.judgeInfo.memory }} MB
                        </div>
                      </a-space>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </Spin>

        </div>
      </div>


      <div v-else>
        <div v-if="store.state.user.loginUser.userName !== '未登录' && allSubmitRecords.length === 0">
          <a-empty style="margin-top: 100px"/>
        </div>

        <div v-if="!store.state.user.loginUser.userName === '未登录' && !allSubmitRecords.length > 0">
          <a-empty style="margin-top: 100px"/>
        </div>

      </div>



      <div v-if="store.state.user.loginUser.userName === '未登录'">
        <div style="display: flex; flex-direction: column; align-items: center; margin-top: 200px">
          <div style="font-size: 24px; margin-bottom: 10px; color: #000000; ">
            <BulbOutlined style="color: #2DB55D"/>
            请登陆后开始写代码
          </div>
          <div style="font-size: 20px;"> 这里会显示你的提交记录</div>
          <Button @click="toLoginView"
                  style="background:#2DB55D; color: #FFFFFF; margin-top: 20px; font-size: 18px; border-radius: 10px; width: 120px; height: 40px; ">
            登陆/注册
          </Button>
        </div>
      </div>

    </div>
  </div>
</template>
<script setup lang="ts">
import {
  DownOutlined,
  TeamOutlined,
  WarningOutlined,
  HistoryOutlined,
  CodeSandboxOutlined,
  BulbOutlined
} from "@ant-design/icons-vue";
import {Dropdown, Menu, MenuItem, Tag, Divider, Button, Spin, Skeleton} from "ant-design-vue";
import {QuestionSubmitAddRequest, QuestionSubmitControllerService} from "../../generated";
import {toRefs, defineProps, ref} from "vue";
import {onMounted} from "@vue/runtime-core";
import {useStore} from "vuex";
import moment from "moment/moment";
import {useRouter} from "vue-router";
import message from "@arco-design/web-vue/es/message";

const props = defineProps({
  submitId: String,
  status: Boolean,
  questionId: String
})
const {submitId, status, questionId} = toRefs(props) ?? ''
const spinning = ref(true)
const back = ref(false)

const store = useStore()
const userId = store.state.user.loginUser.id
const getAllSubmitRecordsSearchParams = ref({
  current: 1,
  pageSize: 1000,
  userId: userId,
  sortOrder: 'descend',
  sortField: 'createTime',
  questionId: questionId
})
const submitRecord = ref({})
const getSubmitRecordById = async () => {

  const res = await QuestionSubmitControllerService.getSubmitResultUsingPost(submitId?.value as any)
  submitRecord.value = res.data

}
const router = useRouter()
const toLoginView = () => {
  router.push('/user/login')
}
const allSubmitRecords = ref([])

const getAllSubmitRecords = async () => {
  if (store.state.user.loginUser.userName === '未登录') {
    message.error("未登录")
    await router.push('/user/login')
    return false
  }
  const res = await QuestionSubmitControllerService.listQuestionSubmitByPageUsingPost(getAllSubmitRecordsSearchParams.value as any)
  spinning.value = false
  allSubmitRecords.value = res.data.records ?? []

  return true
}

const backAllRecords = () => {

  status.value = true

}
onMounted(() => {
  getAllSubmitRecords()
  getSubmitRecordById()
})


</script>
<style scoped>

.recordItem {
  display: flex;
  cursor: pointer;
  margin-bottom: 8px;
  padding: 8px;
  border: 1px solid #e2eff3;
  border-radius: 10px;

}

.backAllRecords {
  cursor: pointer;
}

.backAllRecords:hover {
  color: #000000;
}

.languageSelect:hover {
  background-color: rgba(0, 0, 0, 0);
}

.submissionRecordView {
  padding-left: -20px;

}
</style>
