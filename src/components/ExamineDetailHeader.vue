<template>
  <a-divider></a-divider>
  <div id="ExamineDetailHeader">
    <div style="display: flex">
      <div style="display: flex; flex: 1"></div>
      <div style="display: flex; flex: 1; justify-content: center">
        <div class="headerItem" :class="{itemHeightLight : routes.path.includes('examinePaperView') }"    @click="showContent('examinePaperView')">
          <a-space>
            <FileTextOutlined class="functionItemIcon" />
            试卷
          </a-space>
        </div>
        <div class="headerItem" :class="{itemHeightLight : routes.path.includes('examineeView') }" @click="showContent('examineeView')">
          <a-space>
            <TeamOutlined class="functionItemIcon"/>
            考生
          </a-space>
        </div>
        <div class="headerItem" :class="{itemHeightLight : routes.path.includes('examineSubmitListView') }" @click="showContent('examineSubmitListView')">
          <a-space>
            <UnorderedListOutlined class="functionItemIcon"/>
            提交列表
          </a-space>
        </div>
        <div class="headerItem" :class="{itemHeightLight : routes.path.includes('examineRankingView') }" @click="showContent('examineRankingView')">
          <a-space>
            <icon-bar-chart style="font-size: 16px"/>
            排名
          </a-space>
        </div>
        <div class="headerItem">
          <a-space>
            <CloudDownloadOutlined class="functionItemIcon"/>
            导出
          </a-space>
        </div>
      </div>
      <div style="display: flex; flex: 1"></div>
    </div>
  </div>
  <a-divider></a-divider>
</template>

<script setup lang="ts">
import {ref} from "vue";
import { onMounted} from "@vue/runtime-core";

import {useStore} from "vuex";
import {useRoute, useRouter} from "vue-router";
import {CloudDownloadOutlined, FileTextOutlined, TeamOutlined, UnorderedListOutlined} from "@ant-design/icons-vue";
import {IconBarChart} from "@arco-design/web-vue/es/icon";

const router = useRouter()
const routes = useRoute();
const store = useStore()
const activeTab = ref('examinePaper')
const path = ref('')
import Bus from "@/utils/Bus";


const questionGroupId = ref()
Bus.on('questionGroupId',(data)=>{
  console.log(data,'兄弟组件传值');
  questionGroupId.value = data

})
const showContent = (tab: string) => {
  // activeTab.value = tab;
  //
  // store.dispatch('examine/changeActiveTab', tab)

  if(tab === 'examineeView') {
    router.push(`/practice/question/examineDetailView/examineeView/${questionGroupId.value}`)
  }
}



onMounted(() => {

})

</script>

<style scoped>
#ExamineDetailHeader {
  padding: 5px 20px 5px 30px;
  background: #fff;
}

.headerItem {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90px;
  height: 35px;
  text-align: center;
  line-height: 35px;
  margin-right: 20px;
  border-radius: 5px;
  cursor: pointer;
}


.itemHeightLight {

  background-color: #1c80f2;
  //color: #fff;
}

.arco-divider-horizontal {
  margin: 0;
}
.functionItemIcon{
  font-size: 16px;
  color: #1a1a1a;
}

.itemHeightLight.functionItemIcon {
  color: #1a1a1a;
}
</style>