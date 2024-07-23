<template>
  <div id="questionView">
    <a-row :gutter="24">
      <a-col :span="18">
        <Card
            style="border-radius: 15px; height: 100%; margin-top: 10px; margin-left: -10px;box-shadow: 0 2px 6px rgba(7,0,0,0.06),0 4px 8px rgba(7,0,0,0.06),0 6px 12px rgba(7,0,0,0.06)">
          <div style="display: flex; flex-direction: row">
            <div style="display: flex; margin-right: 15px; align-items: center">
              <!--              <span style="font-size: 16px; margin-right: 5px">状态: </span>-->
<!--              <Dropdown trigger="click">-->
<!--                <template #overlay>-->
<!--                  <a-menu @click="selectDegree">-->
<!--                    <a-menu-item key="1" style="font-size: 16px;">-->
<!--                      <a-space>-->
<!--                        <MinusOutlined style="color:#FF2D55;"/>-->
<!--                        未开始-->
<!--                      </a-space>-->
<!--                    </a-menu-item>-->
<!--                    <a-menu-item key="2" style="font-size: 16px;">-->
<!--                      <a-space>-->
<!--                        <CheckOutlined style="color: rgb(45, 183, 93)"/>-->
<!--                        已解答-->
<!--                      </a-space>-->
<!--                    </a-menu-item>-->
<!--                    <a-menu-item key="3" style="font-size: 16px;">-->
<!--                      <a-space>-->
<!--                        <ExclamationCircleOutlined style="color: #FFB800"/>-->
<!--                        尝试过-->
<!--                      </a-space>-->

<!--                    </a-menu-item>-->
<!--                  </a-menu>-->
<!--                </template>-->
<!--                <a-button>-->
<!--                  状态-->
<!--                  <DownOutlined/>-->
<!--                </a-button>-->
<!--              </Dropdown>-->
            </div>
            <div style="display: flex; margin-right: 15px; align-items: center">
              <!--              <span style="font-size: 16px; margin-right: 5px">难度: </span>-->
              <Dropdown trigger="click">
                <template #overlay>
                  <Menu @click="selectDegree">
                    <MenuItem key="-1" style="color: #cfe7d7; font-size: 16px">
                      所有
                    </MenuItem>
                    <MenuItem key="0" style="color: #00af9b; font-size: 16px">
                      简单
                    </MenuItem>
                    <MenuItem key="1" style="color: #FFB800; font-size: 16px">
                      中等
                    </MenuItem>
                    <MenuItem key="2" style="color: #FF2D55; font-size: 16px">
                      困难
                    </MenuItem>
                  </Menu>
                </template>
                <a-button>
                  难度
                  <DownOutlined/>
                </a-button>
              </Dropdown>
            </div>
            <div style="display: flex; margin-right: 15px; align-items: center">
              <!--              <span style="font-size: 16px; margin-right: 5px">标签: </span>-->
              <Dropdown style="" v-model:open="dropdownVisible" trigger="click">
                <template #overlay>
                  <Menu @click="selectTag" style="padding: 10px">
                    <div style="width: 300px; height: 300px; overflow-y: auto">
                      <div style="margin-left: 10px; font-size: 18px; margin-bottom: 10px">
                        基本:
                      </div>

                      <MenuItem v-for="i in tags.basic" :key="i.key"   @click="selectTagColor(i)"  :class="{ selected: selectedTag === i.key }"   style="display: inline-block; background-color:rgba(229,237,246,0.6); margin: 0 10px 10px 0" >
                        {{i.key}}
                      </MenuItem>
                      <div style="margin-left: 10px; font-size: 18px; margin-bottom: 10px">
                        算法:
                      </div>
                      <MenuItem v-for="i in tags.algorithm" :key="i.key" style="display: inline-block; background-color:rgba(229,237,246,0.6); margin: 0 10px 10px 0" >
                        {{i.key}}
                      </MenuItem>
                      <div style="margin-left: 10px; font-size: 18px; margin-bottom: 10px">
                        基础数据结构:
                      </div>
                      <MenuItem v-for="i in tags.basicDataStructures" :key="i.key" style="display: inline-block; background-color:rgba(229,237,246,0.6); margin: 0 10px 10px 0" >
                        {{i.key}}
                      </MenuItem>
                    </div>
                  </Menu>
                </template>
                <a-button>
                  标签
                  <DownOutlined/>
                </a-button>
              </Dropdown>
            </div>
            <div style="position: absolute; right: 20px">
              <a-space>
                <div style="display: flex; ">
                  <InputSearch
                      v-model:value="searchParams.title"
                      placeholder="输入题目"
                      enter-button
                      @search="onSearch"
                  />
                </div>
                <div @click="randomQuestion" style="display: flex; align-items: center; cursor: pointer">
                  <a-space>
                    <div style="width: 40px; height: 40px; border-radius: 20px; background:blueviolet; text-align: center; line-height: 50px; box-shadow: 6px 4px 6px -1px #0000001a">
                      <icon-refresh :style="{fontSize:'24px',color:'white'}" />
                    </div>
                    <div style="font-size: 18px; color: blueviolet; font-weight: 500">
                      随机一题
                    </div>
                  </a-space>
                </div>
              </a-space>

            </div>

          </div>
          <Table class="ant-table-striped" :columns="columns" :data-source="dataList" :pagination="false"
                 style="margin-top: 10px" loading="true"
                 :row-class-name="(_record, index) => (index % 2 === 1 ? 'table-striped' : null)">
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'status'">
                <CheckCircleOutlined style="color: rgb(45, 183, 93); font-size: 16px"/>
              </template>
              <template v-if="column.key === 'title'">
                <div style="cursor: pointer; font-weight: 500; font-size: 16px" @click="toQuestionPage(record.id)" class="tableTitle">
                  {{ record.title }}
                </div>
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
              <template v-if="column.key === 'answerNum'">
                <div style="font-size: 18px; font-weight: 500; cursor: pointer" class="answerNum" @click="toSolutionLisView(record.id, 'solution')">{{record.answerNumber}}</div>
              </template>
              <template v-if="column.key === 'id' ">
                <div style="font-size: 16px">
                  {{ record.id }}
                </div>

              </template>
              <template v-if="column.key ==='submitNum'">
                <div style="font-size: 16px">
                  {{ record.submitNum !== 0 ? ((record.acceptedNum / record.submitNum)*100).toFixed(2) : 0 }}%
                </div>
              </template>
              <template v-if="column.key==='degree'">
                <div style="font-size: 16px; color: #00af9b" v-if="record.questionDegree === 0">简单</div>
                <div style="font-size: 16px; color: #FFB800" v-if="record.questionDegree === 1">中等</div>
                <div style="font-size: 16px; color: #FF2D55" v-if="record.questionDegree === 2">困难</div>
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
        </Card>
      </a-col>
      <a-col :span="6">
        <a-row >
          <a-col >
            <Card
                style="border-radius: 15px; display: flex; flex-direction: column; margin-top: 10px; box-shadow: 0 2px 6px rgba(7,0,0,0.06),0 4px 8px rgba(7,0,0,0.06),0 6px 12px rgba(7,0,0,0.06); margin-bottom: 10px">
              <div style="flex: 1">
                <div style="font-size: 18px; font-weight: 500">当前进度</div>
              </div>
              <div style="display:flex; flex: 3; padding-top: 20px; justify-content: space-between;">
                <div style="flex: 2;display:flex;align-items: center">
                  <Progress strokeWidth="4" type="circle" :percent="((simpleQuestion+mediumQuestion+difficultQuestion)/allQuestionCount*100).toFixed(2) " :size="90" :format="() => (((simpleQuestion+mediumQuestion+difficultQuestion)/allQuestionCount*100).toFixed(2) === 'NaN' ? 0 : ((simpleQuestion+mediumQuestion+difficultQuestion)/allQuestionCount*100).toFixed(2)) + '%'">
                  </Progress>
                </div>
                <div style="display: flex; flex: 2; align-items: center">
                  <div style="flex: 0.5;text-align: center; margin-right: 5px">
                    <div>
                      <span STYLE="color:#00AF9B; font-size: 16px">简单</span>
                    </div>
                    <div>
                      <div style="color: #FF2D55;font-weight: 500; font-size: 16px">{{simpleQuestion ?? 0}}</div>
                      <hr style="max-width: 25px;  margin: 0 auto">
                      <div style="color: #3c3c434d; font-size: 14px; font-weight: 500">{{ allSimpleQuestionCount }}</div>
                    </div>
                  </div>
                  <div style="flex: 0.5;text-align: center; margin-right: 5px">
                    <div>
                      <span style="color: #FFB800; font-size: 16px">中等</span>
                    </div>
                    <div>
                      <div style="color: #FF2D55;font-weight: 500; font-size: 16px">{{mediumQuestion ?? 0}}</div>
                      <hr style="max-width: 25px;  margin: 0 auto">
                      <div style="color: #3c3c434d; font-size: 14px; font-weight: 500">{{ allMediumQuestionCount }}</div>
                    </div>
                  </div>
                  <div style="flex: 0.5;text-align: center; margin-right: 5px">
                    <div>
                      <span style="color: #FF2D55; font-size: 16px">困难</span>
                    </div>
                    <div>
                      <div style="color: #FF2D55;;font-weight: 500; font-size: 16px">{{difficultQuestion ?? 0}}</div>
                      <hr style="max-width: 25px;  margin: 0 auto">
                      <div style="color: #3c3c434d; font-size: 14px; font-weight: 500">{{allDifficultQuestionCount}}</div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
            <!--        <Card style="box-shadow:0 2px 6px #0000000a,0 4px 8px #00000005,0 6px 12px #00000005; margin-top: 10px">-->
            <!--          <div>-->
            <!--            <div style="font-size: 18px; font-weight: 500">刷题日历</div>-->
            <!--          </div>-->
            <!--          <div style="width: 290px; margin-top: 10px">-->
            <!--            <Calendar v-model:value="value" :fullscreen="false" @panelChange="onPanelChange"/>-->
            <!--          </div>-->
            <!--        </Card>-->
          </a-col>
          <a-col >
            <RankingList></RankingList>
          </a-col>
        </a-row>
      </a-col>


    </a-row>


  </div>

</template>
<script lang="ts" setup>
import {SmileOutlined, DownOutlined} from '@ant-design/icons-vue';
import {computed, nextTick, ref} from "vue";
import {
  ExamControllerService,
  QuestionControllerService,
  QuestionQueryRequest,
  QuestionUpdateRequest,
  UserControllerService
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import {onMounted} from "@vue/runtime-core";
import { IconRefresh,  } from '@arco-design/web-vue/es/icon';
import {
  PlusOutlined,
  FieldTimeOutlined,
  DatabaseOutlined,
  CodepenOutlined,
  MinusCircleOutlined,
  MinusOutlined,
  CheckOutlined,
  InfoOutlined,
  ExclamationCircleOutlined,
  CheckCircleOutlined
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
  Space,
  Card,
  Row,
  Col,
  Pagination,
  Tooltip,
  Progress,
  Menu,
  MenuItem,
  Calendar
} from 'ant-design-vue';
import {useRoute, useRouter} from "vue-router";
import MdEditor from "@/components/MdEditor.vue";
import type {MenuProps} from 'ant-design-vue';
import RankingList from "@/components/RankingList.vue";

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
    path: `/user/student/practice/question/${id}`,
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

const selectTag : MenuProps['onClick'] = e => {
  searchParams.value.tags = []
  searchParams.value.questionDegree = -1;
  searchParams.value.tags.push(e.key as any)
  loadData()
}
const selectTagColor=(e: any) => {

  selectedTag.value = e.key as any;
  console.log(selectedTag.value)
}
const selectedTag = ref(null)// 用来跟踪选中的标签
const selectDegree: MenuProps['onClick'] = e => {
  // searchParams.value = {
  //   ...searchParams.value,
  //   questionDegree: e.key as any
  // }
  searchParams.value.tags = [];
  searchParams.value.questionDegree = e.key as number;
  loadData()
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
  const res = await QuestionControllerService.getQuestionVoByIdUsingGet(id as any) ?? [];
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
const randomQuestion = async () => {
  const res = await QuestionControllerService.getQuestionRandomUsingGet() ?? []
  if (res.code === 0) {
    //todo 赋值
    await router.push({
      path: `/user/student/practice/question/${res.data?.id}`,   // 跳转到题目详情页
    })
  }else {
    message.error('加载失败' + res.message)
  }
}

const handleOk = (e: MouseEvent) => {
  console.log(e);
  open.value = false;
  console.log(form.value.judgeCase)
};
const columns = [
  // {
  //   title: '状态',
  //   dataIndex: 'status',
  //   key: 'status',
  //   align: 'left',
  //   width:120
  // },

  {
    title: '题目',
    dataIndex: 'title',
    key: 'title',
    align: 'left',
    width: 250
  },
  {
    title: '题解',
    dataIndex: 'answerNum',
    key: 'answerNum',
    align: 'left',
    width: 150
  },
  {
    title: '标签',
    key: 'tags',
    dataIndex: 'tags',
    align: 'left',

  },
  {
    title: '通过率',
    key: 'submitNum',
    dataIndex: 'submitNum',
    align: 'center',
    sorter: (a: QuestionUpdateRequest, b: QuestionUpdateRequest) => (a.submitNum !== 0 ? ((a.acceptedNum as any) / (a.submitNum as any)) : 0) - ((b.submitNum !== 0) ? ((b.acceptedNum as any) / (b.submitNum as any)) : 0)
  },
  {
    title: '难度',
    key: 'degree',
    dataIndex: 'degree',
    align: 'center',
    width: 100
  }
];


const dataList = ref([])
const total1 = ref(0)
const searchParams = ref({
  pageSize: 20,
  current: 1,
  title: '',
  questionDegree: -1,
  tags: [] as any[]
})

const onSearch = () => {
  searchParams.value = {
    ...searchParams.value,
    current: 1
  }
  loadData()
}


const loadData = async () => {
  const res = await QuestionControllerService.listQuestionVoByPageUsingPost(searchParams.value);
  if (res.code == 0) {
    dataList.value = res.data.records;
    total1.value = res.data.total;
    console.log(total1.value)
    console.log("数据数量", dataList.value.length)

  } else {
    message.error("加载失败" + res.message)
  }
}

const simpleQuestion = ref(0) ?? 0
const mediumQuestion = ref(0) ?? 0
const difficultQuestion = ref(0) ?? 0
const getCurrentUserProgress = async () => {
  const res = await UserControllerService.getScheduleUsingGet()
  simpleQuestion.value = res.data?.simple as any;
  mediumQuestion.value = res.data?.medium as any;
  difficultQuestion.value = res.data?.difficulty as any;

}

const allQuestionCount = ref(0)
const getAllQuestionCount = async () => {
  const res = await QuestionControllerService.getQuestionCountUsingGet()
  allQuestionCount.value = res.data as any;
}

const allSimpleQuestionCount = ref(0)
const allMediumQuestionCount = ref(0)
const allDifficultQuestionCount = ref(0)
const getDifferentQuestionCount = async () => {
  const res = await QuestionControllerService.getDegreeNumUsingGet()
  allSimpleQuestionCount.value = res.data?.simple as any;
  allMediumQuestionCount.value = res.data?.medium as any;
  allDifficultQuestionCount.value = res.data?.difficulty as any;
}

const sendMessage = () => {
  const res = UserControllerService.getNowQuestionGroupUsingGet()
}

onMounted(() => {
  loadData()
  getCurrentUserProgress()
  getAllQuestionCount()
  getDifferentQuestionCount()
  sendMessage()
})
</script>
<style scoped>

#questionView {
  //margin-top: -20px;
  padding: 0 180px;
}



.arco-form-item-label-col > .arco-form-item-label {
  //font-size: 20px;
}

:where(.css-dev-only-do-not-override-1hsjdkk).ant-form-item .ant-form-item-label > label {
  //font-size: 16px;
}

:where(.css-dev-only-do-not-override-1hsjdkk).ant-btn-default {
  display: flex;
  align-items: center;
  width: 120px;
  height: 36px;
  color: #262626bf;
  font-size: 16px;
  background-color: #000a200d;
  text-align: left;
  justify-content: space-between;
}


.tableTitle:hover {
  color: blueviolet;
}
.answerNum:hover {
  color: blueviolet;
}

</style>
<style>
:where(.css-dev-only-do-not-override-1hsjdkk).ant-table-wrapper .ant-table-thead >tr>th, :where(.css-dev-only-do-not-override-1hsjdkk).ant-table-wrapper .ant-table-thead >tr>td {
  font-size: 16px;
  //color: #3c3c4399;

}
.ant-input-group {
  width: 300px;

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
.selected {
  background-color: #563131 !important;
}
</style>

