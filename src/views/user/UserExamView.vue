<template>
    <UserExamHeader @finishExam="finishExam" :examId="examId" :questionId="props.id" :remainingTime="remainingTime" :endTime="endTime" :timeLimit="timeLimit" :isclose="examQuestions.length === 0" @runResultUUID="getRunResultUUID" :inputList="inputList" @submit="getSubmit" :info="form"></UserExamHeader>
  <div style="background-color: #f0f0f0; overflow: hidden">
    <div style="display: flex">

      <a-split
          :style="{
          height: '95vh',
          width: '100%',
        }"
          :min="350"
          :max="1400"
          v-model:size="firstSize"
          @move-end="handleMoveEndFirstSize"
      >
        <template #first>
          <div
              :class="{
              'layout-first': true,
              'layout-first-full-screen': layout_first_full_screen,
              'layout-first-box-shadow': firstSwitch,
            }"
              @click="pitchOn(1)"
          >
            <a-space direction="vertical" size="large" style="display: flex; flex: 1; ">
              <a-card v-if="question" style="padding: 0; border-radius: 10px; height: 100vh ">
                <div style="flex: 1">
                  <div
                      style="display: flex;border-radius: 10px 10px 0 0; width: 100%; background-color:rgb(242, 243 ,245); padding: 4px">
                    <div style=" padding: 0 5px">
                      <a-button @click="showAllQuestions" style="padding: 0 5px"

                                class="viewQuestionButton">

                        <icon-arrow-left style="font-size: 20px; color: blueviolet; margin-right: 5px; "/>
                        查看所有题目
                      </a-button>
                      <a-button style="padding: 0 5px"
                                :class="{ activeButton: activeTab === 'description' }"
                                class="viewQuestionButton" @click="showContent('description')">
                        <icon-bookmark
                            style="font-size: 20px; color: blueviolet; margin-right: 5px"/>
                        题目描述
                      </a-button>

                    </div>

                  </div>
                  <div style="">

                    <div v-if="activeTab === 'description'" style="overflow-y: auto; overflow-x: hidden">
                      <div style="padding: 20px 20px 0 20px">
                        <h1 style="font-weight: 700">
                          {{ question.title }}
                        </h1>
                        <a-tag color="orangered"
                               style=" justify-content:center;margin-right: 10px; font-size: 14px; width: 60px; height: 26px; border-radius: 10px"
                               v-for="item in JSON.parse(question.tags as any)">{{ item }}
                        </a-tag>
                      </div>
                      <div style="padding: 10px 20px 0 20px">
                        <h2 style="font-weight: 700;display: block">判题条件</h2>
                        <a-descriptions :column="{xs:1, md:2, lg:3}">

                          <a-descriptions-item label="时间限制:">
                            <a-tag
                                style=" justify-content:center;color: #00af9b; font-size: 14px; width: 80px; height: 26px; border-radius: 10px">
                              {{ question.judgeConfig.timeLimit ?? 0 }}MS
                            </a-tag>
                          </a-descriptions-item>
                          <a-descriptions-item label="内存限制:">
                            <a-tag
                                style=" justify-content:center;color: #00af9b;font-size: 14px; width: 80px; height: 26px; border-radius: 10px">
                              {{ question.judgeConfig.memoryLimit ?? 0 }}K
                            </a-tag>
                          </a-descriptions-item>
                          <a-descriptions-item label="堆栈限制:">
                            <a-tag
                                style=" justify-content:center;color: #00af9b;font-size: 14px; width: 80px; height: 26px; border-radius: 10px">
                              {{ question.judgeConfig.stackLimit ?? 0 }}K
                            </a-tag>
                          </a-descriptions-item>
                        </a-descriptions>
                      </div>
                      <MdViewer style="padding: 20px; height: 68vh "
                                v-if="activeTab === 'description'"
                                :value="question.content || ''"></MdViewer>
                    </div>

                  </div>

                </div>
              </a-card>
            </a-space>
          </div>
        </template>
        <template #second>
          <div style="overflow: hidden">
            <a-split
                direction="vertical"
                :style="{ height: '94vh' }"
                :min="568"
                :max="850"
                v-model:size="secondSize"
                @move-end="handleMoveEndSecondSize"
            >
              <template #first>
                <div
                    :class="{
                    'layout-second-first': true,
                    'layout-second-first-full-screen':
                      layout_second_first_full_screen,
                    'layout-second-first-box-shadow': secondSwitch,
                  }"
                    id="code-editor-container"
                    @click="pitchOn(2)"
                >
                  <a-card style="flex: 2; padding: 0;overflow: hidden; border-radius: 10px; ">
                    <div
                        style="display: flex; border-radius: 10px 10px 0 0; width: 100%; background-color:rgb(242, 243 ,245); padding: 4px">
                      <div style="padding: 0 5px">
                        <a-button class="viewQuestionButton">
                          <a-space>
                            <icon-code
                                style="font-size: 20px; padding: 0;color: rgb(133 80% 35%)"></icon-code>
                            <span>
                                代码
                            </span>
                          </a-space>
                        </a-button>
                      </div>
                    </div>

                    <div
                        style="min-height: 40px; width: 100px; display: flex; align-items: center; justify-content: center;padding: 5px 10px;"
                        class="languageSelect">
                      <div
                          style="cursor: pointer; border-radius: 10px; width: 100%; display: flex; align-items: center;justify-content: right;">
                        <a-select v-model="form.language" :style="{width:'260px'} " placeholder="选择编程语言">
                          <a-option>java</a-option>
                          <a-option>python</a-option>
                          <a-option>c++</a-option>
                        </a-select>
                      </div>
                    </div>
                    <CodeEditor :style="{
                      }" :value="form.code" :language="form.language" :handle-change="changeCode"></CodeEditor>
                  </a-card>
                </div>
              </template>
              <template #second>
                <div
                    :class="{
                    'layout-second-second': true,
                    'layout-second-second-full-screen':
                      layout_second_second_full_screen,
                    'layout-second-second-box-shadow': thirdSwitch,
                    'layout-second-second-animation': true,
                  }"
                    @click="pitchOn(3)"
                >
                  <a-space direction="vertical" size="large" style="display: flex; flex-direction: column; flex: 1; ">
                    <a-card style="padding: 0;flex: 1; border-radius: 10px;">
                      <div style="display:flex;flex: 1; flex-direction: column;  ">
                        <div
                            style="display: flex;border-radius: 10px 10px 0 0; width: 100%; background-color:rgb(242, 243 ,245); padding: 4px">
                          <div style=" padding: 0 5px">
                            <a-button style="padding: 0 5px"
                                      :class="{  }"
                                      class="viewQuestionButton" @click="changeButton('case')">
                              <icon-bookmark
                                  style="font-size: 20px; color: blueviolet; margin-right: 5px"/>
                              测试用例
                            </a-button>
                          </div>
                          <div style=" padding: 0 5px">
                            <a-button class="viewQuestionButton " @click="changeButton('result')">
                              <icon-experiment
                                  style="font-size: 20px; color: blueviolet; margin-right: 5px"/>
                              测试结果
                            </a-button>
                          </div>
                        </div>
                        <div v-if="testView==='case'"
                             style="display: flex; height: 240px; flex-direction: column; overflow-y: scroll; padding: 20px; ">
                          <div>
                            <div style="display:flex; flex-direction: column">
                              <div style="font-size: 14px; font-weight: 700">输入: (每个输入请通过空格进行分割)</div>
                              <br>
                              <Input v-model:value="inputList"
                                     style="padding:10px;font-size: 16px; height:50px; background-color:#f1f6f6;border-radius: 10px">

                              </Input>
                            </div>

                          </div>
                        </div>
                        <div v-if="testView==='result'"
                             style="display: flex; height: 240px; flex-direction: column; overflow-y: scroll; padding: 20px;">
                          <div v-if="isLoading">
                            <Spin tip="判题中..."
                                  style="display: flex; width: 100%; height: 100%; justify-content: center;align-items: center"
                                  :spinning="spinning">

                            </Spin>
                          </div>
                          <div v-else>
                            <div>
                              <div v-if="typeof runResultOutPut !== 'undefined' && runResultOutPut.length > 0">
                                <div style="color:#2DB55D; font-weight: 500; font-size: 1.25rem; margin-bottom: 10px">
                                  运行成功
                                </div>
                                输出=
                                <div
                                    style="color:#000000; border-radius: 10px; background: #f6363614; margin-top: 10px; padding: 10px; font-size: 16px;">
                                  {{ runResultOutPut }}
                                </div>
                              </div>
                              <div v-else>
                                <div style="color:#EF4743; font-weight: 500; font-size: 1.25rem">
                                  编译错误
                                </div>
                                <div
                                    style="color:#f63636; border-radius: 10px; background: #f6363614; margin-top: 10px; padding: 10px; font-size: 14px;">
                                  <div v-if="runResultMessage == 'null' || runResultMessage == ''">
                                    无输出结果...
                                  </div>
                                  <div v-else>
                                    {{ runResultMessage }}
                                  </div>

                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div style="height: 40px; line-height: 40px; padding: 0 20px">
                          <a-space>
                            <icon-code style="font-size: 24px;flex: 1; padding: 0;color: rgb(133 80% 35%)"></icon-code>
                            <span style="font-size: 16px">Source 重置测试用例</span>
                          </a-space>

                        </div>
                      </div>

                    </a-card>
                  </a-space>
                </div>
              </template>
              <template #resize-trigger>
                <div class="hover-line">
                  <icon-cut-off-rule
                      style="
                      margin-top: -11px;
                      margin-bottom: -11px;
                      transform: rotate(90deg);
                    "
                  />
                </div>
              </template>
            </a-split>
          </div>
        </template>
        <template #resize-trigger>
          <div class="arrow-cursor">
            <icon-cut-off-rule
                style="margin-right: -12px; margin-left: -12px"
            />
          </div>
        </template>
      </a-split>
    </div>
    <a-drawer placement="left" style="display: flex" ok-text="关闭" :width="440" :visible="visible" @ok="drawerClose"
              @cancel="drawerClose">
      <template #title>
        <div style="font-size: 18px; font-weight: 500">
          {{ examName }}
        </div>

      </template>
      <div style="display: flex; flex-direction: column;">
        <div>
          <div style="font-size: 16px; font-weight: 500; margin-bottom: 10px">考试总分:{{ examScore }}分</div>
        </div>
        <div v-if="examQuestions.length === 0">
          <AEmpty></AEmpty>
        </div>
        <div v-else v-for="item in examQuestions">
          <div @click="goQuestion(item.id)" style=" cursor: pointer; background:#f2f3f5; border-radius: 10px; padding: 10px; margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center">
            <div>
              <div style="font-size: 16px; font-weight: 500; color: #000000; margin-left: 5px">
                {{ item.title }}
              </div>
              <span>
                  <Tag
                      v-for="tag in JSON.parse(item.tags)"
                      :key="tag"
                      style="font-size: 14px;"
                      color="green"
                  >
                    {{ tag }}
                  </Tag>
            </span>
            </div>

            <div style="font-size: 16px; font-weight: 500; color: #000000; display: flex; align-items: center; margin-right: 5px">
              <div>
                <div v-if="item.questionDegree === 0">
                  10分
                </div>
                <div v-else-if="item.questionDegree === 1">
                  15分
                </div>
                <div v-else-if="item.questionDegree === 2">
                  20分
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </a-drawer>

    <Modal v-model:open="openModal" :closable="false"  :maskClosable="false" :keyboard="false">
      <Result
          status="success"
          :title=examName

      >

        <template #extra>
          <Button key="console" type="primary" @click="toUserExamQuestionView">返回主页</Button>
        </template>
        <div style="background:#fff;">

          <div>
            总分:{{totalScore ?? 0}}
          </div>
        </div>
      </Result>
      <template #footer></template>
    </Modal>
  </div>

</template>

<script setup lang="ts">
// 第一个面板是否全屏
import {ref} from "vue";
import GlobalHeader from "@/components/GlobalHeader.vue";
import ViewQuestionHeader from "@/components/ViewQuestionHeader.vue";
import {IconBookmark, IconCalendarClock, IconCode, IconExperiment, IconArrowLeft,IconArrowRight} from "@arco-design/web-vue/es/icon";
import CodeEditor from "@/components/CodeEditor.vue";
import {
  ExamControllerService,
  QuestionControllerService, QuestionGroupControllerService,
  QuestionSubmitAddRequest,
  QuestionSubmitControllerService,
  QuestionVO
} from "../../../generated";
import {LikeOutlined, MessageOutlined, StarOutlined} from "@ant-design/icons-vue";
import SubmissionRecordView from "@/components/SubmissionRecordView.vue";
import SolutionListView from "@/components/SolutionListView.vue";
import MdViewer from "@/components/MdViewer.vue";
import message from "@arco-design/web-vue/es/message";
import {onMounted} from "@vue/runtime-core";
import {Spin, Input, Tag,Result, Modal, Button} from 'ant-design-vue'
import UserExamHeader from "@/views/user/UserExamHeader.vue";
import {useRouter} from "vue-router";
import dayjs from "dayjs";

const testView = ref("case")
const spinning = ref(true)
const runResultUUID = ref()
const isLoading = ref(true)
const visible = ref(true)
const changeButton = (str: string) => {
  // alert(runResultUUID.value)
  if (str === 'result') {
    if (runResultUUID.value != undefined && runResultUUID.value != "") {
      testView.value = str
    }
  } else {
    testView.value = str
  }
}
const drawerClose = () => {
  visible.value = false
}
const showAllQuestions = () => {
  visible.value = true
}
const openModal = ref(false)

//TODO 题目集Id
const questionGroupId = ref("1777561784207572993")
const examQuestions = ref([] as any[])
const examName = ref("")
const examScore = ref(0)
const timeLimit = ref(0)
const endTime = ref(dayjs())


const goQuestion = (questionId: string) => {
  loadData(questionId)
  visible.value = false
}

const status1 = ref(false);
const layout_first_full_screen = ref(false);

// 第二个面板是否全屏
const layout_second_first_full_screen = ref(false);

// 第三个面板是否全屏
const layout_second_second_full_screen = ref(false);

// 第二面板分割大小
const secondSize = ref(0.643);
// 第一面板分割大小
const firstSize = ref(0.5);
// 拖动分割条后触发
const currentFirstSize = ref(0.5);
const handleMoveEndFirstSize = () => {
  currentFirstSize.value = firstSize.value;
};

// 拖动分割条后触发
const currentSecondSize = ref(0.68);
const handleMoveEndSecondSize = () => {
  currentSecondSize.value = secondSize.value;
};
// 给当前面板添加阴影
const firstSwitch = ref(false);
const secondSwitch = ref(false);
const thirdSwitch = ref(false);
const pitchOn = (number: number) => {
  if (number === 1) {
    firstSwitch.value = true;
    secondSwitch.value = false;
    thirdSwitch.value = false;
  }
  if (number === 2) {
    firstSwitch.value = false;
    secondSwitch.value = true;
    thirdSwitch.value = false;
  }
  if (number === 3) {
    firstSwitch.value = false;
    secondSwitch.value = false;
    thirdSwitch.value = true;
  }
};
const submitId = ref()
const router = useRouter()
const getSubmit = (e: any) => {
  console.log("父组件", e)

  setTimeout(() => {
    submitId.value = e
  }, 1000)
}

const totalScore = ref(0)
const finishExam = async (e: any) => {
  ExamControllerService.submitExamUsingGet(examId as any)
  const res = await ExamControllerService.getExamVoByIdUsingGet(examId as any)
  totalScore.value = res.data?.score as any
  message.success("提交成功")
  openModal.value = e
}

const toUserExamQuestionView = () => {
  router.push(
      {
        path: "/examine"
      }
  )
}


const runResult = ref<[any, any]>()
const runResultOutPut = ref();
const runResultMessage = ref();
const getRunResultUUID = async (e: any) => {
  spinning.value = true;
  runResultUUID.value = e
  testView.value = "result"
  isLoading.value = true
  const res = await QuestionSubmitControllerService.getRunResultUsingPost(runResultUUID.value)

  runResult.value = [res.data[0], res.data[1]]
  runResultOutPut.value = res.data[0];
  runResultMessage.value = res.data[1]

  console.log("输出:" + runResultOutPut?.value)
  console.log(typeof runResultOutPut == "undefined")
  isLoading.value = false
  spinning.value = false;


}

interface Props {
  id: string
}

const props = withDefaults(defineProps<Props>(), {
  id: () => ""
})
const getExamQuestions = async () => {
  if(props.id == "" || props.id == undefined) {
    message.error("题目集为空")
    examQuestions.value = []
    return
  }else {
    const res = await QuestionGroupControllerService.getQuestionGroupByIdUsingGet(props.id as any)
    examQuestions.value = res.data?.questionList ?? []
    timeLimit.value = res.data?.limitTime ?? 0

    examName.value = res.data?.groupName ?? ""
    examScore.value = res.data?.score ?? 0
    endTime.value = res.data?.endTime as any
    if(examQuestions.value.length > 0) {
      await loadData(examQuestions.value[0].id)
    }else {
      message.error("题目集为空")
    }
    if (timeLimit.value <= 0) {
      openModal.value = true
    }

  }

}

const examQuestionId = ref("1777256867446157313")
const form = ref<QuestionSubmitAddRequest>({
  language: "java",
  code: "import java.util.*; \n\npublic class Main {\n    public static void main(String[] args) {\n      //请在此处编写代码\n    }\n}",
  questionId: examQuestionId.value as any
})

const changeCode = (value: string) => {
  form.value.code = value;
}

const inputList = ref([])

const divHeight = ref(500);
window.onload = () => {
  // 获取 code editor 容器元素
  const codeEditorContainer = document.getElementById("code-editor-container");
  if (codeEditorContainer != null) {
    // 创建一个 ResizeObserver 实例
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        divHeight.value = entry.contentRect.height;
      }
    });

    // 开始监听指定 code editor 容器元素的大小变化
    observer.observe(codeEditorContainer);
  }
};
const question = ref<QuestionVO>()
const showContent = (tab: string) => {
  activeTab.value = tab;

}
const activeTab = ref('description')

const loadData = async (questionId?: any) => {

  const res = await QuestionControllerService.getQuestionVoByIdUsingGet(
      questionId
  )
  if (res.code === 0) {
    question.value = res.data
  } else {
    message.error("加载失败:" + res.message)
  }
}
const examId = router.currentRoute.value.query.examId
const remainingTime = ref(0)
const getRemainingTime = async () => {
  const res = await ExamControllerService.getRemainingTimeUsingGet(examId as any)
  remainingTime.value = res.data as any
}
onMounted(() => {
  getRemainingTime()
  getExamQuestions()
})
</script>
<style>
:where(.css-dev-only-do-not-override-1hsjdkk).ant-result .ant-result-content {
  padding: 10px;
  margin-top: 20px;
  background: #ffffff;
}
</style>
<style scoped>
.logo {
  height: 20px;
  cursor: pointer;
  margin-left: 15px;
}

.demo-basic {
  padding: 6px 10px;
  background-color: var(--color-bg-popup);
  border-radius: 4px;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.15);
}

.custom-button {
  border-radius: 5px; /* 设置圆角大小 */
  background-color: #fafafa;
  border: none;
  outline: none;
  margin-left: 5px;
}

.custom-button:hover {
  background-color: #f0f0f0;
}

.active-tab {
  border-radius: 5px; /* 设置圆角大小 */
  background-color: #fafafa;
  border: none;
  outline: none;
  color: #0000008c;
  margin-left: 5px;
}

.active-tab:hover {
  background-color: #f0f0f0;
}

.tailored-button {
  border-radius: 5px; /* 设置圆角大小 */
  background-color: #ffffff;
  border: none;
  outline: none;
  margin-left: 5px;
}

.tailored-button:hover {
  background-color: #f0f0f0;
}

.submitButton {
  border-radius: 0 5px 5px 0; /* 设置圆角大小 */
  background-color: #e7e7e7;
  border: none;
  outline: none;
  width: 100px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.submitButton:hover {
  background-color: #e2e2e2;
}

.runButton {
  background-color: #e7e7e7;
  border-radius: 5px 0 0 5px; /* 设置圆角大小 */
  border: none;
  outline: none;
  width: 100px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-right: 1px solid #f0f0f0;
}

.runButton:hover {
  background-color: #e2e2e2;
}

.round-avatar {
  border-radius: 50%; /* 将图片设为圆形 */
  width: 60px; /* 图片宽度 */
  height: 60px; /* 图片高度 */
  margin-right: 15px; /* 图片右侧留出一些间距 */
}

.username {
  font-weight: bold; /* 设置字体加粗 */
  font-size: 18px; /* 设置字体大小为16像素 */
  margin-bottom: 10px;
}

.avatar-wrapper {
  display: flex; /* 使用 Flex 布局 */
  align-items: center; /* 垂直居中 */
  margin: 15px; /* 设置 div 的边距为2px */
}

.full-button {
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background-color: transparent;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 200px;
  height: 30px;
  border-radius: 4px;
}

.full-button:hover {
  background-color: #f5f5f5;
}

.arrow-cursor {
  height: 94vh;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: ew-resize;
  position: relative;
  width: 4px;
}

.arrow-cursor::after {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 5px;
  background-color: #007aff;
  opacity: 0;
  transition: opacity 0.3s;
}

.arrow-cursor:hover::after {
  opacity: 1;
}

.hover-line {
  display: flex;
  width: calc(100% - 10px);
  justify-content: center;
  align-items: center;
  cursor: ns-resize;
  position: relative;
  height: 4px;
  background-clip: padding-box;
}

.hover-line::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  height: 2px;
  background-color: #007aff;
  opacity: 0;
  transition: opacity 0.3s;
}

.hover-line:hover::after {
  opacity: 1;
}

.language {
  background-color: transparent;
  border: none;
  border-radius: 5px;
  padding: 3px 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.language:hover {
  background-color: #f5f5f5;
}

.layout-first {
  position: relative;
  overflow: hidden;
  margin-left: 10px;
  margin-right: 1px;
  border-radius: 10px;
  background: #ffffff;
  height: calc(94vh - 1px);
  margin-top: 1px;
}

.layout-first-box-shadow {
  box-shadow: 0 0 1px rgba(0, 0, 0, 1);
}

.layout-first-full-screen {
  z-index: 1;
  position: absolute;
  top: 5vh;
  left: 0;
  right: 10px;
  height: 94vh;
}

.arrow-class {
  display: none;
}

.layout-second-first {
  overflow: hidden;
  border-radius: 10px;
  background: #ffffff;
  height: calc(100% - 2px);
  margin: 1px 10px 1px 2px;
}

.layout-second-first-box-shadow {
  box-shadow: 0 0 1px rgba(0, 0, 0, 1);
}

.layout-second-first-full-screen {
  z-index: 1;
  position: absolute;
  top: 5vh;
  left: 10px;
  right: 0;
  height: 94vh;
}

.layout-second-second {
  border-radius: 10px;
  background: #ffffff;
  overflow: hidden;
  height: calc(100% - 2px);
  margin: 1px 10px 1px 2px;
}

.layout-second-second-box-shadow {
  box-shadow: 0 0 1px rgba(0, 0, 0, 1);
}

.layout-second-second-full-screen {
  z-index: 1;
  position: absolute;
  top: 5vh;
  left: 10px;
  right: 0;
  height: 94vh;
}

.icon-css {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 44px;
  height: 32px;
  border-radius: 5px;
  color: #0000008c;
  margin-right: 5px;
}

.icon-css:hover {
  background-color: #e7e7e7;
  color: black;
}

.icon-css-small {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  border-radius: 5px;
  color: #0000008c;
}

.icon-css-small:hover {
  background-color: #e7e7e7;
  color: black;
}
</style>