<template>
  <div id="solutionListView">
    <div style="display: flex; justify-content: right; margin-bottom: 10px" v-if="store.state.user.loginUser.userRole === 'admin'">
      <Button type="primary" @click="createSolution">创建题解</Button>
    </div>
    <div v-if="solutionList.length === 0">
      <a-empty></a-empty>
    </div>
    <div v-else>
      <div v-for="item in solutionList">
        <div style="background: #f2f3f5; border-radius: 10px; margin-bottom: 10px; padding: 20px;">
          <div style="font-size: 20px; color: #000000; font-weight: 700; display: flex; justify-content: space-between; align-items: center">
            {{item.title}}
            <div v-if="store.state.user.loginUser.userRole === 'admin'">
              <Button type="primary" @click="deleteSolution(item.id)">删除</Button>
            </div>
          </div>
          <div style="font-size: 16px; color: #666666; ">
            {{item.content}}
          </div>
          <pre data-lang="java" class="code-preview" style="background:#ffffff; border-radius: 10px; margin: 10px 0; padding: 10px; font-size: 16px; " >


              {{item.code}}

          </pre>

        </div>

      </div>
    </div>
    <Modal v-model:open="showAddSolution" title="创建题解" @ok="addQuestionSolution" width="50vw">
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
            <Input size="middle" v-model:value="addSolutionForm.title" :style="{width:'650px'}" />
          </FormItem>
          <FormItem label="题解描述:" name="title">
            <Textarea v-model:value="addSolutionForm.content" :style="{width:'850px',height:'200px'}" />
          </FormItem>
          <FormItem label="代码:" name="title">
            <Textarea v-model:value="addSolutionForm.code" :style="{width:'850px',height:'200px'}" />
          </FormItem>

        </Form>
      </div>
      <template #footer>
        <Button key="back" @click="cancelAddSolution">取消</Button>
        <Button key="submit" type="primary" :loading="loading" @click="addQuestionSolution">提交</Button>
      </template>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import {defineProps, reactive, ref, toRefs} from "vue";
import {useRoute} from "vue-router";
import {onMounted} from "@vue/runtime-core";
import {AnswerControllerService} from "../../generated";
import {Button, Dropdown, Form, FormItem, Input, Menu, MenuItem, Modal, Space, Tag, Textarea} from 'ant-design-vue'
import MdEditor from "@/components/MdEditor.vue";
import {DownOutlined, MinusCircleOutlined, PlusOutlined} from "@ant-design/icons-vue";
import message from "@arco-design/web-vue/es/message";
import MdViewer from "@/components/MdViewer.vue";
import {useStore} from "vuex";
const route = useRoute()
const showAddSolution = ref(false)
const loading = ref<boolean>(false);
const props = defineProps({
  questionId: String
})
const {questionId} =toRefs(props) ?? ''

const data = reactive([
  {
    id: '123123',
    userName: '野火一季季',
    solutionTitle: '滑动窗口',
    solutionDesc: '这道题主要用到思路是：滑动窗口什么是滑动窗口？其实就是一个队列,比如例题中的 abcabcbb，进入这个队列（窗口）为 abc 满足题目要求，当再进入 a，队列变成了 abca，这时候不满足要求。所以，我们要移动这个队列！' ,
    avatar: 'https://assets.leetcode.cn/aliyun-lc-upload/users/leetcode-solution/avatar_1582018938.png'
  },{
    id: '123123',
    userName: '野火一季季',
    solutionTitle: '滑动窗口',
    solutionDesc: '这道题主要用到思路是：滑动窗口什么是滑动窗口？其实就是一个队列,比如例题中的 abcabcbb，进入这个队列（窗口）为 abc 满足题目要求，当再进入 a，队列变成了 abca，这时候不满足要求。所以，我们要移动这个队列！' ,
    avatar: 'https://assets.leetcode.cn/aliyun-lc-upload/users/leetcode-solution/avatar_1582018938.png'
  },{
    id: '123123',
    userName: '野火一季季',
    solutionTitle: '滑动窗口',
    solutionDesc: '这道题主要用到思路是：滑动窗口什么是滑动窗口？其实就是一个队列,比如例题中的 abcabcbb，进入这个队列（窗口）为 abc 满足题目要求，当再进入 a，队列变成了 abca，这时候不满足要求。所以，我们要移动这个队列！' ,
    avatar: 'https://assets.leetcode.cn/aliyun-lc-upload/users/leetcode-solution/avatar_1582018938.png'
  },{
    id: '123123',
    userName: '野火一季季',
    solutionTitle: '滑动窗口',
    solutionDesc: '这道题主要用到思路是：滑动窗口什么是滑动窗口？其实就是一个队列,比如例题中的 abcabcbb，进入这个队列（窗口）为 abc 满足题目要求，当再进入 a，队列变成了 abca，这时候不满足要求。所以，我们要移动这个队列！' ,
    avatar: 'https://assets.leetcode.cn/aliyun-lc-upload/users/leetcode-solution/avatar_1582018938.png'
  },{
    id: '123123',
    userName: '野火一季季',
    solutionTitle: '滑动窗口',
    solutionDesc: '这道题主要用到思路是：滑动窗口什么是滑动窗口？其实就是一个队列,比如例题中的 abcabcbb，进入这个队列（窗口）为 abc 满足题目要求，当再进入 a，队列变成了 abca，这时候不满足要求。所以，我们要移动这个队列！' ,
    avatar: 'https://assets.leetcode.cn/aliyun-lc-upload/users/leetcode-solution/avatar_1582018938.png'
  },{
    id: '123123',
    userName: '野火一季季',
    solutionTitle: '滑动窗口',
    solutionDesc: '这道题主要用到思路是：滑动窗口什么是滑动窗口？其实就是一个队列,比如例题中的 abcabcbb，进入这个队列（窗口）为 abc 满足题目要求，当再进入 a，队列变成了 abca，这时候不满足要求。所以，我们要移动这个队列！' ,
    avatar: 'https://assets.leetcode.cn/aliyun-lc-upload/users/leetcode-solution/avatar_1582018938.png'
  },{
    id: '123123',
    userName: '野火一季季',
    solutionTitle: '滑动窗口',
    solutionDesc: '这道题主要用到思路是：滑动窗口什么是滑动窗口？其实就是一个队列,比如例题中的 abcabcbb，进入这个队列（窗口）为 abc 满足题目要求，当再进入 a，队列变成了 abca，这时候不满足要求。所以，我们要移动这个队列！' ,
    avatar: 'https://assets.leetcode.cn/aliyun-lc-upload/users/leetcode-solution/avatar_1582018938.png'
  },{
    id: '123123',
    userName: '野火一季季',
    solutionTitle: '滑动窗口',
    solutionDesc: '这道题主要用到思路是：滑动窗口什么是滑动窗口？其实就是一个队列,比如例题中的 abcabcbb，进入这个队列（窗口）为 abc 满足题目要求，当再进入 a，队列变成了 abca，这时候不满足要求。所以，我们要移动这个队列！' ,
    avatar: 'https://assets.leetcode.cn/aliyun-lc-upload/users/leetcode-solution/avatar_1582018938.png'
  },{
    id: '123123',
    userName: '野火一季季',
    solutionTitle: '滑动窗口',
    solutionDesc: '这道题主要用到思路是：滑动窗口什么是滑动窗口？其实就是一个队列,比如例题中的 abcabcbb，进入这个队列（窗口）为 abc 满足题目要求，当再进入 a，队列变成了 abca，这时候不满足要求。所以，我们要移动这个队列！' ,
    avatar: 'https://assets.leetcode.cn/aliyun-lc-upload/users/leetcode-solution/avatar_1582018938.png'
  },
])

const createSolution = () => {
  showAddSolution.value = true
}
const toSolutionView = () => {

}

const deleteSolution = async (SolutionId: number) => {
  const res = await AnswerControllerService.deleteAnswerUsingPost({
    id: SolutionId
  })
  if (res.code === 0) {
    message.success('删除成功')
  }else {
    message.error('删除失败', res.message)
  }
  await getSolutionList()
}
const store = useStore();
const addQuestionSolution = async () => {
  const res = await AnswerControllerService.addAnswerUsingPost(addSolutionForm.value)
  if(res.code === 0) {
    message.success('创建成功')
  }else {
    message.error('创建失败', res.message)
  }
  await getSolutionList()
  showAddSolution.value = false
}
const cancelAddSolution = () => {
  showAddSolution.value = false
}
const searchParams = ref({
  current: 1,
  pageSize: 10,
  questionId: questionId?.value as any
})
const solutionList = ref([])
const addSolutionForm = ref({
  title:'',
  content:'',
  code:'',
  questionId: questionId?.value as any
})
const getSolutionList = async () => {
  const res = await AnswerControllerService.listAnswerByPageUsingPost(searchParams.value)
  if(res.code === 0) {
    solutionList.value = res.data.records
  }

}
onMounted(() => {
  getSolutionList()
})
</script>



<style >
#solutionListView {
  overflow-x: hidden;
}
.code-preview {
  //font-family: monospace; /* 使用等宽字体来更好地显示代码 */
  //white-space: pre-wrap; /* 保持代码中的空格和换行 */
  //background-color: #f4f4f4; /* 可选的背景色 */
  //padding: 10px; /* 可选的内边距 */
  //border: 1px solid #ccc; /* 可选的边框 */
  //overflow: auto; /* 如果代码很长，允许滚动查看 */
}
pre {

  white-space: pre-wrap; /* css-3 */
  white-space: -moz-pre-wrap; /* Mozilla, since 1999 */
  white-space: -pre-wrap; /* Opera 4-6 */
  white-space: -o-pre-wrap; /* Opera 7 */
  word-wrap: break-word; /* Internet Explorer 5.5+ */

}
</style>