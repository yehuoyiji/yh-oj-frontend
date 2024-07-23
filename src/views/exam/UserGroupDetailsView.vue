<template>
  <div id="userGroupDetailsView">
    <div style="display:flex;">
      <div style="flex: 7">
        <a-card style="height: 100%; margin-right: 20px; border-radius: 15px; padding: 20px;box-shadow: 0 2px 6px rgba(225,207,207,0.06),0 4px 8px rgba(231,218,218,0.06),0 6px 12px rgba(218,205,205,0.06)">
          <div style="display: inline-block; float: right; margin-bottom: 10px">
<!--            <InputSearch-->
<!--                v-model:value="searchParams.userNameOrUserAccount"-->
<!--                placeholder="请输入用户昵称或用户学号!"-->
<!--                enter-button-->
<!--                @search="onSearch"-->
<!--                style="min-width: 300px"-->
<!--            />-->
          </div>
          <div style="margin-top: 10px">
            <h2 style="display: inline-block; font-weight: 700">{{userGroup?.groupName}}</h2>
            <aButton type="primary" style="float: right" @click="showModal">
              <template #icon>
                <PlusOutlined/>
              </template>
              添加
            </aButton>
          </div>
          <Table :columns="columns" :data-source="existUsers" :pagination="false" >
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'userRole'">
            <span>
              <Tag>
                {{ record.userRole }}
              </Tag>
            </span>
              </template>
              <template v-if="column.key === 'avatar'">
                <img :src="record.userAvatar" style="width: 40px; height: 40px;">
              </template>
              <template v-else-if="column.key === 'action'">
                <a-space>
                  <Popconfirm title="确定删除此用户吗?"
                              ok-text="删除"
                              cancel-text="取消"
                              @confirm="doDelete(record.id)"
                              @cancel="">
                    <aButton type="primary" danger>删除</aButton>
                  </Popconfirm>
                </a-space>
              </template>
            </template>
          </Table>
          <Pagination
              v-model:current="searchParams.current"
              v-model:page-size="searchParams.pageSize"
              :page-size-options="pageSizeOptions"
              :total="total1"
              show-size-changer
              @showSizeChange="onShowSizeChange"
              @change="pageChange"
              style="text-align: right; margin-top: 10px"
          >
            <template #buildOptionText="props">
              <span>{{ props.value }}条/页</span>
            </template>
          </Pagination>

        </a-card>
      </div>
      <div style="flex: 3; display: flex; flex-direction: column">
        <div style=" box-shadow: 0 2px 6px rgba(225,207,207,0.06),0 4px 8px rgba(231,218,218,0.06),0 6px 12px rgba(218,205,205,0.06); display: flex; flex-direction: column; padding: 20px; border-radius: 10px;background-color:#fff;">
          <div style="display: flex; flex: 1; justify-content: space-between">
            <div style="font-size: 16px">已授权题目集</div>
            <div style="font-size: 14px">
              <a-space style="color: hsl(212, 89%, 53%)">
<!--                <span>编辑</span>-->
<!--                <span>分享</span>-->
<!--                <span>预览</span>-->
              </a-space>
            </div>
          </div>
          <div v-if="AuthorizationQuestionGroupList.length === 0" style="display: flex; flex: 9; margin-top: 20px;justify-content: center;flex-direction: column; padding: 20px 0 10px 0;">
            <div style="display: flex; flex: 1; font-size: 18px; color: #737373; justify-content: center">暂无关联题目集</div>
          </div>
          <div v-else>
            <div v-for="item in AuthorizationQuestionGroupList" style="display: flex; flex-direction: column; margin-top: 10px">
              <div @click="toQuestionGroup(item.id)" style="background:#f6f7f9; border-radius: 10px; padding: 10px; margin-bottom: 5px; font-size: 16px; cursor: pointer">
                <div>{{item?.groupName}}</div>
                <div style="color: #a9a6a6; margin-top: 5px; font-size: 14px">{{ moment(item?.actionTime).format("YYYY/MM/DD HH:mm:ss") }} - {{ moment(item?.endTime).format("YYYY/MM/DD HH:mm:ss") }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
     </div>
    <Modal v-model:open="open" title="添加用户" @ok="handleOk" style="width: 40vw; " @cancel="handleCancel">
      <div style="padding-right: 50px; padding-top: 20px">
        <Form
            name="basic"
            :label-col="{ span: 3 }"
            :wrapper-col="{ span: 16 }"
            autocomplete="off"
            label-align="right"
            style="font-size: 20px"
        >
          <div v-for="(item, index) in dataList" style="display:flex; justify-content: space-between; align-items: center; padding-left: 10px">
            <div style="height: 60px; padding: 10px 0 10px 0; margin: 10px 0 10px 0" class="selectDiv">
              <Checkbox @change="addUserToUserGroup(item)"
                        :default-checked="userIds.includes(item.id) ?? false"
                        :disabled="userIds.includes(item.id)"
                        style="margin-left: 20px">
                <a-space>
                  <icon-code style="font-size: 24px;flex: 1; padding: 0;color: rgb(133 80% 35%); margin-left: 20px"></icon-code>
                  <div style="display: flex; justify-content: space-between;  flex-direction: column">
                    <div>
                      {{ item?.userName }}
                    </div>
                    <div>
                      {{item?.userAccount}}
                    </div>
                  </div>
                </a-space>
              </Checkbox>
            </div>
            <div>
            </div>
          </div>
        </Form>
      </div>
      <template #footer>
        <aButton key="back" @click="handleCancel">取消</aButton>
        <aButton key="submit" type="primary"  @click="handleOk">提交</aButton>
      </template>
    </Modal>
  </div>
</template>

<script setup lang="ts">

import {
  Card,
  Dropdown, Form,
  FormItem,
  Input,
  InputSearch,
  Menu,
  MenuItem, Modal,
  Pagination, Popconfirm,
  Switch,
  Table,
  Tag, Button as aButton, Textarea, Button
} from "ant-design-vue";
import moment from "moment/moment";
import {DownOutlined, PlusOutlined} from "@ant-design/icons-vue";
import {ref} from "vue";
import {QuestionGroupControllerService, UserControllerService, UserGroupControllerService} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import {onMounted} from "@vue/runtime-core";
import {Checkbox} from "@arco-design/web-vue";
import {IconCode} from "@arco-design/web-vue/es/icon";
import {useRouter} from "vue-router";
const router = useRouter();
interface Props {
  id: any
}
const props = withDefaults(defineProps<Props>(), {
  id: () => ""
})
// 新增/编辑用户表单
const form = ref({
  userName: '',
  userAccount: '',
  userRole: '',
  id: 1 as number
})
const dropdownVisible = ref(false)
const columns = [
  {
    title: '头像',
    dataIndex: 'avatar',
    key: 'avatar',
    align: 'center',
    width: 150
  },
  {
    title: '学号',
    key: 'userAccount',
    dataIndex: 'userAccount',
    align: 'left',
    width: 300
  },
  {
    title: '姓名',
    dataIndex: 'userName',
    key: 'userName',
    align: 'left',
    width: 300
  },

  {
    title: '操作',
    key: 'action',
    fixed: 'right',
    align: 'center',

  },
];

const open = ref(false)
const pageSizeOptions = ref<string[]>(['10', '20', '30', '40', '50']);
const onShowSizeChange = (current: number, pageSize: number) => {
  searchParams.value.pageSize = pageSize;
  // loadData()
};

const pageChange = () => {
  loadData()
}
const selectedUser = ref([] as any[])
const selectedUserIds = ref([] as any[])
const handleCancel = () => {

  open.value = false;

}

const needAddUser= ref([] as any[])
const addUserToUserGroup = (item: any) => {
  if (needAddUser.value.includes(item.id)) {
    console.log("存在")
    needAddUser.value = needAddUser.value.filter(user => user !== item.id)
  } else {
    needAddUser.value.push(item.id)
  }
}

const handleClose = (item: any) => {
  selectedUser.value = selectedUser.value.filter(user => user  !== item);
  selectedUserIds.value = selectedUserIds.value.filter(userId => userId !== item.id)
}
const selectUser = (item: any) => {
  if (item.userName !== '' && !selectedUser.value.includes(item.userName as any)) {
    selectedUser.value.push(item)
    selectedUserIds.value.push(item.id)
  }
  return true
}

const clearUser = () => {
  selectedUser.value = []
  selectedUserIds.value = []
}
const needShowSelect = ref([] as any[])
const showModal = () => {
  open.value = true;
  userModal.value = '新增用户'
  form.value = {
    userName: '',
    userAccount: '',
    userRole: '',
    id: 1
  }
  allUser.value.forEach((item: any) => {
    !existUserIds.value.includes(item.id) ? needShowSelect.value.push(item) : ''
  })
  console.log(needShowSelect.value)
};

const doDelete = async (id: number) => {

  const res = await UserGroupControllerService.deleteUserUsingPost1(props.id, [id]);
  if (res.code === 0) {
    userIds.value = []
    message.success("删除成功");
    await loadData()
  } else {
    message.error("删除失败:" + res.message)
  }
  allUser.value.forEach((item: any) => {
    !existUserIds.value.includes(item.id) ? needShowSelect.value.push(item) : ''
  })
  await getUserGroupById()
  await loadData()
}

const allUserIds = ref([] as any[])
const loadData = async () => {

  const res = await UserControllerService.listUserByPageUsingPost(
      searchParams.value
  );

  if (res.code == 0) {
    dataList.value = res.data.records;
    total1.value = res.data.total;
    console.log(dataList.value)
  } else {
    message.error("加载失败" + res.message)
  }
  dataList.value.forEach(item => {
    allUserIds.value.push(item.id)
  })
}
const handleOk = async (e: MouseEvent) => {
  const list = ref([] as any[])

  const res = await UserGroupControllerService.addUserUsingPost1(
      props.id,needAddUser.value
  );
  if (res.code === 0) {
    message.success("添加成功");
  }else {
    message.error("添加失败:" + res.message)
  }
  selectedUserIds.value = []
  selectedUser.value = []
  open.value = false;
  needShowSelect.value = []
  await getUserGroupById()
  await loadData()
};

// 新增用户还是编辑用户对话框标识
const userModal = ref('')
// 用户数据列表
const dataList = ref([])
// 用户数据条数
const total1 = ref(0)
// 搜索条件
const searchParams = ref({
  pageSize: 10,
  current: 1,
  userNameOrUserAccount:'',
  userRole: ''
})
const showUsers = ref([] as any[])
// dataList.value.forEach(item => {
//   if(userIds.value.includes(item)) {
//     showUsers.value.push(item)
//   }
// })
const userIds = ref([] as any[])
const onSearch = () => {
  userIds.value = []
  loadData()
  getUserGroupById()
  dataList.value.forEach(item => {
    if(userIds.value.includes(item)) {
      showUsers.value.push(item)
    }
  })

}

const userGroup = ref();
const existUserIds = ref([] as any[]);
const existUsers = ref([] as any[]);

const getUserGroupById = async () => {
  const res = await UserGroupControllerService.getUserGroupByIdUsingGet(props.id);
  if(res.code === 0) {
    userGroup.value = res.data
    existUsers.value = res.data?.userVOList as any[]
    existUsers.value.forEach(item => {
      userIds.value.push(item.id)
    })
  }

}
const allUser = ref([] as any[])
const getAllUser = async () => {
  const res = await UserControllerService.listUserByPageUsingPost({
    pageSize: 10000,
    current: 1,
  })
  if (res.code === 0) {
    allUser.value = res.data.records
  }
}
const AuthorizationQuestionGroupList = ref([] as any[])
const getAuthorizationQuestionGroup = async () => {
  const res = await QuestionGroupControllerService.getAuthorizationQuestionGroupUsingGet(props.id)
  if (res.code === 0) {
    AuthorizationQuestionGroupList.value = res.data as any[]
  }
}
const toQuestionGroup = (id: number) => {
  router.push({
    path: `/practice/question/problemsSetView/examineManageView/${id}`
  })
}

onMounted(() => {
  loadData()
  getUserGroupById()
  getAllUser()
  getAuthorizationQuestionGroup()
})
</script>

<style scoped>

</style>