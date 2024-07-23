<template>
  <div class="userExamQuestionView">
    <div>
      <Card size="small" style="height: 100%; ">
        <div class="problemsItemList" style="height: 100%">
          <div v-if="allQuestionGroups.length === 0" style="margin-top: 100px">
            <AEmpty></AEmpty>
          </div>
          <div v-else class="problemsItem" v-for="(i, index) in allQuestionGroups" >
            <FundProjectionScreenOutlined class="problemsItemIcon"/>
            <div style="display: flex; flex: 40; flex-direction: column">
              <div style="font-size: 16px">{{ i?.groupName }}</div>
              <div style="color: #737373">{{ moment(i?.actionTime).format("YYYY/MM/DD HH:mm:ss") }} - {{ moment(i?.endTime).format("YYYY/MM/DD HH:mm:ss") }} </div>
            </div>
            <div style="display: flex; align-items: center; margin-right: 30px" v-if="i.status === 1">
              <Button @click="toExam(i)" type="primary">去考试</Button>
            </div>
            <div style="display: flex; align-items: center; flex-direction: column; justify-content: center">
              <div>
                <div v-if="i.status === 0" style="display: flex; justify-content: center; align-items: center; width: 60px; height: 25px; text-align: center; border-radius: 10px; background-color: #ece6e6; color: #a9a6a6; margin-right: 10px">

                  草稿
                </div>
                <div v-else-if="i.status === 1" style="display: flex; justify-content: center; align-items: center; width: 60px; height: 25px; text-align: center; border-radius: 10px; background-color: #ece6e6; color: #a9a6a6; margin-right: 10px">
                  已开放
                </div>
                <div v-else-if="i.status === 2" style="display: flex; justify-content: center; align-items: center; width: 60px; height: 25px; text-align: center; border-radius: 10px; background-color: #ece6e6; color: #a9a6a6; margin-right: 10px">
                  已关闭
                </div>
                <div v-else-if="i.status === 3" style="display: flex; justify-content: center; align-items: center; width: 60px; height: 25px; text-align: center; border-radius: 10px; background-color: #ece6e6; color: #a9a6a6; margin-right: 10px">
                  未开放
                </div>
              </div>
              <div style="display: flex; align-items: center; margin-top: 5px; margin-right: 10px">
                <IconUser />
                {{userName[index]}}
              </div>

            </div>
          </div>

        </div>
        <Pagination
            v-model:current="allQuestionGroupsSearchParams.current"
            v-model:page-size="allQuestionGroupsSearchParams.pageSize"
            :page-size-options="pageSizeOptions"
            :total="total"
            show-size-changer
            @showSizeChange="onShowSizeChange"
            @change="pageChange"
            style="text-align: right; margin-top: 10px"
        >
          <template #buildOptionText="props">
            <span>{{ props.value }}条/页</span>
          </template>
        </Pagination>
      </Card>

    </div>
  </div>
</template>

<script setup lang="ts">
// TODO: 获取指定用户的题目集
import {ExamControllerService, QuestionGroupControllerService, UserControllerService} from "../../../generated";
import {computed, ref} from "vue";
import {onMounted} from "@vue/runtime-core";
import moment from "moment";
import {FundProjectionScreenOutlined,UserOutlined} from "@ant-design/icons-vue";
import {Card, Button, Pagination} from "ant-design-vue";
import {IconUser} from '@arco-design/web-vue/es/icon'
import {useRouter} from "vue-router";
import message from "@arco-design/web-vue/es/message";
const pageSizeOptions = ref<string[]>(['10', '20', '30', '40', '50']);
const allQuestionGroupsSearchParams = ref({
  current: 1,
  pageSize: 10,
  sortOrder: 'descend',
  sortField: 'status'
})
const router = useRouter()
const total = ref(0)
const allQuestionGroups = ref([])
const getAllQuestionGroups = async () => {
  const res = await UserControllerService.getNowQuestionGroupUsingGet()
  // const res = await QuestionGroupControllerService.listQuestionGroupByPageUsingPost(allQuestionGroupsSearchParams.value)
  allQuestionGroups.value = res?.data as any
  // total.value = res?.data?.total ?? 0
  allQuestionGroups.value.forEach(i => {
    getCurrentQuestionGroupByUser(i?.userId ?? '')
  })
  UserControllerService.getUserQuestionGroupUsingGet()
}
const userName = ref([] as any[])
const getCurrentQuestionGroupByUser = async(userId: any) => {
  const res = await UserControllerService.getUserVoByIdUsingGet(userId as any)
  userName.value.push(res?.data?.userName ?? '')
}

const pageChange = () => {
  getAllQuestionGroups()
}
const onShowSizeChange = (current: number, pageSize: number) => {
  console.log(current, pageSize);
  allQuestionGroupsSearchParams.value.pageSize = pageSize;
  getAllQuestionGroups()
};
const toExam = async (i: any) => {

  const res = await ExamControllerService.startExamUsingPost(i.id)
  if (res?.code === 40300) {
    message.error(res?.message)
  }else {
    await router.push({
      path: `/examine/doExamine/${i.id}`,
      query: {
        examId: res?.data
      }
    })
  }

}
onMounted(() => {
  getAllQuestionGroups()
})
</script>

<style scoped>
.userExamQuestionView {
  padding: 20px 200px;
}
.problemsItemList {
  flex: 3;
  display: flex;
  flex-direction: column;
}

.problemsItem {
  display: flex;
  cursor: pointer;
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
  display: flex;
  flex: 1;
  font-size: 24px;
  align-items: center;
  margin: 0 10px 0 5px
}
</style>