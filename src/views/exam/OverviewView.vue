<template>
  <div id="overviewView">
    <div style="display: flex; flex-direction: column; align-content: space-between">
      <Card style="display: flex; flex: 1;margin-bottom: 15px; flex-direction: column; padding: 5px" size="small">
        <div style="flex: 1; font-weight: 700; font-size: 0.75rem; margin-bottom: 10px">
          概览
        </div>
        <div style="flex: 3; display: flex">
          <div class="overviewItem" @click="toExamineManageView">
            <div class="itemTitle">
              题目集
              <ReadOutlined  style="float: right; font-size: 18px"/>
            </div>
            <div class="itemNum">
              {{ProblemsCount}}
            </div>
          </div>
          <div class="overviewItem" @click="toQuestionBankView">
            <div class="itemTitle">
              题目
              <BookOutlined style="float: right; font-size: 18px" />
            </div>
            <div class="itemNum">
              {{questionCount}}
            </div>
          </div>
          <div class="overviewItem" @click="toUserGroupView">
            <div class="itemTitle">
              用户组
              <TeamOutlined style="float: right; font-size: 18px  " />
            </div>
            <div class="itemNum">
              {{UserGroupCount}}
            </div>
          </div>
        </div>
      </Card>
      <div style="display: flex;flex: 1;  align-content: space-between">
        <Card class="card" style="display: flex;flex: 1; margin-right: 15px;" size="small">
          <div style="flex: 1; font-weight: 700; font-size: 0.75rem; margin-bottom: 10px">
            最近访问题目集
          </div >
          <div class="problemsItemList">

            <div v-if="questionGroupLatestTime.length > 0" class="problemsItem" v-for="item in questionGroupLatestTime" @click="toExamineManageViewById(item?.id)">
              <FundProjectionScreenOutlined class="problemsItemIcon" />
              <div style="display: flex; flex: 20; flex-direction: column">
                <div style="font-size: 16px">{{ item?.groupName }}</div>
                <div style="color: #737373"> {{moment(item?.latestTime).format("YYYY/MM/DD HH:mm:ss")}}</div>
              </div>
            </div>
            <div v-else>
              <div style="display:flex; justify-content: center; align-items: center; height: 200px">
                <a-empty></a-empty>
              </div>
            </div>
          </div>
        </Card>
        <Card class="card" style="display: flex;flex: 1"  size="small">
          <div  style="flex: 1; font-weight: 700; font-size: 0.75rem; margin-bottom: 10px">
            最近访问项目组
          </div >
          <div class="problemsItemList">
            <div v-if="userGroupLatestTime.length > 0" class="problemsItem" v-for="item in userGroupLatestTime" @click="toUserGroupViewById(item?.id)">
              <TeamOutlined style="color: #FFB800" class="problemsItemIcon"/>
              <div style="display: flex; flex: 20; flex-direction: column">
                <div style="font-size: 16px">{{item?.groupName}}</div>
                <div style="color: #737373">{{moment(item?.latestTime).format("YYYY/MM/DD HH:mm:ss")}}</div>
              </div>
            </div>
            <div v-else>
              <div style="display:flex; justify-content: center; align-items: center; height: 200px">
                <a-empty></a-empty>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {Card} from 'ant-design-vue'
import {ReadOutlined, BookOutlined, TeamOutlined, FundProjectionScreenOutlined} from '@ant-design/icons-vue'
import {useRouter} from "vue-router";
import { IconUserGroup,  } from '@arco-design/web-vue/es/icon';
import {
  QuestionControllerService,
  QuestionGroupControllerService,
  UserGroupControllerService
} from "../../../generated";
import {onMounted} from "@vue/runtime-core";
import {computed, ref} from "vue";
import moment from "moment/moment";
import {useStore} from "vuex";
const router = useRouter()
const emit = defineEmits(['clickChild'])
const toExamineManageView = () => {
  emit('clickChild','2')
  router.push({
    path: '/practice/question/problemsSetView',
    replace: true
  })
}
const toQuestionBankView = () => {
  emit('clickChild','4')
  router.push({
    path: '/practice/question/questionBankListView',
    replace: true
  })
}
const toUserGroupView = () => {
  emit('clickChild','3')
  router.push({
    path: '/practice/question/userGroupView',
    replace: true
  })
}
const store = useStore();
const ProblemsCount = ref()
const getProblemsSetCount = async () => {
  const res =await QuestionGroupControllerService.getQuestionGroupCountUsingGet()
  // const res = await QuestionGroupControllerService.getCountUsingGet()
  ProblemsCount.value = res.data
}
const UserGroupCount = ref()
const getUserGroupCount = async () => {
  const res = await UserGroupControllerService.getUserGroupCountUsingGet()
  // const res = await UserGroupControllerService.getCountUsingGet1()
  UserGroupCount.value = res.data
}
const questionCount = ref()
const getQuestionCount = async () => {
  const res = await QuestionControllerService.getQuestionCountUsingGet()
  questionCount.value = res.data
}
const questionGroupLatestTime = ref([])
const userGroupLatestTime = ref([])
const getQuestionGroupListByLatestTime = async () => {
  const res = await QuestionGroupControllerService.listQuestionGroupByPageUsingPost({
    sortField: 'latestTime',
    sortOrder: "descend",
    current: 1,
    pageSize: 3,
  })

  if (res.code === 0) {
    questionGroupLatestTime.value = res.data.records
  }
}
const getUserGroupListByLatestTime = async () => {
  const res = await UserGroupControllerService.listUserGroupByPageUsingPost({
    sortField: 'latestTime',
    sortOrder: "descend",
    current: 1,
    pageSize: 3,
  })

  if (res.code === 0) {
    userGroupLatestTime.value = res.data.records
  }
}
const toExamineManageViewById = (id: number) => {
  router.push({
    path: `/practice/question/problemsSetView/examineManageView/${id}`
  })
}
const toUserGroupViewById = (id: number) => {
  router.push({
    path: `/practice/question/userGroupView/userGroupDetailsView/${id}`
  })
}
onMounted(() => {
  getProblemsSetCount()
  getUserGroupCount()
  getQuestionGroupListByLatestTime()
  getUserGroupListByLatestTime()
  getQuestionCount()
})

</script>

<style scoped>
#overviewView {
  height: 100vh;
}
:where(.css-dev-only-do-not-override-1hsjdkk).ant-card .ant-card-body {
  padding: 10px !important;
}
.overviewItem {
  flex: 1; height: 80px; border-radius: 10px; background-color:#f6f7f9;
  margin-right: 15px;
  padding: 10px;
  cursor: pointer;

}
.overviewItem:last-child {
  margin-right: 0;
}
.problemsItemList {
  flex: 3; display: flex; flex-direction: column;
}
.problemsItem {
  display:flex; cursor: pointer;flex: auto;
  margin-bottom: 8px;
  padding: 8px;
}
.problemsItem:last-child {
  margin-bottom: 0;
}
.problemsItem:hover {
  background-color: hsl(211, 20%, 97%);
  border-radius: 10px;
}
.problemsItemIcon {
  display:flex; flex: 1; font-size: 24px; align-items: center; margin: 0 10px 0 5px
}
.itemTitle {

  font-size: 16px;
  color: #737373;
}
.itemNum {
  font-weight: 700;
  font-size: 24px;
  color: #1a1a1a;
  font-family: 'JBMono', ui-monospace, SFMono-Regular, Menlo,
  Monaco, Consolas, "Liberation Mono",
  "Courier New", 'Harmony', ui-sans-serif, system-ui,
  -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
  "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
  "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}
.fontFamily {
  font-family: 'JBMono', ui-monospace, SFMono-Regular, Menlo,
  Monaco, Consolas, "Liberation Mono",
  "Courier New", 'Harmony', ui-sans-serif, system-ui,
  -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
  "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
  "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}

</style>

<style>
:where(.css-dev-only-do-not-override-1hsjdkk).ant-card-small >.ant-card-body {
  width: 100%;
}
</style>