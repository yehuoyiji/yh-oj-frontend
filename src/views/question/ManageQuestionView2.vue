<template>
  <div id="manageQuestion">
    <a-card style="  box-shadow: 0 2px 6px rgba(7,0,0,0.06),0 4px 8px rgba(7,0,0,0.06),0 6px 12px rgba(7,0,0,0.06); height: 100%; margin: 10px 0 0 0; border-radius: 15px; padding: 20px">
      <div style="display: inline-block">
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
      <div style="display: inline-block; float: right; margin-bottom: 10px">
        <InputSearch
            v-model:value="searchParams.title"
            placeholder="请输入标题搜索"
            enter-button
            @search="onSearch"
            style="min-width: 300px"
        />
      </div>
      <div style="margin-top: 10px">
        <h2 style="display: inline-block; font-weight: 700">题目列表</h2>
        <aButton type="primary" style="float: right" @click="showModal">
          <template #icon>
            <PlusOutlined/>
          </template>
          新建
        </aButton>
      </div>

      <Table  :columns="columns" :data-source="dataList" :pagination="false">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'tags'">
            <span>
              <Tag
                  color="green"
                  v-for="tag in JSON.parse(record.tags)"
                  :key="tag"
              >
                {{ tag }}
              </Tag>
            </span>
          </template>
          <template v-else-if="column.key === 'updateTime'">
            {{moment(record.updateTime).format("YYYY-MM-DD")}}
          </template>
          <template v-else-if="column.key === 'judgeConfig'">

            <Tag v-if="JSON.parse(record.judgeConfig).timeLimit">
              <template #icon>
                <FieldTimeOutlined :style="{fontsize:'16px'}"/>
              </template>
              {{ JSON.parse(record.judgeConfig).timeLimit + "ms" }}
            </Tag>
            <Tag v-if="JSON.parse(record.judgeConfig).memoryLimit">
              <template #icon>
                <CodepenOutlined :style="{fontsize:'16px'}"/>
              </template>
              {{ JSON.parse(record.judgeConfig).memoryLimit + "kb" }}
            </Tag>
            <Tag v-if="JSON.parse(record.judgeConfig).stackLimit">
              <template #icon>
                <DatabaseOutlined :style="{fontsize:'16px'}"/>
              </template>
              {{ JSON.parse(record.judgeConfig).stackLimit + "kb" }}
            </Tag>
          </template>
          <template v-else-if="column.key === 'action'">
            <a-space>
              <aButton @click="showDetailModal(record.id)" type="prmairy" style="background-color:#91b605; color: #ffffff">查看详情</aButton>
              <aButton type="primary" @click="showEditModal(record.id)">编辑</aButton>
              <Popconfirm title="确定删除题目吗?"
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
          <span >{{ props.value }}条/页</span>
        </template>
      </Pagination>
      <Modal v-model:open="open" title="创建题目" @ok="handleOk" width="70vw">
        <div>
          <Form
              name="basic"
              :label-col="{ span: 3 }"
              :wrapper-col="{ span: 16 }"
              autocomplete="off"
              label-align="left"
              style="font-size: 20px"
          >
            <FormItem label="标题:" name="title">
              <Input size="middle" :style="{width:'650px'}" v-model:value="form.title"/>

            </FormItem>
            <FormItem label="难度:" name="degree">
              <Dropdown>
                <template #overlay>
                  <Menu @click="handleMenuClick">

                    <MenuItem key="0">
                      简单
                    </MenuItem>
                    <MenuItem key="1">
                      中等
                    </MenuItem>
                    <MenuItem key="2">
                      困难
                    </MenuItem>
                  </Menu>
                </template>
                <aButton>
                  {{questionDegree === -1 ? "全部" : getQuestionDegree[questionDegree]}}
                  <DownOutlined />
                </aButton>
              </Dropdown>
            </FormItem>
<!--            <FormItem label="标签:" name="tags">-->
<!--              <div v-if="form.tags.length === 0">-->
<!--                <template v-for="(tag, index) in form.tags" :key="tag">-->
<!--                  <Tag @close="handleClose(tag)" closable="true">-->
<!--                    {{ tag }}-->
<!--                  </Tag>-->
<!--                </template>-->
<!--                <Input type="text" ref="inputRef" v-if="inputVisible" size="small" :style="{ width: '78px' }" v-model:value="inputValue" @blur="handleInputConfirm"-->
<!--                       @keyup.enter="handleInputConfirm">-->

<!--                </Input>-->
<!--                <Tag v-else style="background: #fff; border-style: dashed" @click="showInput()">-->
<!--                  <plus-outlined/>-->
<!--                  New Tag-->
<!--                </Tag>-->
<!--              </div>-->
<!--              <div v-else>-->
<!--                <template v-for="(tag, index) in JSON.parse(form.tags as any)" :key="tag">-->
<!--                  <Tag @close="handleClose(tag)" closable="true">-->
<!--                    {{ tag }}-->
<!--                  </Tag>-->
<!--                </template>-->
<!--                <Input type="text" ref="inputRef" v-if="inputVisible" size="small" :style="{ width: '78px' }" v-model:value="inputValue" @blur="handleInputConfirm"-->
<!--                       @keyup.enter="handleInputConfirm">-->

<!--                </Input>-->
<!--                <Tag v-else style="background: #fff; border-style: dashed" @click="showInput()">-->
<!--                  <plus-outlined/>-->
<!--                  New Tag-->
<!--                </Tag>-->
<!--              </div>-->
<!--            </FormItem>-->
            <FormItem label="标签:" name="tags">
              <a-space>
                <Dropdown v-model:visible="tagVisible">
                  <template #overlay>
                    <Menu style="display: inline-block; padding: 10px">
                      <div style="display: inline-block; max-height: 300px; overflow-y: auto">
                        <div style="width: 300px; height: 300px; overflow-y: auto">
                          <div style="margin-left: 10px; font-size: 18px; margin-bottom: 10px">
                            基本:
                          </div>

                          <MenuItem  @click="selectTags(i)" v-for="i in tags.basic" :key="i.key"   style="display: inline-block; background-color:rgba(229,237,246,0.6); margin: 0 10px 10px 0" >
                            {{i.key}}
                          </MenuItem>
                          <div style="margin-left: 10px; font-size: 18px; margin-bottom: 10px">
                            算法:
                          </div>
                          <MenuItem @click="selectTags(i)"  v-for="i in tags.algorithm" :key="i.key" style="display: inline-block; background-color:rgba(229,237,246,0.6); margin: 0 10px 10px 0" >
                            {{i.key}}
                          </MenuItem>
                          <div style="margin-left: 10px; font-size: 18px; margin-bottom: 10px">
                            基础数据结构:
                          </div>
                          <MenuItem @click="selectTags(i)"  v-for="i in tags.basicDataStructures" :key="i.key" style="display: inline-block; background-color:rgba(229,237,246,0.6); margin: 0 10px 10px 0" >
                            {{i.key}}
                          </MenuItem>
                        </div>
                      </div>
                    </Menu>
                  </template>
                  <div v-if="selectedTags.length === 0">
                    <Button style=" display: flex; justify-content: space-between; align-items: center; "
                    >
                      请选择标签
                      <DownOutlined/>
                    </Button>
                  </div>
                  <div style="display: inline-block; width: 400px" v-else>
                    <div style="border: 1px solid #d9d9d9; border-radius: 10px; padding: 5px" >
                      <a-space v-for="(tag, index) in selectedTags" :key="tag" style="max-width: 200px; margin: 5px 2px 5px 2px">
                        <Tag  color="#108ee9" style="display: inline; padding: 5px 10px; " @close="handleClose(tag)" closable="true">
                          {{ tag }}
                        </Tag>
                      </a-space>
                    </div>
                  </div>
                </Dropdown>
                <div v-if="selectedTags.length !== 0">
                  <Button danger @click="clearTags">清空</Button>
                </div>
              </a-space>
            </FormItem>
            <FormItem label="判题配置" name="judgeConfig">
              <br>

              <a-space>
                <span style="width: 80px">时间限制:</span>
                <Input size="middle" :style="{width:'550px'}" v-model:value="form.judgeConfig.timeLimit" addon-after="MS(毫秒)"></Input>
              </a-space>
              <br>
              <br>
              <a-space>
                <span style="width: 80px">内存限制:</span>
                <Input size="middle" :style="{minWidth:'550px'}" v-model:value="form.judgeConfig.memoryLimit" addon-after="KB(千字节)"></Input>
              </a-space>
              <br>
              <br>
              <a-space>
                <span style="width: 80px">堆栈限制:</span>
                <Input size="middle" :style="{width:'550px'}" v-model:value="form.judgeConfig.stackLimit" addon-after="KB(千字节)"></Input>
              </a-space>
            </FormItem>
            <FormItem>
              <span style="width: 80px; font-size: 16px">内容:</span>
              <MdEditor style="min-width: 65vw; " v-model:value="form.content" :handle-change="onContentChange"></MdEditor>
            </FormItem>
            <FormItem label="测试用例:" name="judgeCase">
              <div v-if="form.judgeCase.length === 0">
                <template v-for="jcase in form.judgeCase">
                  <Space style="display: flex; margin-bottom: 8px"
                         align="baseline">

                    <FormItem style="min-width: 300px">
                      <Input v-model:value="jcase.input">{{ jcase.input }}</Input>
                    </FormItem>
                    <FormItem style="min-width: 300px">
                      <Input v-model:value="jcase.output"></Input>
                    </FormItem>
                    <MinusCircleOutlined/>
                  </Space>
                </template>
              </div>
              <div v-else>
                <template v-for="jcase in form.judgeCase">
                  <Space style="display: flex; margin-bottom: 8px"
                         align="baseline">

                    <FormItem style="min-width: 300px">
                      <Input v-model:value="jcase.input">{{ jcase.input }}</Input>
                    </FormItem>
                    <FormItem style="min-width: 300px">
                      <Input v-model:value="jcase.output"></Input>
                    </FormItem>
                    <MinusCircleOutlined/>
                  </Space>
                </template>
              </div>
              <FormItem>
                <aButton type="dashed" block @click="addJudgeCase">
                  <PlusOutlined/>
                  新增测试用例
                </aButton>
              </FormItem>
            </FormItem>
          </Form>
        </div>
        <template #footer>
          <a-button key="back" @click="handleCancel">取消</a-button>
          <a-button key="submit" type="primary" :loading="loading" @click="handleOk">提交</a-button>
        </template>
      </Modal>
      <Modal v-model:open="showDetail" title="题目详情" width="70vw">
        <div>
          <Form
              name="basic"
              :label-col="{ span: 3 }"
              :wrapper-col="{ span: 16 }"
              autocomplete="off"
              label-align="left"
              style="font-size: 20px"
          >
            <FormItem label="标题:" name="title">
              <Input size="middle" :style="{width:'650px'}" v-model:value="questionDetail.title"/>

            </FormItem>
            <FormItem label="难度:" name="degree">
              <Tag v-if="questionDetail.questionDegree === 0">简单</Tag>
              <Tag v-if="questionDetail.questionDegree === 1">中等</Tag>
              <Tag v-if="questionDetail.questionDegree === 2">困难</Tag>
            </FormItem>
            <FormItem label="标签:" name="tags">
              <template v-for="(tag, index) in JSON.parse(questionDetail.tags)" :key="tag">
                <Tag >
                  {{tag }}
                </Tag>
              </template>
            </FormItem>

            <FormItem label="判题配置" name="judgeConfig">
              <br>

              <a-space>
                <span style="width: 80px">时间限制:</span>
                <Input size="middle" :style="{width:'550px'}" v-bind:value="questionDetail.judgeConfig.timeLimit" addon-after="MS(毫秒)">
                  {{questionDetail.judgeConfig.timeLimit}}
                </Input>
              </a-space>
              <br>
              <br>
              <a-space>
                <span style="width: 80px">内存限制:</span>
                <Input size="middle" :style="{minWidth:'550px'}" v-model:value="questionDetail.judgeConfig.memoryLimit" addon-after="KB(千字节)"></Input>
              </a-space>
              <br>
              <br>
              <a-space>
                <span style="width: 80px">堆栈限制:</span>
                <Input size="middle" :style="{width:'550px'}" v-model:value="questionDetail.judgeConfig.stackLimit" addon-after="KB(千字节)"></Input>
              </a-space>
            </FormItem>
            <FormItem>
              <span style="width: 80px; font-size: 16px">内容:</span>
              <MdEditor style="min-width: 65vw; " v-model:value="questionDetail.content" :handle-change="onContentChange"></MdEditor>
            </FormItem>
            <FormItem label="测试用例:" name="judgeCase">
              <div v-if="questionDetail.judgeCase.length === 0">
                <template v-for="jcase in JSON.parse(form.judgeCase as any)">
                  <Space style="display: flex; margin-bottom: 8px"
                         align="baseline">

                    <FormItem style="min-width: 300px">
                      <Input v-model:value="jcase.input">{{ jcase.input }}</Input>
                    </FormItem>
                    <FormItem style="min-width: 300px">
                      <Input v-model:value="jcase.output"></Input>
                    </FormItem>
                    <MinusCircleOutlined/>
                  </Space>
                </template>
              </div>
              <div v-else>
                <template v-for="jcase in questionDetail.judgeCase">
                  <Space style="display: flex; margin-bottom: 8px"
                         align="baseline">

                    <FormItem style="min-width: 300px">
                      <Input v-model:value="jcase.input">{{ jcase.input }}</Input>
                    </FormItem>
                    <FormItem style="min-width: 300px">
                      <Input v-model:value="jcase.output"></Input>
                    </FormItem>
                    <MinusCircleOutlined/>
                  </Space>
                </template>
              </div>

            </FormItem>
          </Form>
        </div>
        <template #footer>
          <a-button type="primary" key="back" @click="questionDetailClose">关闭</a-button>
        </template>
      </Modal>
      <Modal v-model:open="showEdit" title="编辑题目" @ok="questionUpdate" width="70vw">
        <div>
          <Form
              name="basic"
              :label-col="{ span: 3 }"
              :wrapper-col="{ span: 16 }"
              autocomplete="off"
              label-align="left"
              style="font-size: 20px"
          >
            <FormItem label="标题:" name="title">
              <Input size="middle" :style="{width:'650px'}" v-model:value="questionEdit.title"/>

            </FormItem>
            <FormItem label="难度:" name="degree">
              <Dropdown>
                <template #overlay>
                  <Menu @click="handleMenuClick">

                    <MenuItem key="0">
                      简单
                    </MenuItem>
                    <MenuItem key="1">
                      中等
                    </MenuItem>
                    <MenuItem key="2">
                      困难
                    </MenuItem>
                  </Menu>
                </template>
                <aButton>
                  {{questionEdit.questionDegree === -1 ? "全部" : getQuestionDegree[questionEdit.questionDegree]}}
<!--                  全部-->
                  <!--                  {{questionDegree}} {{questionDegree === 0 ? '简单' : questionDegree === 1 ? '中等' : '困难'}}-->
                  <DownOutlined />
                </aButton>
              </Dropdown>
            </FormItem>
            <FormItem label="标签:" name="tags">
              <div v-if="questionEdit.tags.length === 0">
                <template v-for="(tag, index) in questionEdit.tags" :key="tag">
                  <Tag @close="handleClose(tag)" closable="true">
                    {{ tag }}
                  </Tag>
                </template>
                <Input type="text" ref="inputRef" v-if="inputVisible" size="small" :style="{ width: '78px' }" v-model:value="inputValue" @blur="handleInputConfirm"
                       @keyup.enter="handleInputConfirm">

                </Input>
                <Tag v-else style="background: #fff; border-style: dashed" @click="showInput()">
                  <plus-outlined/>
                  New Tag
                </Tag>
              </div>
              <div v-else>
                <template v-for="(tag, index) in questionEdit.tags" :key="tag">
                  <Tag @close="handleClose(tag)" closable="true">
                    {{ tag }}
                  </Tag>
                </template>
                <Input type="text" ref="inputRef" v-if="inputVisible" size="small" :style="{ width: '78px' }" v-model:value="inputValue" @blur="handleInputConfirm"
                       @keyup.enter="handleInputConfirm">

                </Input>
                <Tag v-else style="background: #fff; border-style: dashed" @click="showInput()">
                  <plus-outlined/>
                  New Tag
                </Tag>
              </div>
            </FormItem>

            <FormItem label="判题配置" name="judgeConfig">
              <br>

              <a-space>
                <span style="width: 80px">时间限制:</span>
                <Input size="middle" :style="{width:'550px'}" v-model:value="questionEdit.judgeConfig.timeLimit" addon-after="MS(毫秒)"></Input>
              </a-space>
              <br>
              <br>
              <a-space>
                <span style="width: 80px">内存限制:</span>
                <Input size="middle" :style="{minWidth:'550px'}" v-model:value="questionEdit.judgeConfig.memoryLimit" addon-after="KB(千字节)"></Input>
              </a-space>
              <br>
              <br>
              <a-space>
                <span style="width: 80px">堆栈限制:</span>
                <Input size="middle" :style="{width:'550px'}" v-model:value="questionEdit.judgeConfig.stackLimit" addon-after="KB(千字节)"></Input>
              </a-space>
            </FormItem>
            <FormItem>
              <span style="width: 80px; font-size: 16px">内容:</span>
              <MdEditor style="min-width: 65vw; " v-model:value="questionEdit.content" :handle-change="onContentChange"></MdEditor>
            </FormItem>
            <FormItem label="测试用例:" name="judgeCase">
              <div v-if="questionEdit.judgeCase.length === 0">
                <template v-for="jcase in questionEdit.judgeCase">
                  <Space style="display: flex; margin-bottom: 8px"
                         align="baseline">

                    <FormItem style="min-width: 300px">
                      <Input v-model:value="jcase.input">{{ jcase.input }}</Input>
                    </FormItem>
                    <FormItem style="min-width: 300px">
                      <Input v-model:value="jcase.output"></Input>
                    </FormItem>
                    <MinusCircleOutlined/>
                  </Space>
                </template>
              </div>
              <div v-else>
                <template v-for="jcase in questionEdit.judgeCase">
                  <Space style="display: flex; margin-bottom: 8px"
                         align="baseline">

                    <FormItem style="min-width: 300px">
                      <Input v-model:value="jcase.input">{{ jcase.input }}</Input>
                    </FormItem>
                    <FormItem style="min-width: 300px">
                      <Input v-model:value="jcase.output"></Input>
                    </FormItem>
                    <MinusCircleOutlined/>
                  </Space>
                </template>
              </div>
              <FormItem>
                <aButton type="dashed" block @click="addJudgeCase">
                  <PlusOutlined/>
                  新增测试用例
                </aButton>
              </FormItem>
            </FormItem>
          </Form>
        </div>
        <template #footer>
          <a-button key="back" @click="editQuestionClose">取消</a-button>
          <a-button key="submit" type="primary" :loading="loading" @click="questionUpdate">提交</a-button>
        </template>
      </Modal>
    </a-card>
  </div>

</template>
<script lang="ts" setup>
import {SmileOutlined, DownOutlined} from '@ant-design/icons-vue';
import {computed, nextTick, ref} from "vue";
import {QuestionControllerService, DeleteRequest} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import {onMounted} from "@vue/runtime-core";
import {
  PlusOutlined,
  FieldTimeOutlined,
  DatabaseOutlined,
  CodepenOutlined,
  MinusCircleOutlined
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
  Pagination,
  Menu,
  MenuItem, MenuProps, Popconfirm, Button
} from 'ant-design-vue';
import {useRoute, useRouter} from "vue-router";
import MdEditor from "@/components/MdEditor.vue";
import moment from "moment";


const open = ref<boolean>(false);
const route = useRoute()
const loading = ref<boolean>(false);
const router = useRouter()
const showDetail = ref<boolean>(false)
const showEdit = ref<boolean>(false)
const tagVisible = ref<boolean>(false)
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
/*
删除标签
 */
const handleClose = (removeTag: string) => {
  form.value.tags = form.value.tags.filter(tag => tag !== removeTag);
}
const pageSizeOptions = ref<string[]>(['10', '20', '30', '40', '50']);
const onShowSizeChange = (current: number, pageSize: number) => {
  console.log(current, pageSize);
  searchParams.value.pageSize = pageSize;
  loadData()
};
const selectedTags = ref([]) as any;
const getQuestionDegree = ref([
    "简单", "中等", "困难"
])

const dropdownVisible = ref<boolean>(false);
const handleMenuClick: MenuProps['onClick'] = e => {
  questionEdit.value.questionDegree = e.key as number;
  questionDegree.value = e.key as number;
  form.value.questionDegree = e.key as number;
}

const questionDetailClose = () => {
  showDetail.value = false
}
const editQuestionClose = () => {
  showEdit.value = false
}

const inputVisible = ref(false)
const inputValue = ref('')
const inputRef = ref();
const showInput = () => {
  inputVisible.value = true;
  nextTick(() => {
    inputRef.value.focus();
  });
}
const questionDetail = ref([])
const questionEdit = ref({
  answer:"",
  content: "",
  judgeCase: [

  ],
  judgeConfig: {
    memoryLimit: 1000,
    stackLimit: 1000,
    timeLimit: 1000
  },
  tags: [],
  title: "",
  questionDegree: -1
})
const showEditModal = async (id: number) => {
  const res = await QuestionControllerService.getQuestionByIdUsingGet(id as any);
  if(res.code === 0) {

    questionEdit.value = res.data as any
  }
  questionEdit.value.judgeCase = JSON.parse(questionEdit.value.judgeCase as any)
  questionEdit.value.judgeConfig = JSON.parse(questionEdit.value.judgeConfig as any)
  questionEdit.value.tags = JSON.parse(questionEdit.value.tags as any)
  // questionEdit.value.tags = JSON.parse(questionEdit.value.tags as any)
  console.log("题目详情", questionEdit.value)
  showEdit.value = true;
}
const showDetailModal = async (id: number) => {
  const res = await QuestionControllerService.getQuestionByIdUsingGet(id as any);
  if(res.code === 0) {
    questionDetail.value = res.data as any
    console.log("aaa",questionDetail.value)
    questionDetail.value.judgeConfig = JSON.parse(res.data?.judgeConfig as any)
    questionDetail.value.judgeCase = JSON.parse(res?.data?.judgeCase as any)

  }

  showDetail.value = true;
}

const questionUpdate = async () => {
  // questionEdit.value = JSON.stringify(questionEdit.value) as any
  const res = await QuestionControllerService.updateQuestionUsingPost(questionEdit.value as any)
  if (res.code === 0) {
    message.success("更新成功")
    await loadData()
  }else {
    message.error("更新失败:" + res.message)
  }
  showEdit.value = false;
}

const handleInputConfirm = () => {
  // if(inputValue && form.value.tags.indexOf(inputValue.value) !== -1) {
  //   form.value.tags = [...form.value.tags, inputValue.value]
  //
  //   console.log("asdasd")
  // }
  if(inputValue.value !== '' && !form.value.tags.includes(inputValue.value)) {
    form.value.tags.push(inputValue.value)

  }

  // let tags = form.value.tags;
  // Object.assign(form.value, {
  //   tags,
  // })

  inputVisible.value = false
  inputValue.value = ''
}
const onContentChange = (value: string) => {
  form.value.content = value;
};
const pageChange = () => {
  loadData()
}
const handleCancel = () => {
  open.value = false
}
const pagination = computed(() => ({
  total: dataList.value.length,
  current: searchParams.value.current,
  pageSize: searchParams.value.pageSize,
}));
const addJudgeCase = () => {
  form.value.judgeCase.push({
    input: "",
    output: ""
  })
  console.log("堆栈配置:" + form.value.judgeConfig.timeLimit)
}
const selectDegree: MenuProps['onClick'] = e => {
  searchParams.value.questionDegree = e.key as number;
  loadData()
}
const selectTags = (item: any) => {
  console.log(item.key)
  if (item.key !== '' && !selectedTags.value.includes(item.key)) {
    selectedTags.value.push(item.key)
  }
  console.log(selectedTags.value)
  return true
}
const clearTags = () => {
  selectedTags.value = []
}

/**
 * 根据题目id 获取老的数据
 */
const questionDegree = ref(-1)
const form = ref(
    {
      "answer": "暴力破解",
      "content": "# **问题描述**\n\n" +
          "\n"+
          "\n## **输入** \n\n" +
          "## **输出** \n",
      "judgeCase": [
        {
          "input": "",
          "output": ""
        }
      ],
      "judgeConfig": {
        "memoryLimit": 1000,
        "stackLimit": 1000,
        "timeLimit": 1000
      },
      "tags": selectedTags.value ?? [],
      "title": "",
      questionDegree: questionDegree.value
    }
)


const showModal = () => {
  open.value = true;

};

const handleOk = async (e: MouseEvent) => {
  loading.value = true;
  open.value = false;
  console.log(form.value.judgeCase)
  // form.value.judgeCase = JSON.stringify(form.value.judgeCase)
  // form.value.judgeConfig = JSON.stringify(form.value.judgeConfig)
  const res = await QuestionControllerService.addQuestionUsingPost(form.value)
  if(res.code === 0) {
    await router.push({
      path: "/",
      replace: true //不会占有浏览器的堆栈 即点击返回 不会返回登录页
    })
    message.success("创建成功!")

  }else {
    message.error("创建失败，" + res.message);
  }
  loading.value = true;
  open.value = false;
};
const columns = [
  // {
  //   name: 'Name',
  //   dataIndex: 'name',
  //   key: 'name',
  // },
  // {
  //   title: '题目Id',
  //   dataIndex: 'id',
  //   key: 'id',
  //   align: 'center',
  // },
  {
    title: '题目',
    dataIndex: 'title',
    key: 'title',
    align: 'center',
  },
  {
    title: '标签',
    key: 'tags',
    dataIndex: 'tags',
    align: 'center',
  },

  {
    title: '更新时间',
    key: 'updateTime',
    dataIndex: 'updateTime',
    align: 'center',
  },
  {
    title: '判题配置',
    key: 'judgeConfig',
    dataIndex: 'judgeConfig',
    align: 'center',
  },
  // {
  //   title: '判题用例',
  //   key: 'judgeCase',
  //   dataIndex: 'judgeCase',
  // },
  {
    title: '提交数',
    key: 'submitNum',
    dataIndex: 'submitNum',
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


const dataList = ref([])
const total1 = ref(0)
const searchParams = ref({
  pageSize: 20,
  current: 1,
  tags:[],
  questionDegree: -1,
  title: ''
})
const editList = ref([])
const doChange = async (id: number) => {
  showEdit.value = true;

  const res = await QuestionControllerService.getQuestionByIdUsingGet(id);
  if(res.code === 0) {
    console.log("当前题目:" + ref(res.data))
    questionEdit.value = res.data as any
    // form.value.judgeCase = JSON.parse(res?.data?.judgeCase as any)
    // form.value.judgeConfig = JSON.parse(res?.data?.judgeConfig as any)
    // questionDegree.value = res.data?.questionDegree as any
  }

}
const onSearch = () => {
  loadData()
}
const loadData = async () => {
  const res = await QuestionControllerService.listQuestionByPageUsingPost(
      searchParams.value
  );
  if (res.code == 0) {
    dataList.value = res.data.records;
    total1.value = res.data.total;
    console.log(dataList.value)
  } else {
    message.error("加载失败" + res.message)
  }
}
const doDelete = async (id: number) => {

  const res = await QuestionControllerService.deleteQuestionUsingPost({id})
  if(res.code === 0) {
    message.success("删除成功");
    await loadData()
  }else {
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

  padding: 0 180px !important;

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
  height: 600px !important;
}

</style>
