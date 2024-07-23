<template>
  <div id="ExamineSubmitListView">

    <div style="padding: 10px; background:#ffffff; height: 85vh; margin: 20px 200px; border-radius: 10px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);">
      <Table class="ant-table-striped" :columns="columns" :data-source="examSubmitList" :pagination="false"
             style="" loading="true;"
      >
        <template #empty>

        </template>

        <template #bodyCell="{ column, record }">
          <div v-if="column.key === 'language'">
            {{record.language}}
          </div>
          <div v-if="column.key ==='score'">
            {{record.score}}
          </div>
          <div v-if="column.key === 'tags'">
            <Tag
                v-for="tag in JSON.parse(record.questionVO.tags)"
                :key="tag"
                style="font-size: 14px;"
                color="green"
            >
              {{ tag }}
            </Tag>
          </div>
          <div v-if="column.key === 'questionName'">
            {{record?.questionVO?.title}}
          </div>
          <div v-if="column.key === 'userName'">
            {{record?.questionVO?.userVO?.userName}}
          </div>
          <div v-if="column.key === 'userAccount'">
            {{record?.questionVO?.userVO?.userAccount}}
          </div>
          <div v-if="column.key === 'submitTime'">
            {{ moment(record?.exam?.submitTime).format('YYYY-MM-DD HH:mm:ss') }}
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
import {Pagination, Table, NotificationPlacement, notification, Tag} from "ant-design-vue";
import {ExamControllerService, ExamSubmitControllerService} from "../../../generated";
import {onMounted} from "@vue/runtime-core";
import {ref, h} from "vue";
import {ExclamationCircleOutlined, SmileOutlined} from "@ant-design/icons-vue";
import moment from "moment/moment";
interface Props {
  id: any
}
const props = withDefaults(defineProps<Props>(), {
  id: () => ""
})
const pageSizeOptions = ref<string[]>(['10', '20', '30', '40', '50']);
const onShowSizeChange = (current: number, pageSize: number) => {
  searchParams.value.pageSize = pageSize;
  // loadData()
};
const pageChange = () => {
  getExamSubmitList()
}
const total = ref(0)
const [api, contextHolder] = notification.useNotification();
const searchParams = ref({
  current: 1,
  pageSize: 10,
  quesitonGroupId: props.id
})
const examSubmitList = ref([] as any[])
const getExamSubmitList = async () => {

  const res = await ExamSubmitControllerService.listExamAllSubmitVoUsingPost(searchParams.value)
  if (res.code === 0) {
    examSubmitList.value = res.data as any[]
    total.value = res.total
  }
  if (examSubmitList.value.length === 0) {
    notification.warning({
      message: '当前考试考生尚未提交任何试题',
      description:
          '当有考生提交试题时，将会进行更新！',
      onClick: () => {
        console.log('Notification Clicked!');
      },
      icon: () => h(ExclamationCircleOutlined, { style: 'color: red' }),
    });
  }
}

onMounted(() => {
  getExamSubmitList()
})
const columns = [
  {
    title: '学号',
    dataIndex: 'userAccount',
    key: 'userAccount',
    width: 150,
  },
  {
    title: '考生姓名',
    dataIndex: 'userName',
    key: 'userName',
    width: 150,
  },
  {
    title: '题目名称',
    dataIndex: 'questionName',
    key: 'questionName',
    width: 150,
  },
  {
    title: '标签',
    dataIndex: 'tags',
    key: 'tags',
    width: 150,
  },
  {
    title: '编程语言',
    dataIndex: 'language',
    key: 'language',
    width: 150,
  },
  {
    title: '最终得分',
    dataIndex: 'score',
    key:'score',
    width: 150,
  },
  {
    title: '提交时间',
    dataIndex: 'submitTime',
    key: 'submitTime',
    width: 150,
  }

];
</script>

<style scoped>

</style>