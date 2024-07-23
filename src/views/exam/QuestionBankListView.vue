<template>
  <div id="questionBankListView">
    <Card size="small" style=" padding: 10px">
      <div style="display: flex; justify-content: space-between;">
        <div style="font-size: 16px">题库</div>
        <div style="display: inline-block; float: right; margin-bottom: 10px">
          <InputSearch
              v-model:value="searchParams.title"
              placeholder="请输入题目名称!"
              enter-button
              @search="onSearch"
              style="min-width: 300px"
          />
        </div>
      </div>
      <div style="display: flex; align-items: center; ">
        <!--              <span style="font-size: 16px; margin-right: 5px">标签: </span>-->
        <Dropdown style="" v-model:open="dropdownVisible" trigger="click">
          <template #overlay>
            <Menu @click="selectTag" style="padding: 10px">
              <div style="width: 300px; height: 300px; overflow-y: auto">
                <div style="margin-left: 10px; font-size: 18px; margin-bottom: 10px">
                  基本:
                </div>
                <MenuItem v-for="i in tags.basic" :key="i.key" style="display: inline-block; background-color:#eff2f699; margin: 0 10px 10px 0" >
                  {{i.key}}
                </MenuItem>
                <div style="margin-left: 10px; font-size: 18px; margin-bottom: 10px">
                  算法:
                </div>
                <MenuItem v-for="i in tags.algorithm" :key="i.key" style="display: inline-block; background-color:#eff2f699; margin: 0 10px 10px 0" >
                  {{i.key}}
                </MenuItem>
                <div style="margin-left: 10px; font-size: 18px; margin-bottom: 10px">
                  基础数据结构:
                </div>
                <MenuItem v-for="i in tags.basicDataStructures" :key="i.key" style="display: inline-block; background-color:#eff2f699; margin: 0 10px 10px 0" >
                  {{i.key}}
                </MenuItem>
              </div>
            </Menu>
          </template>
          <a-button type="primary">
            标签
            <DownOutlined/>
          </a-button>
        </Dropdown>
      </div>
      <div class="problemsItemList" style="height: 100%; margin-top: 10px" >
        <div class="problemsItem" v-for="item in dataList.records" :key="item">
          <FundProjectionScreenOutlined class="problemsItemIcon" />
          <div style="display: flex; flex: 40; flex-direction: column">
            <div style="font-size: 16px">{{item.title}}</div>
            <span >
                  <Tag
                      v-for="tag in JSON.parse(item.tags)"
                      :key="tag"
                      style="font-size: 14px; padding:0 5px"
                      color="green"
                  >
                    {{ tag }}
                  </Tag>
                </span>
          </div>
          <div style="display: flex;align-items: center">
            <aButton type="primary" @click="handleClick(item.id)">
              查看详情
            </aButton>
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
    <a-drawer style="display: flex" ok-text="关闭" :width="440" :visible="visible" @ok="handleOk" @cancel="handleCancel" >
      <template #title>
        题目详情
      </template>
      <div style="display: flex; flex-direction: column;">
        <h2>{{question?.title}}</h2>
        <MdViewer style="padding: 20px;  "
                  :value="question?.content || ''"></MdViewer>
        <div style="flex: 2; margin: 0 auto">
<!--          <a-upload :show-upload-list="false"  :custom-request="customRequestImg" >-->
<!--            <img  :src="editUserDetail.userAvatar" style="width: 150px; border-radius: 10px" alt="">-->
<!--          </a-upload>-->
        </div>
        <div style="display: flex;flex: 5;  margin-top: 70px">
<!--          <Form v-bind="formItemLayout" style="flex:5;max-width: 320px;margin: 0 auto;  display: flex; flex-direction: column;  justify-content: center">-->
<!--            <FormItem  label-align="left" label="用户名:" name="userName">-->
<!--              <Input width="300" v-model:value="editUserDetail.userName"></Input>-->
<!--            </FormItem>-->
<!--            <FormItem label-align="left" label="用户简介" name="userProfile">-->
<!--              <Input width="300" v-model:value="editUserDetail.userProfile"></Input>-->
<!--            </FormItem>-->
<!--          </Form>-->
        </div>
      </div>
    </a-drawer>
  </div>
</template>

<script setup lang="ts">
import {
  Card,
  InputSearch,
  Button as aButton,
  Pagination,
  Dropdown,
  Menu,
  MenuItem,
  type MenuProps, Tag, Form, FormItem, Input
} from 'ant-design-vue'
import {ref} from "vue";
import {DownOutlined, FundProjectionScreenOutlined, PlusOutlined} from "@ant-design/icons-vue";
import {QuestionControllerService, QuestionVO, UserControllerService, UserUpdateMyRequest} from "../../../generated";
import {onMounted} from "@vue/runtime-core";
import message from "@arco-design/web-vue/es/message";
import MdViewer from "@/components/MdViewer.vue";
const visible = ref(false);
const total = ref(0)

const handleClick = (id: string) => {
  loadQuestion(id)
  visible.value = true;
};
const searchParams = ref({
  title: '',
  current: 1,
  pageSize: 10,
  tags: [] as any[],
  questionDegree: -1,
})
// 分页参数
const pageSizeOptions = ref<string[]>(['10', '20', '30', '40', '50']);
const showModal = () => {

}
const handleOk = async () => {

  visible.value = false;
};
const handleCancel = () => {

  visible.value = false;
}
const onShowSizeChange = (current: number, pageSize: number) => {
  searchParams.value.pageSize = pageSize;
  loadData()
};
const pageChange = () => {
  loadData()
}
const onSearch = () => {
  loadData()
}
const dropdownVisible = ref(false);
const selectDegree: MenuProps['onClick'] = e => {
  console.log(e.key);
};

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
const dataList = ref([])
const loadData = async () => {
  const res = await QuestionControllerService.listQuestionByPageUsingPost(
      searchParams.value
  )
  if (res.code === 0) {
    dataList.value = res.data

    console.log(dataList.value)
  }
}

const getQuestionTotal = async () => {
  const res = await QuestionControllerService.getQuestionCountUsingGet()
  total.value = res.data
}
let id = ref<string>("1769280762168754177")
const question = ref<QuestionVO>()
const selectTag : MenuProps['onClick'] = e => {
  searchParams.value.tags = []
  searchParams.value.questionDegree = -1;
  searchParams.value.tags.push(e.key)
  dropdownVisible.value = false;
  loadData()
}
const loadQuestion = async (id: string) => {

  const res = await QuestionControllerService.getQuestionVoByIdUsingGet(
      id as any
  )
  if (res.code === 0) {
    question.value = res.data
    console.log(question.value)
  } else {
    message.error("加载失败:" + res.message)
  }
}
onMounted(() => {
  loadData()
  getQuestionTotal()
})
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