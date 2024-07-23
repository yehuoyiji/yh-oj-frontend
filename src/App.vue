<template>
  <div id="app">
    <template v-if="route.path.startsWith('/user')">
      <router-view></router-view>
    </template>
    <template v-else>
      <BasicLayout></BasicLayout>
    </template>

  </div>

</template>

<style>

</style>
<script setup lang="ts">
import BasicLayout from "@/layouts/BasicLayout.vue";
import {useRoute, useRouter} from "vue-router";
import {useStore} from "vuex";
import ACCESS_ENUM from "@/access/accessEnum";
import {onMounted} from "@vue/runtime-core";

const route = useRoute();

/**
 * 全局初始化函数, 有全局单词调用的代码, 都可以写到这里
 */
const doInit = () => {
  console.log("NDNUOJ平台")
}

onMounted(() => {
  doInit()
})

</script>
<style>
#app {
overflow-y: hidden;
}
</style>