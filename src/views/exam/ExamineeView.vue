<template>
  <div id="ExamineeView">
    <div style="overflow-y: auto ;padding: 10px; background:#ffffff; height: 85vh; margin: 20px 200px; border-radius: 10px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);">

      <Table class="ant-table-striped" :columns="columns" :data-source="examineeList" :pagination="false"
             style="" loading="true;"
      >
        <template #empty>
          <div v-if="examineeList.length === 0">
            aaa
          </div>
        </template>

        <template #bodyCell="{ column, record }">
          <div v-if="column.key === 'userAccount'">
            {{record.userVO.userAccount}}
          </div>
          <div v-if="column.key === 'userName'">
            {{record.userVO.userName}}
          </div>
          <div v-if="column.key === 'actionTime'">
            {{moment(record.actionTime).format('YYYY-MM-DD HH:mm:ss')}}
          </div>
        </template>


      </Table>
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
  </div>
</template>

<script setup lang="ts">
import Bus from "@/utils/Bus";
import {notification, Pagination, Progress, Table, Tag} from "ant-design-vue";
import {CheckCircleOutlined, ExclamationCircleOutlined} from "@ant-design/icons-vue";
import {h, ref} from "vue";
import {useStore} from "vuex";
import {ExamControllerService} from "../../../generated";
import {onMounted} from "@vue/runtime-core";
import moment from "moment/moment";
const store = useStore()
const sync = ref('')
interface Props {
  id: any
}
const props = withDefaults(defineProps<Props>(), {
  id: () => ""})

const columns = [
  {
    title: '学号',
    dataIndex: 'userAccount',
    key: 'userAccount',
    width: 200,
  },
  {
    title: '用户名',
    dataIndex: 'userName',
    key: 'userName',
    width: 200,
  },
  {
    title: '开考时间',
    dataIndex: 'actionTime',
    key: 'actionTime',
    width: 200,
  }
]

const pageSizeOptions = ref<string[]>(['10', '20', '30', '40', '50']);
const searchParams = ref({
  current: 1,
  pageSize: 10,
  questionId: props.id
})
const pageChange = () => {
  getExamineeList()
}
const onShowSizeChange = (current: number, pageSize: number) => {
  searchParams.value.pageSize = pageSize;
  getExamineeList()
}
const total = ref(0)
const examineeList = ref([] as any[])
const getExamineeList = async () => {
  const res = await ExamControllerService.listExamVoByPageUsingPost(searchParams.value)
  if (res.code === 0) {
    examineeList.value = res.data.records
    total.value = res.data.total
  }
  if (examineeList.value.length === 0) {
    notification.warning({
      message: '当前考试考生开始考试前，暂无考生信息！',
      description:
          '当有考生开始考试时，系统会自动更新考生信息，请耐心等待。',
      onClick: () => {
        console.log('Notification Clicked!');
      },
      icon: () => h(ExclamationCircleOutlined, { style: 'color: red' }),
    });
  }
}
onMounted(() => {
  getExamineeList()
})
</script>

<style scoped>

</style>