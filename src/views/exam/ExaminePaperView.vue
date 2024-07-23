<template>
  <div id="ExaminePaperView">
    <div style="padding: 10px; background:#ffffff; height: 85vh; margin: 20px 200px; border-radius: 10px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);">
      <Table class="ant-table-striped" :columns="columns" :data-source="questionList" :pagination="false"
             style="" loading="true;"
             >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'status'">
            <CheckCircleOutlined style="color: rgb(45, 183, 93); font-size: 16px"/>

          </template>
          <template v-if="column.key === 'title'">
            <div style="color: #1c80f2; cursor: pointer; font-weight: 500; font-size: 16px" @click="toQuestionPage(record.id)" class="tableTitle">
              {{ record.title }}
            </div>
          </template>
          <template v-if="column.key === 'questionDegree'">
            <div v-if="record.questionDegree == 0">简单</div>
            <div v-else-if="record.questionDegree == 1">中等</div>
            <div v-else-if="record.questionDegree == 2">困难</div>
          </template>
          <template v-if="column.key === 'tags'">
                <span >
                  <Tag
                      v-for="tag in JSON.parse(record.tags)"
                      :key="tag"
                      style="font-size: 14px; padding:0 5px"
                      color="green"
                  >
                    {{ tag }}
                  </Tag>
                </span>
          </template>
          <template v-if="column.key === 'answerNumber'">
            <div style="font-size: 18px; font-weight: 500; cursor: pointer" class="answerNum" @click="toSolutionLisView(record.id, 'solution')">{{record.answerNumber}}</div>
          </template>
          <template v-if="column.key === 'id' ">
            <div style="font-size: 16px">
              {{ record.id }}
            </div>

          </template>
          <template v-if="column.key ==='submitNum'">
            <div style="font-size: 16px">

              <Progress :percent="record.submitNum !== 0 ? (record.acceptedNum / record.submitNum).toFixed(3)*100 : 0 " size="small" status="active" style="display: flex;  width: 150px; text-align: center; align-items: baseline" :format="() => record.submitNum + '/' + '917' + '(' + (record.submitNum / 917).toFixed(2)*100 +'%)'" ></Progress>
<!--              {{ record.submitNum !== 0 ? (record.acceptedNum / record.submitNum).toFixed(3)*100 : 0 }}%-->
            </div>
          </template>
          <template v-if="column.key==='degree'">
            <div style="font-size: 16px; color: #FFB800">中等</div>
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
    </div>
  </div>
</template>

<script setup lang="ts">


import {useStore} from "vuex";
import {type MenuProps, Pagination, Progress, Table, Tag} from "ant-design-vue";
import {CheckCircleOutlined} from "@ant-design/icons-vue";
import {computed, ref} from "vue";
import {QuestionControllerService, QuestionGroupControllerService, QuestionUpdateRequest} from "../../../generated";
import {useRoute, useRouter} from "vue-router";
import message from "@arco-design/web-vue/es/message";
import {onMounted} from "@vue/runtime-core";
const open = ref<boolean>(false);
const route = useRoute()
const router = useRouter();
const pageSizeOptions = ref<string[]>(['10', '20', '30', '40', '50']);
const onShowSizeChange = (current: number, pageSize: number) => {
  console.log(current, pageSize);
  searchParams.value.pageSize = pageSize;
  loadData()
};

const index = ref(1)
const dropdownVisible = ref(false);
const toSolutionLisView = (id: number, msg: string) => {
  router.push({
    path: `/view/question/${id}`,
    query: {
      msg: msg
    }
  })
}

const tags1 = ref({

})
// 标签测试
const tags = ref(
    {
      basic: [
        {
          key: '数组'
        },
        {
          key: '字符串'
        },
        {
          key: '排序'
        },
        {
          key: '矩阵'
        },
        {
          key: '模拟'
        },
        {
          key: '枚举'
        },
        {
          key: '字符串匹配'
        },
        {
          key: '桶排序'
        },
        {
          key: '计数排序'
        },
        {
          key: '基数排序'
        }
      ],
      algorithm: [
        {
          key: '动态规划',
        },
        {
          key: '贪心',
        },
        {
          key: '深度优先搜索'
        },
        {
          key: '二分查找'
        },
        {
          key: '广度优先搜索'
        },
        {
          key: '回溯'
        },
        {
          key: '递归'
        },
        {
          key: '分治'
        },
        {
          key: '记忆化搜索'
        },
        {
          key: '归并排序'
        },
        {
          key: '快速选择'
        }
      ],
      basicDataStructures: [
        {
          key: '哈希表'
        },
        {
          key: '树'
        },
        {
          key: '二叉树'
        },
        {
          key: '堆(优先队列)'
        },
        {
          key: '栈'
        },
        {
          key: '图'
        },
        {
          key: '链表'
        },
        {
          key: '单调栈'
        },
        {
          key: '有序集合'
        },
        {
          key: '二叉搜索树'
        },
        {
          key: '队列'
        },
        {
          key: '拓扑排序'
        },
        {
          key: '最短路'
        },
        {
          key: '单调队列'
        },
        {
          key: '双向链表'
        },
        {
          key: '最小生成树'
        },
        {
          key: '强连通分量'
        },
        {
          key: '欧拉回路'
        },
        {
          key: '双连通分量'
        }
      ]
    },
)

const pageChange = () => {
  loadData()
}
const arr = [10]
/**
 * 根据题目id 获取老的数据
 */
const pagination = computed(() => ({
  total: total1.value,
  current: searchParams.value.current,
  pageSize: searchParams.value.pageSize,
}));

const selectDegree: MenuProps['onClick'] = e => {
  console.log(e.key);
};

const toQuestionPage = (id: number) => {
  console.log(id)
  router.push({
    path: `/user/student/practice/question/${id}`,

  })
}

const form = ref(
    {
      "answer": "暴力破解",
      "content": "题目内容",
      "judgeCase": [
        {
          "input": "1 2",
          "output": "3 4"
        }
      ],
      "judgeConfig": {
        "memoryLimit": 1000,
        "stackLimit": 1000,
        "timeLimit": 1000
      },
      "tags": [
        "栈", "简单"
      ],
      "title": "A + B"
    }
)

const loadData1 = async () => {
  //改为选中传入id即可
  const id = route.query.id;
  if (!id) {
    return;
  }
  const res = await QuestionControllerService.getQuestionVoByIdUsingGet(id as any);
  if (res.code === 0) {
    //todo 赋值
  } else {
    message.error('加载失败' + res.message)
  }
}
const showModal = () => {
  open.value = true;

};

// 随机一题
const randomQuestion = () => {
  router.push({
    // path: `/view/question/${id}`,
    path: '/view/question/1769280762168754177',
    replace: true
  })
}

const handleOk = (e: MouseEvent) => {
  console.log(e);
  open.value = false;
  console.log(form.value.judgeCase)
};
const columns = [

  {
    title: '题目',
    dataIndex: 'title',
    key: 'title',
    align: 'center',
    width: 250
  },
  {
    title: '题解数',
    key: 'answerNumber',
    dataIndex: 'answerNumber',
    align: 'center',
    width: 250

  },
  {
    title: '标签',
    key: 'tags',
    dataIndex: 'tags',
    align: 'left',
    width: 250
  },

  {
    title: '难度',
    key: 'questionDegree',
    dataIndex: 'questionDegree',
    align: 'center',
    width: 250

  },
  // {
  //   title: '提交通过率',
  //   key: 'submitNum',
  //   dataIndex: 'submitNum',
  //   align: 'left',
  //   sorter: (a: QuestionUpdateRequest, b: QuestionUpdateRequest) => (a.submitNum !== 0 ? ((a.acceptedNum as any) / (a.submitNum as any)) : 0) - ((b.submitNum !== 0) ? ((b.acceptedNum as any) / (b.submitNum as any)) : 0)
  // },
];

interface Props {
  id: any
}
const props = withDefaults(defineProps<Props>(), {
  id: () => ""
})
const dataList = ref([])
const total1 = ref(0)
const searchParams = ref({
  pageSize: 10,
  current: 1,
})

const doChange = () => {

}
const onSearch = () => {
  searchParams.value = {
    ...searchParams.value,
    current: 1
  }
  loadData()
}
const questionList = ref([] as any[])
const userList = ref([] as any[])
const loadData = async () => {
  const res = await QuestionGroupControllerService.getQuestionGroupByIdUsingGet(props.id);
  questionList.value = res?.data?.questionList as any[] ?? []
  userList.value = res.data?.userGroupList ?? []
}

onMounted(() => {
  loadData()
})
</script>

<style scoped>
#ExaminePaperView {
  padding: 0 10px;
}
[data-doc-theme='light'] .ant-table-striped :deep(.table-striped) td {
  background-color: #fafafa;
}
.table-striped {
  background-color: #fafafa !important;
}

[data-doc-theme='dark'] .ant-table-striped :deep(.table-striped) td {
  background-color: rgb(29, 29, 29);
}
</style>