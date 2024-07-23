<template>
  <div id="RankingList">
    <Card style="padding: -5px;  border-radius: 15px; display: flex; flex-direction: column; margin-top: 10px; box-shadow: 0 2px 6px rgba(7,0,0,0.06),0 4px 8px rgba(7,0,0,0.06),0 6px 12px rgba(7,0,0,0.06)">
      <div>
        <div style="font-size: 18px; margin-top: -5px">
          <a-space size="large">
            <ScheduleOutlined style="color: #FFB800; font-size: 20px" />
             做题排行榜
          </a-space>
          <span style="float: right; font-weight: 700">TOP10</span>
        </div>

          <div v-for="(item, index) in rankingList" :key="index" >
            <div class="rankingListBg">
              <div class="icon-rank icon-rank-no1" v-if="index + 1 === 1">{{index + 1}}</div>
              <div class="icon-rank icon-rank-no2" v-else-if="index + 1 === 2">{{index + 1}}</div>
              <div class="icon-rank icon-rank-no3" v-else-if="index + 1 === 3">{{index + 1}}</div>
              <div class="icon-rank " v-else>{{index + 1}}</div>
              <div style="margin-right: 10px; width: 80px">
                {{item?.userName}}
              </div>

              <Progress :percent="item?.acceptNum" size="small" status="active" style="display: flex; float: right; width: 150px; text-align: center; align-items: baseline" :format="() => item?.acceptNum  + '/' +  questionCount  " />
            </div>

          </div>


      </div>
    </Card>
  </div>
</template>

<script setup lang="ts">
import {Card,Progress} from "ant-design-vue";
import {ScheduleOutlined} from '@ant-design/icons-vue';
import {ref} from "vue";
import {QuestionControllerService, UserControllerService} from "../../generated";
import {onMounted} from "@vue/runtime-core";



const rankingList = ref([] as any[])
const getRankingList = async () => {
  const res = await UserControllerService.getRankingUsingGet()
  if(res.code === 0) {
    rankingList.value = res.data as any[]
  }
}
const questionCount = ref(0)
const getQuestionCount = async () => {
  const res = await QuestionControllerService.getQuestionCountUsingGet()
  if(res.code === 0) {
    questionCount.value = res.data as number
  }
}
onMounted(() => {
  getRankingList()
  getQuestionCount()
})
</script>

<style scoped>
.rankingListBg {
  display: flex;
  background-color: #f8f8fa;
  border-radius: 10px;
  margin: 5px 0;
  padding: 5px 10px;
  align-items: center;
  text-align: center;
  height: 46px;
}
.icon-rank {
  //display: flex;
  //justify-content: center;
  //align-items: center;
  width: 26px;
  height: 26px;
  border-radius: 13px;
  text-align: center;
  font-size: 18px;
  margin-left: 5px;
  margin-right: 15px;
  line-height: 24px;
}
.icon-rank-no1 {
  background-color: #1dfc04;
}
.icon-rank-no2 {
  background-color: #3a5ac9;
}
.icon-rank-no3 {
  background-color: #776e5f;
}

</style>