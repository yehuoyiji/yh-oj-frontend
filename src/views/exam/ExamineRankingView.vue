<template>
  <div id="ExamineRankingView">
    <div style="padding: 10px; background:#ffffff; height: 85vh; margin: 20px 200px; border-radius: 10px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);">
      <Table class="ant-table-striped" :columns="columns" :data-source="examRankingList" :pagination="false"
             style="" loading="true;"
      >
        <template #bodyCell="{ column, record }">
          <div v-if="column.key === 'id'">
            {{ record.id }}
          </div>
          <div v-if="column.key === 'userAccount'">
            {{record.userVO.userAccount}}
          </div>
          <div v-if="column.key === 'userName'">
            {{record.userVO.userName}}
          </div>
          <div v-if="column.key ==='score'">
            {{record.score ?? 0}}
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
import {notification, Pagination, Progress, Table, Tag} from "ant-design-vue";
import {CheckCircleOutlined, ExclamationCircleOutlined} from "@ant-design/icons-vue";
import {h, ref} from "vue";
import {ExamControllerService} from "../../../generated";
import {onMounted} from "@vue/runtime-core";
interface Props {
  id: any
}
const props = withDefaults(defineProps<Props>(), {
  id: () => ""
})
const pageSizeOptions = ref<string[]>(['10', '20', '30', '40', '50']);
const total = ref(0);
const searchParams = ref({
  current: 1,
  pageSize: 10,
  sortField: 'score',
  sortOrder: 'descend',
  questionGroupId: props.id
})
const columns = [
  {
    title: '序号',
    dataIndex: 'id',
    key: 'id',
    align: 'center',
  },
  {
    title: '学号',
    dataIndex: 'userAccount',
    key: 'userAccount',
    align: 'center',
  },
  {
    title: '考生姓名',
    dataIndex: 'userName',
    key: 'userName',
    align: 'center',
  },
  {
    title: '总分',
    dataIndex: 'score',
    key:'score',
    align: 'center',
  },

]

const examRankingList = ref([] as any[]);
const getExamRankingList = async () => {
  const res = await ExamControllerService.listExamVoByPageUsingPost(searchParams.value)
  if(res.code === 0) {
    examRankingList.value = res.data.records
  }
  if (examRankingList.value.length === 0) {
    notification.warning({
      message: '当前考试考生开始考试前，暂无考生排名信息！',
      description:
          '当有考生开始考试时，系统会自动更新考生排名信息，请耐心等待。',
      onClick: () => {
        console.log('Notification Clicked!');
      },
      icon: () => h(ExclamationCircleOutlined, { style: 'color: red' }),
    });
  }
}
const pageChange = () => {
  getExamRankingList()
}
const onShowSizeChange = (current: number, pageSize: number) => {
  searchParams.value.pageSize = pageSize;
  getExamRankingList()
}
onMounted(() => {
  getExamRankingList()
})
</script>

<style scoped>

</style>