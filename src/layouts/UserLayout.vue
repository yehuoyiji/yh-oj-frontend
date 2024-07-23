<template>

    <div id="userLayout">
      <a-layout style="min-height: 100vh">
        <a-layout-header class="header">
          <a-space >
            <img src="@/assets/YHLOGO_result.png" class="logo">

<!--            <div style="font-size: 32px; font-weight: 700">YH-OJ</div>-->
          </a-space>

        </a-layout-header>
        <a-layout-content class="content">
          <router-view/>
        </a-layout-content>

      </a-layout>
    </div>




</template>
<script setup lang="ts">
import {Watermark} from "ant-design-vue";
</script>
<style scoped>
#userLayout {
  text-align: center;
  background: url("https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr");
  width: 100%;
  height: 100%;
}
#userLayout .logo {
  width: 64px;
  height: 64px;
}

#userLayout .header {
  margin-top: 6%;
  text-align: center;
  align-items: center;
}

#userLayout .content {
  padding: 20px;
  margin-bottom: 16px;
}

#userLayout .footer {
  background: #efefef;
  padding: 16px;
  position: fixed;
  bottom: 0;
  //left: 0;
  //right: 0;
  text-align: center;
  z-index: 999;
}
</style>


