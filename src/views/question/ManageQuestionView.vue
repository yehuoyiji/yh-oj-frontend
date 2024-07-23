<template>
  <Table :columns="columns" :data-source="dataList" bordered
         :pagination="{pageSize:searchParams.pageSize, current:searchParams.pageNum,total:total}">

    <template #bodyCell="{ column, text, record }">
      <template v-if="['id'].includes(column.dataIndex)">
        <div>
          <Input
              v-if="editableData[record.key]"
              v-model:value="editableData[record.key][column.dataIndex]"
              style="margin: -5px 0"
          />
          <template v-else>
            {{ text }}
          </template>
        </div>
      </template>
      <template v-if="['tags'].includes(record)">
              <span>
                <Tag
                    v-for="tag in record.tags"
                    :key="tag"
                    :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'"
                >
                  {{ tag.toUpperCase() }}
                </Tag>
              </span>
      </template>

      <template v-else-if="column.dataIndex === 'operation'">
        <div class="editable-row-operations">
          <span v-if="editableData[record.key]">
            <aButton @click="save(record.key)" style="margin-right: 10px">保存</aButton>
            <aButton title="确定取消吗?" >
              取消
            </aButton>
          </span>
          <span v-else>
            <a-space>
              <aButton type="primary" @click="doUpdate(record)" style="margin-right: 10px">编辑</aButton>
              <aButton type="primary" danger @click="doDelete(record)">删除</aButton>
            </a-space>

          </span>
        </div>
      </template>
    </template>
  </Table>
</template>
<script lang="ts" setup>
import {cloneDeep} from 'lodash-es';
import {reactive, ref} from 'vue';
import type {UnwrapRef} from 'vue';
import {Table, Input, TypographyLink, Popconfirm, Button as aButton, Tag} from 'ant-design-vue';
import {Question, QuestionControllerService} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import {onMounted} from "@vue/runtime-core";

import {useRouter} from "vue-router";

const dataList = ref([])
const total = ref(0)
const searchParams = ref({
  pageSize: 10,
  pageNum: 1
})

const loadData = async () => {
  const res = await QuestionControllerService.listQuestionByPageUsingPost(
      searchParams.value
  );
  if (res.code == 0) {
    dataList.value = res.data.records;
    total.value = res.data.total;
  } else {
    message.error("加载失败" + res.message)
  }
}

onMounted(() => {
  loadData()
})
const columns = [
  {
    title: 'id',
    dataIndex: 'id',
    // width: '25%',
  },
  {
    title: '题目',
    dataIndex: 'title',
    // width: '15%',
  },
  // {
  //   title: '内容',
  //   dataIndex: 'content',
  //   width: '20%',
  // },
  {
    title: '标签',
    dataIndex: 'tags',
    // width: '40%',
  },
  // {
  //   title: '答案',
  //   dataIndex: 'answer',
  //   // width: '40%',
  // },
  {
    title: '提交数',
    dataIndex: 'submitNum',
    // width: '40%',
  },
  {
    title: '用户Id',
    dataIndex: 'userId',
    // width: '40%',
  },
  // {
  //   title: '创建时间',
  //   dataIndex: 'createTime',
  //   // width: '40%',
  // },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    // width: '40%',
  },
  {
    title: '判题配置',
    dataIndex: 'judgeConfig',
    // width: '40%',
  },
  {
    title: '判题用例',
    dataIndex: 'judgeCase',
    // width: '40%',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    width: '10%'
  },
];

interface DataItem {
  id: number;
  title: string;
  content: string;
  tags: string;
  answer: string;
  submit: number;

}

const data: DataItem[] = [];
for (let i = 0; i < 100; i++) {
  data.push({
    id: i,
    title: `Edrward ${i}`,
    content: "内容",
    tags: "简单",
    answer: "答案",
    submit: i * 2
  });
}

const dataSource = ref(data);
const editableData: UnwrapRef<Record<string, DataItem>> = reactive({});

// const edit = (key: string) => {
//   editableData[key] = cloneDeep(dataSource.value.filter(item => key === item.key)[0]);
// };
// const save = (key: string) => {
//   Object.assign(dataSource.value.filter(item => key === item.key)[0], editableData[key]);
//   delete editableData[key];
// };
// const cancel = (key: string) => {
//   delete editableData[key];
// };
const doDelete = async (question: Question) => {
  console.log(question)
  const res = await QuestionControllerService.deleteQuestionUsingPost({id: question.id})
  if (res.code === 0) {
    message.success("删除成功")
  }else {
    await loadData()
    message.error("删除失败")
  }
}
const router = useRouter();
const doUpdate = (question: Question) => {
  router.push({
    path: "/update/question",
    query: {
      id: question.id
    }
  })
}
</script>
<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
</style>
