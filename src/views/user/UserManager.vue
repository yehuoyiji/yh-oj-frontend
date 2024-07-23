<template>
  <div id="manageQuestion">
    <a-card style="height: 100%; margin: 10px 0 0 0; border-radius: 15px; padding: 20px;box-shadow: 0 2px 6px rgba(7,0,0,0.06),0 4px 8px rgba(7,0,0,0.06),0 6px 12px rgba(7,0,0,0.06)">
      <div style="display: inline-block">
        <Dropdown>
          <template #overlay>
            <Menu @click="selectDegree">
              <MenuItem key=""  style="color: #1dfc04">
                <UserOutlined/>
                所有
              </MenuItem>
              <MenuItem key="admin" style="color: #1a1a1a">
                <UserOutlined/>
                管理员
              </MenuItem>
              <MenuItem key="user" style="color: blueviolet">
                <UserOutlined/>
                用户
              </MenuItem>
              <MenuItem key="teacher" style="color: #d5c0e8">
                <UserOutlined/>
                教师
              </MenuItem>
              <MenuItem key="ban"  style="color: #f34145">
                <UserOutlined/>
                禁用
              </MenuItem>
            </Menu>
          </template>
          <a-button>
            {{searchParams.userRole === 'admin'? '管理员' : searchParams.userRole === 'user'? '用户' : searchParams.userRole === 'teacher'? '教师' : searchParams.userRole === 'ban'? '禁用' : '所有' }}
            <DownOutlined/>
          </a-button>
        </Dropdown>
      </div>
      <div style="display: inline-block; float: right; margin-bottom: 10px">
        <InputSearch
            v-model:value="searchParams.userNameOrUserAccount"
            placeholder="请输入用户昵称或用户Id!"
            enter-button
            @search="onSearch"
            style="min-width: 300px"
        />
      </div>
      <div style="margin-top: 10px">
        <h2 style="display: inline-block; font-weight: 700">用户列表</h2>
        <aButton type="primary" style="float: right" @click="showModal">
          <template #icon>
            <PlusOutlined/>
          </template>
          新建
        </aButton>
      </div>
      <Table :columns="columns" :data-source="dataList" :pagination="false" :row-class-name="(_record, index) => (index % 2 === 1 ? 'table-striped' : null)">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'userRole'">
            <span>

              <Tag style="padding: 3px 10px; font-size: 14px" v-if="record.userRole === 'admin'" color="#3b5999">
                 管理员
              </Tag>
              <Tag style="padding: 3px 10px; font-size: 14px" v-if="record.userRole === 'teacher'" color="#55acee">
                教师
              </Tag>
              <Tag style="padding: 3px 10px; font-size: 14px" v-if="record.userRole === 'user'" color="#87d068">
                用户
              </Tag>
              <Tag style="padding: 3px 10px; font-size: 14px" v-if="record.userRole === 'ban'" color="#cd201f">
                已拉入黑名单
              </Tag>
            </span>
          </template>
          <template v-if="column.key === 'avatar'">
            <img :src="record.userAvatar" style="width: 40px; height: 40px;">
          </template>
          <template v-else-if="column.key === 'updateTime'">
            {{ moment(record.updateTime).format("YYYY-MM-DD") }}
          </template>
          <template v-else-if="column.key === 'createTime'">
            {{ moment(record.updateTime).format("YYYY-MM-DD") }}
          </template>
          <template v-if="column.key === 'forbidden'">
            <Switch v-if="record.userRole !== 'admin'" :checked="record.userRole === 'ban' ? true : false"
                    @change="changeForbidden(record.id, record.userRole)"></Switch>
          </template>
          <template v-else-if="column.key === 'action'">
            <a-space>
<!--              <aButton type="prmairy" @click="checkUserDetail(record.id)" style="background-color:#91b605; color: #ffffff">查看详情</aButton>-->
              <aButton type="primary" @click="doChange(record.id)">编辑</aButton>
              <Popconfirm title="确定删除此用户吗?"
                          ok-text="删除"
                          cancel-text="取消"
                          @confirm="doDelete(record.id)"
                          @cancel="">
                <aButton type="primary" danger>删除</aButton>
              </Popconfirm>

            </a-space>
          </template>
          <template v-else></template>
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
      <Modal v-model:open="open" :title=userModal @ok="handleOk" width="1000px">
        <div>
          <Form
              name="basic"
              :label-col="{ span: 3 }"
              :wrapper-col="{ span: 16 }"
              autocomplete="off"
              label-align="left"
              style="font-size: 20px"
          >
            <FormItem label="用户名:" name="userName">
              <Input size="middle" :style="{width:'650px'}" v-model:value="form.userName"/>
            </FormItem>
            <FormItem label="用户账户:" name="userAccount" v-if="userModal === '新增用户'">
              <Input size="middle" :style="{width:'650px'}" v-model:value="form.userAccount"/>
            </FormItem>
            <FormItem label="角色" name="userRole">
              <Dropdown>
                <template #overlay>
                  <Menu @click="handleMenuClick">
                    <MenuItem key="admin">
                      管理员
                    </MenuItem>
                    <MenuItem key="teacher">
                      教师
                    </MenuItem>
                    <MenuItem key="user">
                      用户
                    </MenuItem>
                  </Menu>
                </template>
                <aButton>
                  {{ form.userRole === '' ? '角色' : form.userRole }}
                  <DownOutlined/>
                </aButton>
              </Dropdown>
            </FormItem>
          </Form>
        </div>
        <template #footer>
          <a-button key="back" @click="handleCancel">取消</a-button>
          <a-button key="submit" type="primary" :loading="loading" @click="handleOk">提交</a-button>
        </template>
      </Modal>

    </a-card>
  </div>

</template>
<script lang="ts" setup>
import {DownOutlined} from '@ant-design/icons-vue';
import {computed, nextTick, ref} from "vue";
import {UserControllerService} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import {onMounted} from "@vue/runtime-core";
import {
  PlusOutlined,

} from "@ant-design/icons-vue";
import {
  Table,
  Button as aButton,
  Tag,
  Dropdown,
  InputSearch,
  Modal,
  Input,
  Form,
  FormItem,
  Pagination,
  Menu,
  MenuItem, MenuProps, Popconfirm, Switch
} from 'ant-design-vue';
import {useRouter} from "vue-router";
import moment from "moment";

// 对话框显隐条件
const open = ref<boolean>(false);
const loading = ref<boolean>(false);
const router = useRouter()

// 新增/编辑用户表单
const form = ref({
  userName: '',
  userAccount: '',
  userRole: '',
  id: 1 as number
})
// 分页参数
const pageSizeOptions = ref<string[]>(['10', '20', '30', '40', '50']);
const onShowSizeChange = (current: number, pageSize: number) => {
  searchParams.value.pageSize = pageSize;
  loadData()
};

/**
 * 新增用户对话框中就角色选择
 * @param e
 */
const handleMenuClick: MenuProps['onClick'] = e => {
  form.value.userRole = e.key as string
}

/**
 * 用户是否禁用
 * @param id
 * @param userRole
 */
const changeForbidden = async (id: number, userRole: any) => {
  const res = await UserControllerService.updateUserUsingPost({
    id: id,
    userRole: userRole === 'ban' ? 'user' : 'ban'
  })
  console.log(id, userRole)
  if (res.code === 0) {
    await loadData()
  } else {
    message.error(res.message)
  }
  return true
}
const getUserRoles = ref([
  "管理员", "教师", "用户", "禁用"
])
const getUserRoles2 = ref(
    {
      admin: "管理员",
      teacher: "教师",
      user: "用户",
      ban: "禁用"
    }
)
const pageChange = () => {
  loadData()
}

/**
 * 对话框取消按钮
 */
const handleCancel = () => {
  open.value = false
}
const pagination = computed(() => ({
  total: dataList.value.length,
  current: searchParams.value.current,
  pageSize: searchParams.value.pageSize,
}));
const selectDegree: MenuProps['onClick'] = e => {
  searchParams.value.userRole = e.key as string
  console.log(e.key);
  loadData()
};

/**
 * 新增用户按钮方法
 */
const showModal = () => {

  open.value = true;
  userModal.value = '新增用户'
  form.value = {
    userName: '',
    userAccount: '',
    userRole: '',
    id: 1
  }
};

/**
 * 新增/编辑用户方法
 * @param e
 */
const handleOk = async (e: MouseEvent) => {
  open.value = true;
  let res = null
  if (userModal.value === '新增用户') {
    res = await UserControllerService.addUserUsingPost({
      userName: form.value.userName,
      userRole: form.value.userRole,
      userAccount: form.value.userAccount,
      userAvatar: 'https://assets.leetcode.cn/aliyun-lc-upload/users/leetcode-solution/avatar_1582018938.png'
    })
  } else {
    res = await UserControllerService.updateUserUsingPost({
      userName: form.value.userName,
      userRole: form.value.userRole,
      id: form.value.id as number
    })
  }
  if (res.code === 0 ) {
    if(userModal.value === '新增用户') {
      message.success('新增成功')
    }
    if(userModal.value === '编辑用户') {
      message.success('修改成功')
    }
    await loadData()
  } else {
    message.error(res.message)
  }

  open.value = false;
};

// table表列属性
const columns = [
  {
    title: '头像',
    dataIndex: 'avatar',
    key: 'avatar',
    align: 'avatar',
    width: 50
  },
  {
    title: '昵称',
    dataIndex: 'userName',
    key: 'userName',
    align: 'center',
    width: 150
  },
  {
    title: '用户账户',
    key: 'userAccount',
    dataIndex: 'userAccount',
    align: 'center',
  },

  {
    title: '用户角色',
    key: 'userRole',
    dataIndex: 'userRole',
    align: 'center',
    width: 200
  },
  {
    title: '禁用',
    key: 'forbidden',
    dataIndex: 'forbidden',
    align: 'center',

  },
  // {
  //   title: '登录IP',
  //   key: 'ipAddress',
  //   dataIndex: 'ipAddress',
  //   align: 'center',
  //   width: 150
  // },
  // {
  //   title: '登录地址',
  //   key: 'ipSource',
  //   fixed: 'ipSource',
  //   align: 'center',
  //   width: 150
  // },
  {
    title: '创建时间',
    key: 'createTime',
    dataIndex: 'createTime',
    align: 'center',
  },
  {
    title: '上次登录时间',
    key: 'updateTime',
    dataIndex: 'updateTime',
    align: 'center',
  },
  {
    title: '操作',
    key: 'action',
    fixed: 'right',
    align: 'center',
    width: 100
  },
];

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
  data:'',
  userRole: '',
  userNameOrUserAccount: ''
})

/**
 * 编辑用户方法
 * @param id
 */
const doChange = async (id: number) => {
  const res = await UserControllerService.getUserByIdUsingGet(id);
  if(res.code !== 0) {
    message.error('加载用户信息失败')
  }else {
    form.value.userName = res.data?.userName as string
    form.value.userRole = res.data?.userRole as string
    form.value.userAccount = res.data?.userAccount as string
    form.value.id = id as number
  }
  open.value = true;
  userModal.value = '编辑用户'
}
const onSearch = () => {
  loadData()
}

/**
 * 获取用户列表/根据搜索条件查询
 */

// 加载数据
const loadData = async () => {
  // 通过 UserControllerService 发起一个异步请求来获取用户列表数据
  const res = await UserControllerService.listUserByPageUsingPost(
      searchParams.value
  );
  // 如果请求返回的 code 为 0，则表示请求成功
  if (res.code == 0) {
    // 将返回的用户数据列表赋值给 dataList
    dataList.value = res.data.records;
    // 将返回的总数赋值给 total1
    total1.value = res.data.total;
    // 打印 dataList 的值
    console.log(dataList.value)
  } else {
    // 如果请求返回的 code 不为 0，则表示请求失败，通过 message.error 输出错误信息
    message.error("加载失败" + res.message)
  }
}


/**
 * 表格根据Id删除用户数据
 * @param id
 */
const doDelete = async (id: number) => {
  const res = await UserControllerService.deleteUserUsingPost({
    id: id
  })
  if (res.code === 0) {
    message.success("删除成功");
    await loadData()
  } else {
    message.error("删除失败:" + res.message)
  }
}

onMounted(() => {
  loadData()
})
</script>
<style>
#manageQuestion {
  //margin-top: -20px;
  padding: 0 180px;
}

.ant-input-group {
  width: 300px;
  float: right;
}

.arco-form-item-label-col > .arco-form-item-label {
  font-size: 20px;
}

:where(.css-dev-only-do-not-override-1hsjdkk).ant-form-item .ant-form-item-label > label {
  font-size: 16px;
}

.bytemd {
  min-width: 900px;
}
[data-doc-theme='light'] .ant-table-striped :deep(.table-striped) td {
  background-color: #fafafa;
}
[data-doc-theme='dark'] .ant-table-striped :deep(.table-striped) td {
  background-color: rgb(29, 29, 29);
}
</style>
