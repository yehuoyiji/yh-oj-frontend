<template>
  <div id="examineView">
    <Layout style="height: 100%; background-color:#f8f2f2;">
      <LayoutSider :style="siderStyle" style="box-shadow: 0 2px 6px rgba(175,116,116,0.06); height: 100%; min-height: 100vh">
        <div style="width: 100%">
<!--          <Button type="primary" style="margin-bottom: 16px" @click="toggleCollapsed">-->
<!--            <MenuUnfoldOutlined v-if="state.collapsed" />-->
<!--            <MenuFoldOutlined v-else />-->
<!--          </Button>-->
          <Menu
              v-model:openKeys="state.openKeys"
              v-model:selectedKeys="state.selectedKeys"
              mode="inline"
              theme="light"
              :inline-collapsed="state.collapsed"
              :items="items"
              style="margin-bottom: 5px; font-size: 16px"
              @click="handleClick"
          >
          </Menu>
        </div>

      </LayoutSider>
      <LayoutContent :style="contentStyle">
        <router-view  @clickChild="clickEven"></router-view>
      </LayoutContent>
    </Layout>
  </div>
</template>

<script setup lang="ts">
import {CSSProperties} from "vue";
import {Layout, LayoutContent, LayoutSider, Menu, Button} from 'ant-design-vue'
const contentStyle: CSSProperties = {
  // textAlign: 'center',
  // minHeight: 120,
  // lineHeight: '120px',
  // color: '#fff',
  // backgroundColor: '#108ee9',
  height: '100%',
  padding: '20px'
};
import { reactive, watch, h } from 'vue';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  MailOutlined,
  DesktopOutlined,
  InboxOutlined,
  AppstoreOutlined,
TeamOutlined,
BookOutlined,
DashboardOutlined,
CodeSandboxOutlined
} from '@ant-design/icons-vue';
import {useRoute, useRouter} from "vue-router";
import {onMounted} from "@vue/runtime-core";
const router = useRouter()
const routes = useRoute()
const state = reactive({
  collapsed: false,
  selectedKeys: ['1'],
  openKeys: ['sub1'],
  preOpenKeys: ['sub1'],
});
const clickEven = (val :any) => {
  state.selectedKeys = [val]
}
const items = reactive([
  {
    key: '1',
    icon: () => h(DashboardOutlined),
    label: '概览',
    title: '概览',
    path: '/practice/question/overviewView'
  },
  {
    key: '2',
    icon: () => h(BookOutlined),
    label: '题目集',
    title: '题目集',
    path: '/practice/question/problemsSetView'
  },
  {
    key: '3',
    icon: () => h(TeamOutlined),
    label: '用户组',
    title: '用户组',
    path: '/practice/question/userGroupView'
  },
  {
    key: '4',
    icon: () => h(CodeSandboxOutlined),
    label: '题库',
    title: '题库',
    path: '/practice/question/questionBankListView'
  }
]);
const handleClick = (info: any) => {
  console.log(info)
  router.push({
    path: info.item.path
  })
}
watch(
    () => state.openKeys,
    (_val, oldVal) => {
      state.preOpenKeys = oldVal;
    },
);
const toggleCollapsed = () => {
  state.collapsed = !state.collapsed;
  state.openKeys = state.collapsed ? [] : state.preOpenKeys;
};
const siderStyle: CSSProperties = {
  // textAlign: 'center',
  // lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#fff',
  paddingLeft: '7px'
};

onMounted(() => {
  router.push({
    path: '/practice/question/overviewView'
  })
})
</script>

<style >
#examineView {
  //z-index: -999;
}
#basicLayout .content[data-v-d4ba89ee] {
  padding: 0 !important;
}
:where(.css-dev-only-do-not-override-1hsjdkk).ant-menu-light.ant-menu-inline .ant-menu-item {
  margin: 10px 0;
}

</style>