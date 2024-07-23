<template>
  <div id="edit-exam-view">
    <div style="border-radius: 10px; background-color: #fff; padding: 20px; height: 88vh; width: 98vw;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin: 10px; height: 50px">
        <div style="display: flex;flex-direction: column ; align-content: space-between; justify-content: center">

          <div style="font-size: 20px">
            编程题
          </div>
          <div style="color: #737373; margin-top: 5px">
            {{existedQuestions.length}} 题 {{totalScore}} 分
          </div>
        </div>
        <div>
          <div>
            <Button @click="showModal" type="primary"
                    style="font-size: 16px; width: 100px; height: 36px; margin-right: 10px">添加题目
            </Button>
          </div>
        </div>
      </div>
      <div>
        <div v-if="existedQuestions.length === 0">
          <div
              style="font-size: 20px; color: #737373; margin-top: 20px; display: flex; justify-content: center; align-items: center; height: 100px">
            无题目
          </div>
        </div>
        <div v-else>
          <div v-for="(item, index) in existedQuestions">
            <div
                style="display: flex; justify-content: space-between ;background: #f6f7f9; border-radius: 10px; padding: 10px 20px 10px 20px; min-height: 50px;margin-bottom: 10px; align-items: center">
              <div style="display: flex; flex-direction: column">
                <div style="font-size: 16px; font-weight: 500; margin-left: 10px">
                  {{ item.title }}
                </div>
                <div style="margin-top: 10px;">
                  <Tag
                      v-for="tag in JSON.parse(item.tags)"
                      :key="tag"
                      style="font-size: 14px; "
                      color="green"
                  >
                    {{ tag }}
                  </Tag>
                </div>

              </div>
              <div>
                <Button @click="deleteQuestion(item.id)" type="primary">删除题目</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Modal v-model:open="open" title="添加题目" @ok="handleOk" width="1000px">
      <div>
        <Form
            name="basic"
            :label-col="{ span: 3 }"
            :wrapper-col="{ span: 16 }"
            autocomplete="off"
            label-align="left"
            style="font-size: 20px"
        >
          <div v-for="(item, index) in allQuestions"
               style="display:flex; justify-content: space-between; align-items: center; padding: 0 20px">
            <div style="height: 60px; padding: 10px 0 10px 0; margin: 10px 0 10px 0">
              <Checkbox @change="addQuestionToExistedQuestions(item)"
                        :default-checked="existedQuestionIds.includes(item.id)"
                        :disabled="existedQuestionIds.includes(item.id)"
                        style="">
                <a-space>
                  <icon-code
                      style="font-size: 24px;flex: 1; padding: 0;color: rgb(133 80% 35%); margin-left: 20px"></icon-code>
                  <div style="display: flex; justify-content: space-between;  flex-direction: column">
                    <div>
                      {{ item.title }}
                    </div>
                    <div>
                      <Tag
                          v-for="tag in JSON.parse(item.tags)"
                          :key="tag"
                          style="font-size: 14px; padding:0 5px"
                          color="green"
                      >
                        {{ tag }}
                      </Tag>
                      <span v-if="item.questionDegree === 0">
                      <Tag style="font-size: 14px; padding:0 5px"
                           color="green">简单</Tag>
                      </span>
                      <span v-else-if="item.questionDegree === 1">
                      <Tag style="font-size: 14px; padding:0 5px"
                           color="blue">中等</Tag>
                      </span>

                      <span v-else>
                      <Tag style="font-size: 14px; padding:0 5px"
                           color="red">困难</Tag>
                      </span>

                    </div>

                  </div>
                </a-space>
              </Checkbox>
            </div>
            <div>
              <Button @click="checkQuestion(item.id)" type="primary"> 查看详细</Button>
            </div>
          </div>
        </Form>
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-top: 10px">
          <span style="font-size: 16px"> 共 {{ total }} 题</span>
          <Pagination
              v-model:current="allQuestionsSearchParams.current"
              v-model:page-size="allQuestionsSearchParams.pageSize"
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
      <template #footer>
        <Button key="back" @click="handleCancel">取消</Button>
        <Button key="submit" type="primary" @click="handleOk">提交</Button>
      </template>
    </Modal>
    <a-drawer style="display: flex" ok-text="关闭" :width="440" :visible="visible" @ok="drawerClose"
              @cancel="drawerClose">
      <template #title>
        题目详情
      </template>
      <div style="display: flex; flex-direction: column;">
        <h2>{{ questionDetail?.title }}</h2>
        <MdViewer style="padding: 20px;  "
                  :value="questionDetail?.content || ''"></MdViewer>
        <div style="flex: 2; margin: 0 auto">

        </div>
        <div style="display: flex;flex: 5;  margin-top: 70px">

        </div>
      </div>
    </a-drawer>
  </div>
</template>
<script setup lang="ts">
import {Button, Dropdown, Form, FormItem, Input, Menu, MenuItem, Modal, Pagination, Tag,} from 'ant-design-vue'
import {reactive, ref} from "vue";
import {QuestionControllerService, QuestionGroupControllerService} from "../../../generated";
import {onMounted} from "@vue/runtime-core";
import {Checkbox} from '@arco-design/web-vue'
import {IconCode} from "@arco-design/web-vue/es/icon";
import MdViewer from "@/components/MdViewer.vue";
import message from "@arco-design/web-vue/es/message";

interface Props {
  id: any
}

const props = withDefaults(defineProps<Props>(), {
  id: () => ""
})
const allQuestionsSearchParams = ref({
  current: 1,
  pageSize: 10,
  questionDegree: -1
})

const deleteQuestion = async (questionId: any) => {
  const res = await QuestionGroupControllerService.deleteQuestionUsingPost1(props.id, [questionId]);
  if (res.code === 0) {
    message.success("删除成功")
    needAddQuestion.value = []
    allQuestions.value = []
  }else {
    message.error("删除失败", res.message)
  }
  await getExistedQuestions()
  await getAllQuestions()

}
const forbiddenAddQuestion = (item: any) => {
  existedQuestions.value.forEach((question: any) => {
    if(item.title === question.title) {
      console.log(item.title === question.title)
      return true
    }

  })

}
const open = ref(false)
const visible = ref(false)
const handleOk =  async () => {
  console.log(needAddQuestion.value)
  const res = await QuestionGroupControllerService.addQuestionUsingPost1(
      props.id,
      needAddQuestion.value)
  await getExistedQuestions()
  //TODO 添加用户
  open.value = false
}
const handleCancel = () => {
  open.value = false
}
const showModal = () => {
  open.value = true
  needAddQuestion.value = []
}
const drawerClose = () => {
  visible.value = false
}
const pageSizeOptions = ref<string[]>(['10', '20', '30', '40', '50']);
const existedQuestions = ref([] as any[])
const allQuestions = ref([] as any[])

/**
 * 获取题目集已存在的题目
 */
const existedQuestionIds = ref([] as any[])
const totalScore = ref(0)
const flag = ref(true)
const getExistedQuestions = async () => {
  const res = await QuestionGroupControllerService.getQuestionGroupByIdUsingGet(props.id)
  if (res.code === 0) {
    existedQuestions.value = res?.data?.questionList as any[]
  }
  existedQuestionIds.value = []
  existedQuestions.value.forEach((question: any) => {
    existedQuestionIds.value.push(question.id)
  })
  if (existedQuestions.value.length > 0 && flag.value) {
    existedQuestions.value.forEach((question: any) => {
      // 现有的代码
      if(question.questionDegree === 0) {
        totalScore.value += 10
      }else if(question.questionDegree === 1) {
        totalScore.value += 15
      }else {
        totalScore.value += 20
      }
    })
    flag.value = false
  }
}



const total = ref(0)
const getAllQuestions = async () => {
  needAddQuestion.value = []
  existedQuestionIds.value = []
  allQuestions.value = []
  const res = await QuestionControllerService.listQuestionByPageUsingPost(allQuestionsSearchParams.value)
  if (res.code === 0) {
    allQuestions.value = res?.data?.records as any[]
    total.value = res?.data?.total as number
  }

  await getExistedQuestions()

}
const questionDetail = ref({} as any)
const checkQuestion = async (id: any) => {

  const res = await QuestionControllerService.getQuestionByIdUsingGet(id);
  if (res?.code === 0) {
    questionDetail.value = res.data
  }
  visible.value = true
}

const onShowSizeChange = (current: number, pageSize: number) => {
  console.log(current, pageSize);
  allQuestionsSearchParams.value.pageSize = pageSize;
  getAllQuestions()
};

const needAddQuestion = ref([] as any[])
const addQuestionToExistedQuestions = (item: any) => {
  if (needAddQuestion.value.includes(item.id)) {
    console.log("存在")
    needAddQuestion.value = needAddQuestion.value.filter(question => question !== item.id)
  } else {
    needAddQuestion.value.push(item.id)
  }
  console.log(needAddQuestion.value)
}
const pageChange = () => {
  getAllQuestions()
}
onMounted(() => {
  getExistedQuestions()
  getAllQuestions()
})
</script>
<style scoped>
#edit-exam-view {
  padding: 20px;

}
</style>