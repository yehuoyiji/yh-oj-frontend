<template>

    <div id="basicLayout">
      <a-layout style="min-height: 100vh">
        <a-layout-header>
          <GlobalHeader v-if="!routes.path.startsWith('/view/question') && !routes.path.startsWith('/examine/doExamine')" class="header"></GlobalHeader>
<!--          <ViewQuestionHeader  v-else></ViewQuestionHeader>-->
<!--          <ExamineDetailHeader v-if="routes.path.startsWith('/practice/question/examineDetailView/examinePaperView')"></ExamineDetailHeader>-->
<!--          <ExamineDetailHeader v-if="routes.path.startsWith('/practice/question/examineDetailView/examineeView')"></ExamineDetailHeader>-->
<!--          <ExamineDetailHeader v-if="routes.path.startsWith('/practice/question/examineDetailView/examineRankingView')"></ExamineDetailHeader>-->
<!--          <ExamineDetailHeader v-if="routes.path.startsWith('/practice/question/examineDetailView/examineSubmitListView')"></ExamineDetailHeader>-->
        </a-layout-header>
        <a-layout-content class="content">
          <router-view  />
        </a-layout-content>
<!--        <a-layout-footer class="footer" v-if="!routes.path.startsWith('/view')">-->
<!--          NDNU-OJ-->
<!--        </a-layout-footer>-->
      </a-layout>
    </div>




</template>
<script setup lang="ts">
  import GlobalHeader from "@/components/GlobalHeader.vue"
  import {Watermark} from "ant-design-vue"
  import {useRoute} from "vue-router";
  import ViewQuestionHeader from "@/components/ViewQuestionHeader.vue";
  import ExamineDetailHeader from "@/components/ExamineDetailHeader.vue";
  const routes = useRoute()
</script>
<style scoped>
#basicLayout {
  background-color: #f8f7f7;
}

#basicLayout .header {

  //margin-bottom: 16px;
  box-shadow: #eee 1px 1px 5px;
}

#basicLayout .content {
  padding: 20px;
  //background: #fbfcfa;  /* fallback for old browsers */
  //background: -webkit-linear-gradient(to top, #3db455, #e1eec3);  /* Chrome 10-25, Safari 5.1-6 */
  //background: linear-gradient(to top, #f05053, #e1eec3);
  //margin-bottom: 16px;
  width: 100%;
  height: 100%;
  //background: url("https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr");
}

#basicLayout .footer {
  background: #efefef;
  padding: 16px;
  width: 100%;
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
  z-index: 10;
}
</style>


