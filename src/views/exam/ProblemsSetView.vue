<template>
  <div id="problemSetView">
    <div style="margin-bottom: 10px">
      <div style="display: inline-block; ">
        <Dropdown trigger="click" style="width: 200px; background-color:#fff;">
          <template #overlay>
            <Menu @click="selectStatus">
              <MenuItem key="全部状态">
                全部状态
              </MenuItem>
              <MenuItem key="已开放">
                已开放
              </MenuItem>
              <MenuItem key="已关闭">
                已关闭
              </MenuItem>
              <MenuItem key="草稿">
                草稿
              </MenuItem>
            </Menu>
          </template>
          <Button style="width: 200px; display: flex; justify-content: space-between; align-items: center">
            {{ status }}
            <DownOutlined/>
          </Button>
        </Dropdown>
      </div>
      <div style="display: inline-block; float: right; margin-bottom: 10px">
        <InputSearch
            v-model:value="searchParams.groupName"
            placeholder="请输入题目集名称!"
            enter-button
            @search="onSearch"
            style="min-width: 300px"
        />
      </div>
      <div style="margin-top: 10px">
        <aButton @click="showModal" style="border-radius: 3px; margin-left: 3px" type="primary">创建题目集</aButton>
      </div>
    </div>
    <Modal v-model:open="open" title="创建题目集" @ok="handleOk" style="width: 50vw; ">
      <div style="padding-right: 50px; padding-top: 20px">
        <Form
            name="basic"
            :label-col="{ span: 3 }"
            :wrapper-col="{ span: 16 }"
            autocomplete="off"
            label-align="right"
            style="font-size: 20px"
        >
          <FormItem label="题目集名称" name="title">
            <Input size="middle" placeholder="题目集名称" :style="{width:'650px'}"   v-model:value="form.groupName"/>
          </FormItem>
          <FormItem label="时间设置" name="timeConfig">
            <RadioGroup v-model:value="value1" button-style="solid">
              <RadioButton value="after">稍后设置 <strong>(创建草稿)</strong></RadioButton>
              <RadioButton value="now">现在设置</RadioButton>
            </RadioGroup>
          </FormItem>
          <FormItem v-if="value1 === 'now'" label="开始时间" name="startTime">
            <arcoDatePicker :locale="locale" @ok="startTimeOk" @change="startTimeChange" show-time v-model:value="startTime1" style="margin-right: 10px"  />
          </FormItem>
          <FormItem v-if="value1 === 'now'" label="结束时间" name="endTime">
            <arcoDatePicker :locale="locale" @ok="endTimeOk" @change="endTimeChange" show-time v-model:value="endTime1" style="margin-right: 10px" />
          </FormItem>
          <FormItem v-if="value1 === 'now'" label="时长" name="timeLimit">
            <Input v-model:value="timeSearchParams.limitTime" suffix="分钟" :style="{width:'650px'}" ></Input>
          </FormItem>
        </Form>
      </div>
      <template #footer>
        <aButton key="back" @click="handleCancel">取消</aButton>
        <aButton key="submit" type="primary"  @click="handleOk">提交</aButton>
      </template>
    </Modal>
    <Card size="small" style="height: 100%; ">
      <div class="problemsItemList" style="height: 100%">

        <div v-if="dataList.length > 0" class="problemsItem" v-for="i in dataList" >
          <FundProjectionScreenOutlined class="problemsItemIcon"/>
          <div style="display: flex; flex: 40; flex-direction: column; " @click="toExamineManageView(i.id)">
            <div style="font-size: 16px">{{ i?.groupName }}</div>
            <div v-if="i.actionTime === null" style="color: #737373">草稿</div>
            <div v-else style="color: #737373">{{ moment(i?.actionTime).format("YYYY/MM/DD HH:mm:ss") }} - {{ moment(i?.endTime).format("YYYY/MM/DD HH:mm:ss") }} </div>
          </div>
          <div style="display: flex; align-items: center; margin-right: 20px; border-radius: 15px; z-index: 100">
            <Button @click="deleteQuestionGroup(i.id)" type="primary" style="width: 80px">删除</Button>
          </div>
          <div style="display: flex; align-items: center">
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
        </div>
        <div v-else>
          <div style="font-size: 20px; display: flex; justify-content: center; align-items: center; height: 400px">
            <a-space>
              <WarningOutlined style="color: red; font-size: 30px ;font-weight: 700" />
              当前暂无题目集, 请创建!
            </a-space>
          </div>
        </div>
      </div>
    </Card>
    <Pagination
        v-model:current="searchParams.current"
        v-model:page-size="searchParams.pageSize"
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

  </div>
</template>

<script setup lang="ts">

import {
  Dropdown,
  Menu,
  MenuItem,
  Button,
  MenuProps,
  InputSearch,
  Card,
  Pagination,
  Button as aButton,
  Modal,
  Form, Input, FormItem, RadioGroup, RadioButton, DatePicker, TimePicker,
} from "ant-design-vue";
import {DownOutlined, FundProjectionScreenOutlined, WarningOutlined} from "@ant-design/icons-vue";
import { DatePicker as arcoDatePicker } from '@arco-design/web-vue'
import {ref} from "vue";
import dayjs, {Dayjs} from 'dayjs'
import {useRouter} from "vue-router";
import {QuestionGroupControllerService} from "../../../generated";
import {onMounted} from "@vue/runtime-core";
import message from "@arco-design/web-vue/es/message";
import moment from "moment/moment";
const now = new Date()
const year = now.getFullYear()
const month = now.getMonth() + 1 > 9 ? now.getMonth() + 1 : '0' + (now.getMonth() + 1)
const hours = now.getHours() > 9 ? now.getHours() : '0' + now.getHours()
const hours2 = now.getHours() + 2 > 24 ? 24 - now.getHours() + 2 : (now.getHours() > 8 ? now.getHours() + 2 : '0' + (now.getHours() + 2))
const minutes = now.getMinutes() > 9 ? now.getMinutes() : '0' + now.getMinutes()
const day = now.getDate() > 9 ? now.getDate() : '0' + now.getDate()
console.log(dayjs())
const startTime1 = ref<Dayjs>(dayjs())
const endTime1 = ref<Dayjs>(dayjs())
const status = ref('全部状态')
const total = ref(20)
const router = useRouter()
const value1 = ref('after')
const searchParams = ref({
  groupName: '',
  current: 1,
  pageSize: 10,
  status: -1
})
// const timeLimit = ref(endTime1.value.diff(startTime1.value, 'minute'))
import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';

const form = ref({
  groupName: '',
})
const timeSearchParams = ref({
  groupName: form.value.groupName,
  status: -1,
  limitTime: 0,
  actionTime: new Date().getTime() as any,
  endTime: new Date().getTime() as any,
})
const startTimeOk = (value: Dayjs) => {
  alert(value)
  timeSearchParams.value.actionTime = new Date(value.toString()).getTime() as any
  timeSearchParams.value.limitTime = ((timeSearchParams.value.endTime - timeSearchParams.value.actionTime) / 60000).toFixed(0) as any
}
const deleteQuestionGroup = async (id: number) => {
  const res = await QuestionGroupControllerService.deleteQuestionGroupUsingPost({
    id: id
  })
  if(res.code === 0){
    message.success('删除成功')
  }else {
    message.error(res.message)
  }
  await loadData()
}
const startTimeChange = (value: Dayjs) => {
  startTime1.value = value
  timeSearchParams.value.actionTime = new Date(value.toString()).getTime() as any
}
const endTimeChange = (value: Dayjs) => {
  endTime1.value = value
  timeSearchParams.value.endTime = new Date(value.toString()).getTime() as any
}
const endTimeOk = (value: Dayjs) => {
  endTime1.value = value
  timeSearchParams.value.endTime = new Date(value.toString()).getTime() as any
  timeSearchParams.value.limitTime = ((timeSearchParams.value.endTime - timeSearchParams.value.actionTime) / 60000).toFixed(0) as any
}
const handleCancel = () => {
  open.value = false
}
const open = ref<boolean>(false);
// 分页参数
const pageSizeOptions = ref<string[]>(['10', '20', '30', '40', '50']);
const selectStatus: MenuProps['onClick'] = e => {
  status.value = e.key as string
  searchParams.value.status = e.key === '全部状态'? -1 : (e.key === '已开放'? 1 : (e.key === '已关闭'? 2 : 0))
  loadData()
}
const onSearch = () => {
  loadData()
}
const showModal = () => {
  open.value = true;
}
const handleOk = async (e: MouseEvent) => {

  if (value1.value === 'now') {
    timeSearchParams.value.groupName = form.value.groupName

    const res = await QuestionGroupControllerService.addQuestionGroupUsingPost(timeSearchParams.value)
    if (res.code === 0) {
      message.success('创建成功')
      await loadData()
    }else {
      message.error(res.message)
    }
  }else {
    const res = await QuestionGroupControllerService.addQuestionGroupUsingPost(form.value
    )
    if (res.code === 0) {
      message.success('创建成功')
      await loadData()
    }else {
      message.error(res.message)
    }
  }
  open.value = false;
};
const dataList = ref<any[]>([]);
const onShowSizeChange = (current: number, pageSize: number) => {
  searchParams.value.pageSize = pageSize;
  // loadData()
};
const pageChange = () => {
  loadData()
}
const toExamineManageView = (id: number) => {
  router.push({
    path: `/practice/question/problemsSetView/examineManageView/${id}`
  })
}

const loadData = async () => {
  // 加载数据
  const res = await QuestionGroupControllerService.listQuestionGroupByPageUsingPost(searchParams.value);
  if (res.code === 0) {
    total.value = res.data.total
    dataList.value = res.data.records
    console.log("当前数据" + dataList.value)
  } else {
    message.error(res.message)
  }
}
onMounted(() => {
  loadData()
})
</script>
<style>
#problemSetView {

}
</style>
<style scoped>

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