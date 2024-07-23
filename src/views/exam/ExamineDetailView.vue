<template>
  <div id="examineDetailView">
    <div class="detailBox">
      <div style="display: flex">
        <div style="flex: 2; margin-right: 30px">
          <div style="width: 280px; height: 152px; background: linear-gradient(#d5c0e8 0, #7171ff 100%); border-radius: 5px; display: flex; align-items: center;justify-content: center; color: #fff">
            <icon-desktop size="100" />
          </div>
        </div>
        <div style="flex: 7; display: flex; flex-direction: column; justify-content: space-between">
          <div class="examineTitle fontFamily">{{ questionGroupDetail?.groupName }}</div>
          <div>
            <aButton @click="toExaminePaper" class="fontFamily" type="primary" style="height: 40px; border-radius: 5px; font-size: 16px">查看试卷</aButton>
          </div>
        </div>
      </div>
      <div style="margin-top: 30px">
        <Card style="display: flex;box-shadow: 0 2px 6px rgba(225,207,207,0.06),0 4px 8px rgba(231,218,218,0.06),0 6px 12px rgba(218,205,205,0.06)">
          <div class="functionItem" @click="toExaminePaper">
            <div>
              <FileTextOutlined class="functionItemIcon" />
            </div>
            <div class="fontFamily2">
              试卷
            </div>
          </div>
          <div class="functionItem" @click="toExaminee">
            <div>
              <TeamOutlined class="functionItemIcon"/>
            </div>
            <div class="fontFamily2">
              考生
            </div>
          </div>
          <div class="functionItem" @click="toExamineSubmitList">
            <div>
              <UnorderedListOutlined class="functionItemIcon"/>
            </div>
            <div class="fontFamily2">
              提交列表
            </div>
          </div>
          <div class="functionItem" @click="toRankingList">
            <div>
              <icon-bar-chart style="color: hsl(212, 89%, 53%); font-size: 30px"/>
            </div>
            <div class="fontFamily2">
              排名
            </div>
          </div>
<!--          <div class="functionItem">-->
<!--            <div>-->
<!--              <CloudDownloadOutlined class="functionItemIcon"/>-->
<!--            </div>-->
<!--            <div class="fontFamily2">-->
<!--              导出-->
<!--            </div>-->
<!--          </div>-->
        </Card>
      </div>
      <div style="margin-top: 30px">
        <Card style="display: flex;padding: 10px 0; flex-direction: column; box-shadow: 0 2px 6px rgba(218,203,203,0.06),0 4px 8px rgba(217,202,202,0.06),0 6px 12px rgba(218,204,204,0.06)">
          <div class="examineConfig" >
            <div class="examineConfigFont">题目集类型</div>
            <div class="examineConfigFont2 fontFamily2">默认</div>
          </div>
          <div class="examineConfig">
            <div class="examineConfigFont">开始时间</div>
            <div class="examineConfigFont2 fontFamily2">{{moment(questionGroupDetail?.actionTime).format("YYYY/MM/DD HH:mm:ss")}}</div>
          </div>
          <div class="examineConfig">
            <div class="examineConfigFont">关闭时间</div>
            <div class="examineConfigFont2 fontFamily2">{{moment(questionGroupDetail?.endTime).format("YYYY/MM/DD HH:mm:ss")}}</div>
          </div>
          <div class="examineConfig">
            <div class="examineConfigFont">限制答题时长</div>
            <div class="examineConfigFont2 fontFamily2">{{questionGroupDetail?.limitTime}}分钟</div>
          </div>
          <div class="examineConfig">
            <div class="examineConfigFont">开放状态</div>
            <div class="examineConfigFont2 fontFamily2" v-if="questionGroupDetail?.status === 0">草稿</div>
            <div class="examineConfigFont2 fontFamily2" v-else-if="questionGroupDetail?.status === 1">已开放</div>
            <div class="examineConfigFont2 fontFamily2" v-else-if="questionGroupDetail?.status === 2">未开放</div>
            <div class="examineConfigFont2 fontFamily2" v-else>已关闭</div>
          </div>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {FileTextOutlined, TeamOutlined,UnorderedListOutlined,CloudDownloadOutlined} from "@ant-design/icons-vue"
import {IconDesktop, IconBarChart} from "@arco-design/web-vue/es/icon";
import {Button as aButton, Upload as aUpload,Input, Form, FormItem, Card} from 'ant-design-vue';

import {useRouter} from "vue-router";
import {QuestionGroupControllerService} from "../../../generated";
import {onMounted} from "@vue/runtime-core";
import {ref} from "vue";
import Bus from "@/utils/Bus";
import moment from "moment/moment";
interface Props {
  id: any
}
const props = withDefaults(defineProps<Props>(), {
  id: () => ""
})
const questionGroupDetail = ref()
const getQuestionGroupDetail = async () => {
  const res = await QuestionGroupControllerService.getQuestionGroupByIdUsingGet(props.id)
  questionGroupDetail.value = res.data
}

const router = useRouter()


const toExaminePaper = () => {

  Bus.emit('questionGroupId', props.id)
  router.push({
    path: `/practice/question/examineDetailView/examinePaperView/${props.id}`,
    }
  )
}

const toExaminee = () => {
  router.push({
        path: `/practice/question/examineDetailView/examineeView/${props.id}`,
      }
  )
}

const toExamineSubmitList = () => {
  router.push({
    path: `/practice/question/examineDetailView/examineSubmitListView/${props.id}`
  })
}

const toRankingList = () => {
  router.push( {
    path: `/practice/question/examineDetailView/examineRankingView/${props.id}`
  })
}
onMounted(() => {
  getQuestionGroupDetail()
})
</script>

<style >
body {

}
#basicLayout .content[data-v-d4ba89ee] {
  background: hsl(214, 100%, 97%) !important;
}
#examineDetailView {
  padding-left: 350px;
  padding-right: 350px;

}
.detailBox {
  display: flex;
  flex-direction: column;
  margin-top: 50px;
}
.examineTitle {
  font-size: 26px;
  //font-weight: 700;
}
.fontFamily {
  font-family: 'JBMono', ui-monospace, SFMono-Regular, Menlo,
  Monaco, Consolas, "Liberation Mono",
  "Courier New", 'Harmony', ui-sans-serif, system-ui,
  -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
  "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
  "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";}
.functionItem {
  width: 250px;
  height: 60px;
  display: inline-block;
  text-align: center;
  margin: 10px 15px 10px 15px;
  cursor: pointer;
}
.functionItem:hover {
  color: hsl(212, 89%, 53%);
}
.fontFamily2 {
  font-family: "Arial", "Microsoft YaHei", "黑体", "宋体", sans-serif;
}
.functionItemIcon {
  font-size: 30px;color: hsl(212, 89%, 53%);
}
.examineConfig {
  display: flex; justify-content: space-between; flex: 1;
  margin-bottom: 20px;
}
.examineConfig:last-child {
  margin-bottom: 0;
}
.examineConfigFont {
  color: #737373;
  font-size: 15px;
}
.examineConfigFont2 {
  font-size: 15px;
}
</style>
