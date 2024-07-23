<template>
  <div id="userGroupView">
    <Card size="small" style=" padding: 10px">
      <div style="display: flex; justify-content: space-between;">
        <div style="font-size: 16px">用户组列表</div>
        <div style="display: inline-block; float: right; margin-bottom: 10px">
          <InputSearch
              v-model:value="searchParams.groupName"
              placeholder="请输入用户组名称!"
              enter-button
              @search="onSearch"
              style="min-width: 300px"
          />
        </div>
      </div>
      <div style="display: flex; justify-content: right">
        <aButton type="primary" style="" @click="showModal">
          <template #icon>
            <PlusOutlined/>
          </template>
          创建用户组
        </aButton>
      </div>
      <div class="problemsItemList" style="height: 100%; margin-top: 10px">
        <div v-if="dataList.length !== 0">
          <div class="problemsItem" v-for="i in dataList" @click="toUserGroupDetailsView(i.id)">
            <TeamOutlined class="problemsItemIcon" />
            <div style="display: flex; flex: 40; flex-direction: column">
              <div style="font-size: 16px">{{i?.groupName}}</div>
              <div style="color: #737373">{{ i?.description }}</div>
            </div>
          </div>
        </div>
        <div v-else>
          <div style="font-size: 20px; display: flex; justify-content: center; align-items: center; height: 400px">
            <a-space>
              <WarningOutlined style="color: red; font-size: 30px ;font-weight: 700" />
              暂无用户组, 请创建!
            </a-space>
          </div>
        </div>
      </div>
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
    </Card>

    <Modal v-model:open="open" title="创建用户组" @ok="handleOk" style="width: 40vw; ">
      <div style="padding-right: 50px; padding-top: 20px">
        <Form
            name="basic"
            :label-col="{ span: 3 }"
            :wrapper-col="{ span: 16 }"
            autocomplete="off"
            label-align="right"
            style="font-size: 20px"
        >
          <FormItem label="用户组名称" name="title">
            <Input size="middle" placeholder="用户组名称" :style="{width:'450px', marginLeft: '20px'}" v-model:value="form.groupName"/>
          </FormItem>
          <FormItem label="描述" name="title">
            <Textarea v-model:value="form.description" :style="{ marginLeft: '20px'}" placeholder="用户组描述" :rows="4" />
          </FormItem>
        </Form>
      </div>
      <template #footer>
        <aButton key="back" @click="handleCancel">取消</aButton>
        <aButton key="submit" type="primary"  @click="handleOk">创建</aButton>
      </template>
    </Modal>
  </div>

</template>

<script setup lang="ts">
import {
  Card,
  InputSearch,
  Button as aButton,
  Pagination,
  Modal,
  Form,
  RadioGroup,
  FormItem,
  DatePicker, Input, RadioButton, TimePicker, Textarea
} from 'ant-design-vue'
import {ref} from "vue";
import {FundProjectionScreenOutlined, PlusOutlined, TeamOutlined,WarningOutlined} from "@ant-design/icons-vue";
import {useRouter} from "vue-router";
import {UserGroupControllerService} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import {onMounted} from "@vue/runtime-core";
const router = useRouter()
const form = ref({
  groupName: '',
  description: ''
})
const total = ref(20)
const searchParams = ref({
  groupName: '',
  current: 1,
  pageSize: 10,
})
const open = ref(false)
// 分页参数
const pageSizeOptions = ref<string[]>(['10', '20', '30', '40', '50']);
const showModal = () => {
  open.value = true;
}
const dataList = ref<any[]>([])
const handleOk = async (e: MouseEvent) => {
  const res = await UserGroupControllerService.addUserGroupUsingPost1(form.value)
  if (res.code === 0) {
    message.success('创建成功')
  }else  {
    message.error('创建失败')
  }
  await loadData()
  console.log(e);
  open.value = false;
};
const handleCancel = () => {
  open.value = false;
}
const loadData = async () => {
  const res = await UserGroupControllerService.listUserGroupByPageUsingPost(searchParams.value)
  if (res.code === 0) {
    dataList.value = res.data.records
    total.value = res.data.total
  }
}
const onShowSizeChange = (current: number, pageSize: number) => {
  searchParams.value.pageSize = pageSize;
  // loadData()
};
const pageChange = () => {
  // loadData()
}
const onSearch = () => {
  loadData()
}
onMounted(() => {
  loadData()
})
const toUserGroupDetailsView = (id: any) => {
  router.push({
    path: `/practice/question/userGroupView/userGroupDetailsView/${id}`
  })
}

</script>

<style scoped>
#userGroupView {
  height: 100vh;
}
.problemsItemList {
  flex: 3; display: flex; flex-direction: column;
}
.problemsItem {
  display:flex; cursor: pointer;
  margin-bottom: 8px;
  padding: 8px;
  border: 1px solid #e2eff3;
  border-radius: 10px;
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
</style>