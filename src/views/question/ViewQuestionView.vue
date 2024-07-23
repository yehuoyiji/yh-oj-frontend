<template>
  <div id="viewQuestionView">
    <ViewQuestionHeader :info="form"></ViewQuestionHeader>
    <a-split style="overflow: hidden" :style="{
        height: '92vh',
        width: '100%',
        minWidth: '500px',
        overflow: 'hidden',
      }"
             v-model:size="size"
             min="320px"
             max="1000px"
    >
      <template #first>
        <a-typography-paragraph style="display: flex">
          <a-space direction="vertical" size="large" style="display: flex; flex: 1">
            <a-card v-if="question" style="padding: 0; border-radius: 10px;  ">
              <div style="flex: 1">
                <div
                    style="display: flex;border-radius: 10px 10px 0 0; width: 100%; background-color:rgb(242, 243 ,245); padding: 4px">
                  <div style=" padding: 0 5px">
                    <a-button style="padding: 0 5px"
                              :class="{ activeButton: activeTab === 'description' }"
                              class="viewQuestionButton" @click="showContent('description')">
                      <icon-bookmark
                          style="font-size: 20px; color: blueviolet; margin-right: 5px"/>
                      题目描述
                    </a-button>
                  </div>
                  <div style=" padding: 0 5px">
                    <a-button class="viewQuestionButton" @click="showContent('solution');">
                      <icon-experiment
                          style="font-size: 20px; color: blueviolet; margin-right: 5px"/>
                      题解
                    </a-button>
                  </div>
                  <div style=" padding: 0 5px">
                    <a-button class="viewQuestionButton" @click="showContent('records')">
                      <icon-calendar-clock
                          style="font-size: 20px; color: blueviolet; margin-right: 5px"/>
                      提交记录
                    </a-button>
                  </div>
                </div>
                <div style="">
                  <div v-if="activeTab === 'description'" style="overflow-y: auto;" >
                    <div style="padding: 20px 20px 0 20px">
                      <h1 style="font-weight: 700">
                        {{question.title}}
                      </h1>
                      <a-tag color="orangered" style=" justify-content:center;margin-right: 10px; font-size: 14px; width: 60px; height: 26px; border-radius: 10px" v-for="item in JSON.parse(question.tags as any)">{{item}}</a-tag>
                    </div>
                    <div style="padding: 10px 20px 0 20px">
                      <h2 style="font-weight: 700;display: block">判题条件</h2>
                      <a-descriptions :column="{xs:1, md:2, lg:3}">

                        <a-descriptions-item label="时间限制:">
                          <a-tag  style=" justify-content:center;color: #00af9b; font-size: 14px; width: 80px; height: 26px; border-radius: 10px">{{question.judgeConfig.timeLimit ?? 0}}MS</a-tag>
                        </a-descriptions-item><a-descriptions-item label="内存限制:">
                        <a-tag  style=" justify-content:center;color: #00af9b;font-size: 14px; width: 80px; height: 26px; border-radius: 10px">{{question.judgeConfig.memoryLimit ?? 0}}K</a-tag>
                      </a-descriptions-item><a-descriptions-item label="堆栈限制:">
                        <a-tag  style=" justify-content:center;color: #00af9b;font-size: 14px; width: 80px; height: 26px; border-radius: 10px">{{question.judgeConfig.stackLimit ?? 0}}K</a-tag>
                      </a-descriptions-item>
                      </a-descriptions>
                    </div>
                    <MdViewer style="padding: 20px; height: 60vh "
                              v-if="activeTab === 'description'"
                              :value="question.content || ''"></MdViewer>
                  </div>



                  <div style="height: 84vh; padding: 20px;overflow-y: auto;"
                       v-if="activeTab === 'solution'">
                    <solution-list-view></solution-list-view>
                  </div>
                  <div style="height: 84vh; padding: 20px;overflow-y: auto;"
                       v-if="activeTab === 'records'">
                    <submission-record-view></submission-record-view>
                  </div>
                </div>
                <div v-if="activeTab === 'description' "
                     style="display: flex; height: 40px; align-items: center">
                  <div class="btn1">
                    <a-space>
                      <LikeOutlined/>
                      点赞
                    </a-space>
                  </div>
                  <div class="btn1">
                    <a-space>
                      <MessageOutlined/>
                      评论
                    </a-space>
                  </div>
                  <div class="btn1">
                    <a-space>
                      <StarOutlined/>
                      收藏
                    </a-space>
                  </div>
                </div>
              </div>
            </a-card>
          </a-space>
        </a-typography-paragraph>
      </template>
      <template #second>
        <a-typography-paragraph style="">
          <div style="">
            <a-split min="520px" v-model:size="size2" max="800px" direction="vertical" style="display: flex; " :style="{        height: '1500px',
        width: '100%',
        minWidth: '500px',
        overflow: 'hidden',}">
              <template #first>
                <a-typography-paragraph style="">
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
<!--                        <Dropdown :trigger="['click']" style="cursor: pointer;  width: 100%">-->
<!--                          <a class="ant-dropdown-link" @click.prevent>-->
<!--                            Java-->
<!--                            <DownOutlined/>-->
<!--                          </a>-->
<!--                          <template #overlay>-->
<!--                            <Menu>-->
<!--                              <MenuItem>-->
<!--                                <a href="javascript:;">Java</a>-->
<!--                              </MenuItem>-->
<!--                              <MenuItem>-->
<!--                                <a href="javascript:;">Python</a>-->
<!--                              </MenuItem>-->
<!--                              <MenuItem>-->
<!--                                <a href="javascript:;">C</a>-->
<!--                              </MenuItem>-->
<!--                            </Menu>-->
<!--                          </template>-->
<!--                        </Dropdown>-->
                        <a-select v-model="form.language" :style="{width:'260px'} " placeholder="选择编程语言">
                          <a-option>java</a-option>
                          <a-option>python</a-option>
                          <a-option>c</a-option>
                        </a-select>
                      </div>
                    </div>
                    <CodeEditor :value="form.code" :language="form.language" :handle-change="changeCode"></CodeEditor>
                  </a-card>
                </a-typography-paragraph>
              </template>
              <template #second>
                <a-typography-paragraph style="display: flex; flex-direction: column; ">
                  <a-space direction="vertical" size="large" style="display: flex; flex-direction: column; flex: 1; ">
                    <a-card v-if="question" style="padding: 0;flex: 1; border-radius: 10px;">
                      <div style="display:flex;flex: 1; flex-direction: column; min-height: 320px; ">
                        <div
                            style="display: flex;border-radius: 10px 10px 0 0; width: 100%; background-color:rgb(242, 243 ,245); padding: 4px">
                          <div style=" padding: 0 5px">
                            <a-button style="padding: 0 5px"
                                      :class="{ activeButton: activeTab === 'description' }"
                                      class="viewQuestionButton" @click="showContent('description')">
                              <icon-bookmark
                                  style="font-size: 20px; color: blueviolet; margin-right: 5px"/>
                              测试用例
                            </a-button>
                          </div>
                          <div style=" padding: 0 5px">
                            <a-button class="viewQuestionButton" @click="showContent('solution');">
                              <icon-experiment
                                  style="font-size: 20px; color: blueviolet; margin-right: 5px"/>
                              测试结果
                            </a-button>
                          </div>
                        </div>
                        <div style="display: flex; height: 240px; flex-direction: column; overflow-y: scroll; padding: 20px; ">
                          <div>
                            <div style="display:flex; flex-direction: column">
                              <div>nums=</div>
                              <div style="padding: 10px;height:40px; background-color:#f1f6f6;border-radius: 10px"></div>
                            </div>
                            <div>
                              <div>target=</div>
                              <div style="padding: 10px;height:40px;display: flex; flex: 1;  background-color:#eef5f5;border-radius: 10px"></div>
                            </div>
                          </div><div>
                            <div style="display:flex; flex-direction: column">
                              <div>nums=</div>
                              <div style="padding: 10px;height:40px; background-color:#f1f6f6;border-radius: 10px"></div>
                            </div>
                            <div>
                              <div>target=</div>
                              <div style="padding: 10px;height:40px;display: flex; flex: 1;  background-color:#eef5f5;border-radius: 10px"></div>
                            </div>
                          </div><div>
                            <div style="display:flex; flex-direction: column">
                              <div>nums=</div>
                              <div style="padding: 10px;height:40px; background-color:#f1f6f6;border-radius: 10px"></div>
                            </div>
                            <div>
                              <div>target=</div>
                              <div style="padding: 10px;height:40px;display: flex; flex: 1;  background-color:#eef5f5;border-radius: 10px"></div>
                            </div>
                          </div><div>
                            <div style="display:flex; flex-direction: column">
                              <div>nums=</div>
                              <div style="padding: 10px;height:40px; background-color:#f1f6f6;border-radius: 10px"></div>
                            </div>
                            <div>
                              <div>target=</div>
                              <div style="padding: 10px;height:40px;display: flex; flex: 1;  background-color:#eef5f5;border-radius: 10px"></div>
                            </div>
                          </div><div>
                            <div style="display:flex; flex-direction: column">
                              <div>nums=</div>
                              <div style="padding: 10px;height:40px; background-color:#f1f6f6;border-radius: 10px"></div>
                            </div>
                            <div>
                              <div>target=</div>
                              <div style="padding: 10px;height:40px;display: flex; flex: 1;  background-color:#eef5f5;border-radius: 10px"></div>
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
                </a-typography-paragraph>
              </template>
            </a-split>
          </div>


        </a-typography-paragraph>
      </template>
    </a-split>


  </div>
</template>

<script setup lang="ts">
import {QuestionAddRequest, QuestionControllerService, QuestionSubmitAddRequest, QuestionVO} from "../../../generated";
import {reactive, ref} from "vue";
import message from "@arco-design/web-vue/es/message";
import {onMounted} from "@vue/runtime-core";
import CodeEditor from "@/components/CodeEditor.vue";
import MdViewer from "@/components/MdViewer.vue";
import {IconCode, IconBookmark, IconExperiment, IconCalendarClock,} from '@arco-design/web-vue/es/icon';
import {DownOutlined, LikeOutlined, MessageOutlined, StarOutlined} from '@ant-design/icons-vue'
import {Menu, MenuItem, Dropdown} from 'ant-design-vue'
import SolutionListView from "@/components/SolutionListView.vue";
import {useRoute} from "vue-router";
import SubmissionRecordView from "@/components/SubmissionRecordView.vue";
import ViewQuestionHeader from "@/components/ViewQuestionHeader.vue";

const changeCode = (value:string) => {
  form.value.code = value;
}
const position = ref('top');
const activeKey = ref('1');
const activeTab = ref('description')
const route = useRoute()
const size = ref(0.5)
const size2 = ref(0.5)
const showContent = (tab: string) => {
  activeTab.value = tab;
}

interface Props {
  id: string
}

const param1 = route.query.msg
onMounted(() => {
  if (param1 === "solution") {
    activeTab.value = param1
  }
})
const props = withDefaults(defineProps<Props>(), {
  id: () => ""
})

const question = ref<QuestionVO>()
const loadData = async () => {

  const res = await QuestionControllerService.getQuestionVoByIdUsingGet(
      props.id as any
  )
  if (res.code === 0) {
    question.value = res.data
  } else {
    message.error("加载失败:" + res.message)
  }
}

onMounted(() => {
  loadData()
})

const form = ref<QuestionSubmitAddRequest>({
  language: "java",
  code: "",
  questionId: props.id as any
})
</script>

<style>
#viewQuestionView {

}

.arco-card-size-medium .arco-card-body {
  padding: 0 !important;
}

.viewQuestionButton {
  border-radius: 7px !important;
  font-weight: 500 !important;
  font-size: 18px !important;
  color: #1a1a1a !important;
}

.activeButton {
  background-color: rgb(201, 205, 212);
}

.arco-btn-size-medium {
  padding: 0 5px !important;
}

.languageSelect:hover {
  background-color: rgb(242, 243, 245);

}

.languageSelect {

}

.btn1:hover {
  background-color: rgb(242, 243, 245);
}

.btn1:first-child {
  margin-left: 10px;
}

.btn1 {
  border-radius: 7px;
  height: 30px;
  width: 80px;
  font-size: 16px;
  line-height: 30px;
  margin: 10px 5px 10px 0;
  padding-left: 10px;
  cursor: pointer;
}

.arco-split-pane {
  overflow: hidden !important;
}

.resize-trigger-icon {

}

.arco-split-trigger-icon-wrapper {
  background-color: rgba(255, 255, 255, 0) !important;
}

.arco-split-trigger-icon-wrapper:hover {
  background-color: blueviolet !important;
  border-radius: 5px !important;
}
#basicLayout .content[data-v-d4ba89ee] {
  padding: 10px 20px 20px 20px !important;
}
</style>