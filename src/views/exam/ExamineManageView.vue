<template>
  <div id="examineManageView">
    <div
        style="box-shadow: 0 2px 6px rgba(225,207,207,0.06),0 4px 8px rgba(231,218,218,0.06),0 6px 12px rgba(218,205,205,0.06); display: flex; justify-content: space-between; background-color:#fff; padding: 20px; border-radius: 10px">
      <div style="display:flex; flex: 1">
        <Button type="primary" @click="toExamineDetailView" style="font-weight: 500">进入题目集</Button>
      </div>
      <div style=" float: right">
        <a-space style="display: flex" size="large">
          <div style="display: flex; flex-direction: column">
            <div style="color: #737373">用户组</div>
            <div style="font-size: 18px; text-align: right">{{questionGroups.length}}</div>
          </div>
          <div style="display: flex; flex-direction: column">
            <div style="color: #737373">试卷总分</div>
            <div style="font-size: 18px; text-align: right; color: #404040">{{questionScore}}</div>
          </div>
        </a-space>
      </div>

    </div>
    <div style="display: flex; margin-top: 20px">
      <div style="display: flex; flex: 7; flex-direction: column">
        <div
            style="box-shadow: 0 2px 6px rgba(225,207,207,0.06),0 4px 8px rgba(231,218,218,0.06),0 6px 12px rgba(218,205,205,0.06); display: flex; flex-direction: column; padding: 20px; border-radius: 10px;background-color:#fff;">
          <div style="display: flex; flex: 1; justify-content: space-between">
            <div style="font-size: 16px">试卷</div>
            <div style="font-size: 14px">
              <a-space style="color: hsl(212, 89%, 53%)">
                <span @click="toExamineManageEditView" style="cursor: pointer">编辑</span>
<!--                <span>分享</span>-->
<!--                <span>预览</span>-->
              </a-space>
            </div>
          </div>
          <div v-if="questionGroups.length > 0" style="margin-top: 10px">
            <div style="background: #f6f7f9; padding: 10px;height: 60px; border-radius: 10px; justify-content: space-between; display: flex; align-items: center">
              <div style="font-size: 16px; font-weight: 500">
                编程题
              </div>
              <div style="display: flex">
                <div style="margin-right: 50px; font-size: 16px; color: #737373">{{questionGroups.length}} 题</div>
                <div style="font-size: 16px; color: #737373">{{questionScore}} 分</div>
              </div>
            </div>
          </div>
          <div v-else
              style="display: flex; flex: 9; margin-top: 20px;justify-content: center;flex-direction: column; padding: 20px 0 10px 0;">
            <div style="display: flex; flex: 1; font-size: 18px; color: #737373; justify-content: center">无题目</div>
            <div @click="toExamineManageEditView" style="cursor: pointer; display: flex; flex: 1;font-size: 14px; color: hsl(212, 89%, 53%); justify-content: center">
              编辑
            </div>
          </div>

        </div>
        <div
            style="box-shadow: 0 2px 6px rgba(225,207,207,0.06),0 4px 8px rgba(231,218,218,0.06),0 6px 12px rgba(218,205,205,0.06); display: flex; flex-direction: column; padding: 20px; border-radius: 10px;background-color:#fff; margin-top: 20px">
          <div style="display: flex; flex: 1; justify-content: space-between">
            <div style="font-size: 16px">
              考生
              <div style="font-size: 14px; color: #737373">设置题目集关联用户组的考生授权</div>
            </div>
            <div style="font-size: 14px">
              <a-space style="color: hsl(212, 89%, 53%)">
                <span style="cursor: pointer" @click="addUserGroup">添加授权</span>
              </a-space>
            </div>
          </div>
          <div v-if="existedUserGroups.length > 0">
            <div v-for="item in existedUserGroups">
              <div style="background: #f6f7f9; margin-top: 10px; padding: 10px;height: 60px; border-radius: 10px; justify-content: space-between; display: flex; align-items: center">
                <div style="font-size: 16px; font-weight: 500">
                  {{item?.groupName}}
                </div>
                <div style="display: flex; align-items: center">
                  <div style="margin-right: 50px; font-size: 16px; color: #000000">{{item?.userVOList.length}}
                    <span style="color: #737373; font-size: 14px">人</span>
                  </div>
                  <div>
                    <Button type="primary" @click="deleteUserGroup(item.id)">删除</Button>
                  </div>
                </div>
              </div>
            </div>

          </div>
          <div v-else
              style="display: flex; flex: 9; margin-top: 20px;justify-content: center;flex-direction: column; padding: 20px 0 10px 0;">
            <div style="display: flex; flex: 1; font-size: 20px; color: #737373; justify-content: center">暂无授权</div>
            <!--            <div style="display: flex; flex: 1;font-size: 14px; color: hsl(212, 89%, 53%); justify-content: center">编辑</div>-->
          </div>
        </div>
        <div
            style="box-shadow: 0 2px 6px rgba(225,207,207,0.06),0 4px 8px rgba(231,218,218,0.06),0 6px 12px rgba(218,205,205,0.06); display: flex; flex-direction: column; padding: 20px; border-radius: 10px;background-color:#fff; margin-top: 20px">
          <div style="display: flex; flex: 1; justify-content: space-between; margin-bottom: 20px">
            <div style="font-size: 16px">
              考试公告
              <div style="font-size: 14px; color: #737373">考生开考后才可见</div>
            </div>
            <div style="font-size: 14px">
              <a-space style="color: hsl(212, 89%, 53%); cursor:pointer;" @click="showAnnouncementModal">
                <span >编辑</span>
              </a-space>
            </div>
          </div>
          <div v-if="showAnnouncementContent != ''">
            <MdViewer :value="showAnnouncementContent"></MdViewer>

          </div>
          <div v-else
              style="display: flex; flex: 9; margin-top: 20px;justify-content: center;flex-direction: column; padding: 20px 0 10px 0;">
            <div style="display: flex; flex: 1; font-size: 20px; color: #737373; justify-content: center">无公告</div>
          </div>
        </div>
        <div
            style="box-shadow: 0 2px 6px rgba(225,207,207,0.06),0 4px 8px rgba(231,218,218,0.06),0 6px 12px rgba(218,205,205,0.06); display: flex; flex-direction: column; padding: 20px; border-radius: 10px;background-color:#fff; margin-top: 20px">
          <div style="display: flex; flex: 1; justify-content: space-between; margin-bottom: 20px">
            <div style="font-size: 16px">
              考试说明
              <div style="font-size: 14px; color: #737373">考生开考前可见</div>
            </div>
            <div  style="font-size: 14px; cursor: pointer">
              <a-space style="color: hsl(212, 89%, 53%); cursor:pointer;" @click="showDescriptionModal">
                <span>编辑</span>
              </a-space>
            </div>
          </div>
          <div v-if="showDescriptionContent != ''">
            <MdViewer :value="showDescriptionContent"></MdViewer>
          </div>
          <div v-else
              style="display: flex; flex: 9; margin-top: 20px;justify-content: center;flex-direction: column; padding: 20px 0 10px 0;">
            <div style="display: flex; flex: 1; font-size: 20px; color: #737373; justify-content: center">无说明</div>
            <!--            <div style="display: flex; flex: 1;font-size: 14px; color: hsl(212, 89%, 53%); justify-content: center">编辑</div>-->
          </div>
        </div>
      </div>
      <div style="display: flex; flex: 3; flex-direction: column">
        <div
            style="box-shadow: 0 2px 6px rgba(225,207,207,0.06),0 4px 8px rgba(231,218,218,0.06),0 6px 12px rgba(218,205,205,0.06); display: flex; flex-direction: column; padding: 20px; border-radius: 10px;background-color:#fff; margin-left: 20px">
          <div style="display: flex; flex: 1; justify-content: space-between">
            <div style="font-size: 16px">时间线</div>
            <div style="font-size: 14px">
              <a-space style="color: hsl(212, 89%, 53%)">
                <span @click="updateExamTime" style="cursor: pointer">修改</span>
              </a-space>
            </div>
          </div>
          <div
              style="display: flex; flex: 9; margin-top: 20px;justify-content: center;flex-direction: column; padding: 20px 0 10px 0;">
            <div style="display: flex; justify-content: center;">
              <a-timeline style="max-width: 350px" :label-position="'relative'">
                <a-timeline-item>
                  <template #label>
                    <div style="font-size: 14px; width: 90px; text-align: left; margin-left: -8px; margin-top: -3px">
                      {{  moment(actionTime).format("YYYY/MM/DD HH:mm:ss") }}
                    </div>
                  </template>
                  <template #dot>
                    <CheckCircleFilled :style="{ fontSize: '16px', color: 'rgb(96, 192, 48)' }"/>

                  </template>
                  <div style="font-size: 16px; margin-top: -10px">
                    开始时间
                  </div>
                  <div style="color: #737373">
                    题目集开放考生可以开考，考生开考后无法修改开放时间
                  </div>
                </a-timeline-item>
                <a-timeline-item>
                  <template #label>
                    <div style="font-size: 14px; width: 90px; text-align: left; margin-left: -8px; margin-top: -3px">
                      {{ moment(endTime).format("YYYY/MM/DD HH:mm:ss") }}
                    </div>
                  </template>
                  <template #dot>
                    <CheckCircleFilled :style="{ fontSize: '16px', color: '#F53F3F' }"/>
                  </template>
                  <div style="font-size: 16px; margin-top: -10px">
                    关闭时间
                  </div>
                  <div style="color: #737373">
                    题题目集关闭后考生无法继续答题
                  </div>
                </a-timeline-item>
              </a-timeline>
            </div>
            <div style="display: flex; justify-content: space-between">
              <div style="font-size: 16px">
                答题时长限制
              </div>
              <div style="font-size: 16px; color: #737373">
                {{timeLimit}}分钟
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <Modal v-model:open="open" title="添加授权"  @ok="handleOk" style="width: 50vw; ">
        <div style="padding-right: 10px; padding-top: 20px">
          <Form
              name="basic"
              :label-col="{ span: 3 }"
              :wrapper-col="{ span: 16 }"
              autocomplete="off"
              label-align="right"
              style="font-size: 20px"
          >
            <div v-for="(item, index) in userGroups" style="display:flex; justify-content: space-between; align-items: center; padding-left: 10px">
              <div style="height: 60px; padding: 10px 0 10px 0; margin: 10px 0 10px 0" class="selectDiv">
                <Checkbox @change="addUserGroupToExam(item)"
                          :default-checked="userGroupIds.includes(item.id) ?? false"
                          :disabled="userGroupIds.includes(item.id)"
                          style="margin-left: 20px">
                  <a-space>
                    <icon-code style="font-size: 24px;flex: 1; padding: 0;color: rgb(133 80% 35%); margin-left: 20px"></icon-code>
                    <div style="display: flex; justify-content: space-between;  flex-direction: column">
                      <div>
                        {{ item?.groupName }}
                      </div>
                      <div>
                        {{item?.description}}
                      </div>
                    </div>
                  </a-space>
                </Checkbox>
              </div>
              <div>
              </div>
            </div>
          </Form>
          <div style="display: flex; justify-content: space-between; align-items: baseline; margin-top: 10px">
            <span style="font-size: 16px"> 共 {{ total }} 题</span>
            <Pagination
                v-model:current="allUserGroupsSearchParams.current"
                v-model:page-size="allUserGroupsSearchParams.pageSize"
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
        </div>
        <template #footer>
          <Button key="back" @click="handleCancel">取消</Button>
          <Button key="submit" type="primary" @click="handleOk">提交</Button>
        </template>
      </Modal>
      <Modal v-model:open="AnnouncementModal" title="编辑公告" @ok="AddOrEditAnnouncement" style="width: 50vw; ">
        <div>
          <MdEditor v-model:value="Announcement" :handle-change="onAnnouncementChange"></MdEditor>
        </div>
        <template #footer>
          <Button key="back" @click="AnnouncementCancel">取消</Button>
          <Button key="submit" type="primary" @click="AddOrEditAnnouncement">提交</Button>
        </template>
      </Modal>
      <Modal v-model:open="DescriptionModal" title="编辑说明" @ok="AddOrEditDescription" style="width: 50vw; ">
        <div>
          <MdEditor v-model:value="Description" :handle-change="onDescriptionChange"></MdEditor>
        </div>
        <template #footer>
          <Button key="back" @click="DescriptionCancel">取消</Button>
          <Button key="submit" type="primary" @click="AddOrEditDescription">提交</Button>
        </template>
      </Modal>
      <Modal v-model:open="updateExamTimeFlag" title="修改考试时间" @ok="updateExamTimeOk" style="width: 30vw; ">
        <div style="display: flex; flex-direction: column; justify-content: center">
          <FormItem  label="开始时间" name="startTime">
            <arcoDatePicker :locale="locale" @ok="startTimeOk" @change="startTimeChange" show-time v-model:value="startTime1" style="margin-right: 10px"  />
          </FormItem>
          <FormItem  label="结束时间" name="endTime">
            <arcoDatePicker :locale="locale" @ok="endTimeOk" @change="endTimeChange" show-time v-model:value="endTime1" style="margin-right: 10px" />
          </FormItem>
          <FormItem  label="时长" name="timeLimit">
            <Input v-model:value="timeSearchParams.limitTime" suffix="分钟" :style="{width:'250px'}" ></Input>
          </FormItem>
        </div>
        <template #footer>
          <Button key="back" @click="updateExamTimeCancel">取消</Button>
          <Button key="submit" type="primary" @click="updateExamTimeOk">提交</Button>
        </template>
      </Modal>
    </div>

  </div>
</template>

<script setup lang="ts">
import {
  Button,
  DatePicker, Dropdown, Form,
  FormItem,
  Input, Menu, MenuItem, type MenuProps,
  Modal,
  RadioButton, RadioGroup, Tag,
  Timeline,
  TimelineItem,
  TimePicker, Card, Pagination
} from 'ant-design-vue'
import {
  CheckCircleFilled,

} from '@ant-design/icons-vue'
import {Checkbox, Timeline as Tl, TimelineItem as Tli} from '@arco-design/web-vue'
import {useRouter} from "vue-router";
import {computed, ref} from "vue";
import {QuestionGroupControllerService, UserGroupControllerService} from "../../../generated";
import {useStore} from "vuex";
import {onMounted} from "@vue/runtime-core";
import {IconCode} from "@arco-design/web-vue/es/icon";
import message from "@arco-design/web-vue/es/message";
import MdEditor from "@/components/MdEditor.vue";
import MdViewer from "@/components/MdViewer.vue";
import moment from "moment/moment";
import dayjs, {Dayjs} from "dayjs";
import { DatePicker as arcoDatePicker } from '@arco-design/web-vue'
import locale from "ant-design-vue/es/date-picker/locale/zh_CN";
const store = useStore()
const router = useRouter()
interface Props {
  id: any
}
const props = withDefaults(defineProps<Props>(), {
  id: () => ""
})
const toExamineDetailView = () => {
  router.push({
    path: `/practice/question/examineDetailView/${props.id}`
  })
}



const updateExamTimeFlag = ref(false)

const now = new Date()
const year = now.getFullYear()
const month = now.getMonth() + 1 > 9 ? now.getMonth() + 1 : '0' + (now.getMonth() + 1)
const hours = now.getHours() > 9 ? now.getHours() : '0' + now.getHours()
const hours2 = now.getHours() + 2 > 24 ? 24 - now.getHours() + 2 : (now.getHours() > 8 ? now.getHours() + 2 : '0' + (now.getHours() + 2))
const minutes = now.getMinutes() > 9 ? now.getMinutes() : '0' + now.getMinutes()
const day = now.getDate() > 9 ? now.getDate() : '0' + now.getDate()

const updateActionTime = ref<Dayjs>(dayjs(year + '-' + month + '-' + day + 'T' + hours + ':' + minutes + ':' + '00', 'YYYY-MM-DD HH:mm:ss'))
const updateEndTime = ref<Dayjs>(dayjs(year + '-' + month + '-' + day + 'T' + hours2 + ':' + minutes + ':' + '00', 'YYYY-MM-DD HH:mm:ss'))
const updateTimeLimit = ref(0)
const startTime1 = ref<Dayjs>(dayjs())
const endTime1 = ref<Dayjs>(dayjs())

const updateExamTime = () => {
  updateExamTimeFlag.value = true
}
const timeSearchParams = ref({
  id: props.id,
  limitTime: 0,
  actionTime: new Date().getTime() as any,
  endTime: new Date().getTime() as any,
})
const startTimeOk = (value: Dayjs) => {
  alert(value)
  timeSearchParams.value.actionTime = new Date(value.toString()).getTime() as number
  timeSearchParams.value.limitTime = ((timeSearchParams.value.endTime - timeSearchParams.value.actionTime) / 60000).toFixed(0) as any
}
const endTimeOk = (value: Dayjs) => {
  endTime1.value = value
  timeSearchParams.value.endTime = new Date(value.toString()).getTime() as number
  timeSearchParams.value.limitTime = ((timeSearchParams.value.endTime - timeSearchParams.value.actionTime) / 60000).toFixed(0) as any
}
const startTimeChange = (value: Dayjs) => {
  startTime1.value = value
  timeSearchParams.value.actionTime = new Date(value.toString()).getTime() as any
}
const endTimeChange = (value: Dayjs) => {
  endTime1.value = value
  timeSearchParams.value.endTime = new Date(value.toString()).getTime() as any
}
const updateExamTimeOk = async () => {

  const res = await QuestionGroupControllerService.updateQuestionGroupTimeUsingPost(timeSearchParams.value)
  if (res.code === 0) {
    message.success("修改成功")
    updateExamTimeFlag.value = false
  }else {
    message.error("修改失败")
    updateExamTimeFlag.value = false
  }
  await loadExamine()
}
const updateExamTimeCancel = () => {
  updateExamTimeFlag.value = false
}


const pageSizeOptions = ref<string[]>(['10', '20', '30', '40', '50']);
const allUserGroupsSearchParams = ref({
  current: 1,
  pageSize: 10,
})
const deleteUserGroup = async (id: any) => {
  const res = await QuestionGroupControllerService.deleteUserGroupUsingPost(props.id, [id])

  if(res.code === 0) {
    message.success("删除成功")
    userGroupIds.value = []
    needAddUserGroup.value = []
    userGroups.value = []
  }else {
    message.error("删除失败", res.message)
  }
  await loadExamine()
  await loadUserGroup()

}

const AnnouncementModal = ref(false)
const DescriptionModal = ref(false)

const showAnnouncementModal = () => {
  AnnouncementModal.value = true
}
const showDescriptionModal = () => {
  DescriptionModal.value = true
}
const AddOrEditAnnouncement = async () => {
  const res = await QuestionGroupControllerService.addExpAndAnnUsingPost(Announcement.value, Description.value, props.id as any)
  if(res.code == 0) {
    message.success("编辑成功")
  }else {
    message.error("编辑失败", res.message)
  }
  await loadExamine()
  AnnouncementModal.value = false
}
const AnnouncementCancel = async () => {
  const res = await QuestionGroupControllerService.addExpAndAnnUsingPost(Announcement.value, Description.value, props.id as any)
  if(res.code == 0) {
    message.success("编辑成功")
  }else {
    message.error("编辑失败", res.message)
  }
  await loadExamine()
  AnnouncementModal.value = false
}

const AddOrEditDescription = async () => {
  const res = await QuestionGroupControllerService.addExpAndAnnUsingPost(Announcement.value, Description.value, props.id as any)
  if(res.code == 0) {
    message.success("编辑成功")
  }else {
    message.error("编辑失败", res.message)
  }
  await loadExamine()

  DescriptionModal.value = false
}
const DescriptionCancel = () => {
  DescriptionModal.value = false
}
const Announcement = ref('')
const onAnnouncementChange = (value: string) => {
  Announcement.value = value;
};
const Description = ref('')
const onDescriptionChange = (value: string) => {
  Description.value = value;
};



const pageChange = async () => {
  await getAllUserGroups()
}
const allUserGroups = ref([] as any[])
const getAllUserGroups = async () => {
  const res = await UserGroupControllerService.listUserGroupByPageUsingPost(allUserGroupsSearchParams.value)
  if(res.code === 0) {
    allUserGroups.value = res.data.records
    // total.value = res.total
  }
}
const existedUserGroups = ref([] as any[])
const open = ref<boolean>(false);
const addUserGroup = async () => {
  await loadUserGroup()
  open.value = true;
}
const total = ref(0)

const questionScore = ref(0)
const onShowSizeChange = (current: number, pageSize: number) => {
  console.log(current, pageSize);
  allUserGroupsSearchParams.value.pageSize = pageSize;
  loadUserGroup()
};

const form = computed(() => ([
  {

  }
]))
let userGroups = ref([

])
const isSelect = (item: any) => {
  console.log(item.groupName)
  return selectedUserGroup.value.includes(item.groupName)
}

const needAddUserGroup = ref([] as any[])
const addUserGroupToExam = (item: any) => {
  if (needAddUserGroup.value.includes(item.id)) {
    console.log("存在")
    needAddUserGroup.value = needAddUserGroup.value.filter(userGroup => userGroup !== item.id)
  } else {
    needAddUserGroup.value.push(item.id)
  }
}
const toExamineManageEditView = () => {
  router.push({
    path: `/practice/question/problemsSetView/examineManageView/edit/${props.id}`
  })
}



const handleOk = async () => {
  if (needAddUserGroup.value.length === 0) {
    open.value = false;
    return
  }

  const res = await QuestionGroupControllerService.addUserGroupUsingPost(props.id as any, needAddUserGroup.value)
  if(res.code === 0) {
    message.success("授权成功")
  }else {
    message.error("授权失败", res.message)
  }
  await loadExamine()
  console.log(needAddUserGroup.value)
  open.value = false;
}
const handleCancel = () => {
  open.value = false;
}
const handleClose = (removeTag: string) => {
  // selectedUserGroup.value = selectedUserGroup.value.filter(tag => tag  !== removeTag);
}
const selectedUserGroup = ref([]) as any;
const dropdownVisible = ref<boolean>(false);

const selectDegree = (item: any) => {
  console.log(item)
    if (item.groupName !== '' && !selectedUserGroup.value.includes(item.groupName)) {
    selectedUserGroup.value.push(item.groupName)

  }
    return true
}
const removeItem = (item: any) => {
  // userGroups.value = userGroups.value.filter(i => i.key !== item.key)
}
const clearUserGroup = () => {
  selectedUserGroup.value = []
}
const userGroupIds = ref([] as any[])
const loadUserGroup =  async () => {
  // const user = store.state.user.loginUser
  // const res = await UserGroupControllerService.listUserGroupByPageUsingPost({
  //   id: user.id,
  //   current: 1,
  //   pageSize: 10000,
  // }

  // );
  const res = await UserGroupControllerService.listUserGroupByUserIdUsingGet();
  userGroups.value = res.data as any

  total.value = userGroups.value.length
  console.log("用户组", userGroups.value)
}
const questionGroups = ref([] as any[])
const showAnnouncementContent = ref()
const showDescriptionContent = ref()
const actionTime = ref()
const endTime = ref()
const timeLimit = ref()
const loadExamine = async () => {
  console.log("题目集id：" +props.id)
  const res = await QuestionGroupControllerService.getQuestionGroupByIdUsingGet(
      props.id as any,
  )
  actionTime.value = res?.data?.actionTime as any
  endTime.value = res?.data?.endTime as any
  timeLimit.value = res?.data?.limitTime as any
  existedUserGroups.value = res?.data?.userGroupList as any
  if (existedUserGroups.value.length > 0) {
    existedUserGroups.value.forEach(userGroup => {
      userGroupIds.value.push(userGroup.id)
    })
  }
  showAnnouncementContent.value = res?.data?.announcement as any ?? ''
  showDescriptionContent.value = res?.data?.explanation as any ?? ''
  Announcement.value = res?.data?.announcement as any ?? ''
  Description.value = res?.data?.explanation as any ?? ''
  questionGroups.value = res?.data?.questionList as any
  questionScore.value = res?.data?.score as any
  console.log(res)
}
onMounted(() => {
  loadExamine()
  loadUserGroup()
  getAllUserGroups()

})
</script>

<style scoped>
#examineManageView {
  padding: 20px;
  width: 100%;

}
.selectDiv {
  width: 100%;

}
.selectDiv:hover {
  background-color: #faf9f9;
  border-radius: 10px;
}
.isSelect {
  background-color: #000000;
}
</style>