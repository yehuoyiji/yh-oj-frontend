<!--
我已经黑转粉了，我是正规军
⠀⠀⠀ ⠀⠰⢷⢿⠄
⠀⠀⠀⠀ ⠀⣼⣷⣄
⠀ ⠀⣤⣿⣇⣿⣿⣧⣿⡄
⢴⠾⠋⠀⠀⠻⣿⣷⣿⣿⡀
🏀    ⢀⣿⣿⡿⢿⠈⣿
⠀⠀⠀ ⢠⣿⡿⠁⠀⡊⠀⠙
⠀ ⠀⠀⢿⣿⠀⠀⠹⣿
⠀⠀ ⠀⠀⠹⣷⡀⠀⣿⡄
🐔作者：芥末喂泡泡糖
-->
<template>
  <div style="background-color: #f0f0f0; overflow: hidden">
    <div style="height: 5vh;display: grid;grid-template-columns: repeat(3, 1fr);grid-gap: 10px; /* 可选，设置间距 */">
      <div style="height: 100%;margin-bottom: 5px;display: flex;justify-content: flex-start;align-items: center;">
        <img class="logo" :src="require('@/assets/logo.png')" alt="LOGO" @click="goToHomePage"/>
        <a-divider direction="vertical"/>
        <a-button :style="buttonStyle" @mouseover="handleMouseOver" @mouseleave="handleMouseLeave" @click="handleClick">
          <icon-menu-unfold style="margin-right: 10px" size="20"/>
          题库
          <a-button :style="buttonStyle" @mouseover="handleMouseOver" @mouseleave="handleMouseLeave">
            <icon-launch style="margin: -18px" size="12"/>
          </a-button>
        </a-button>
        <a-drawer
            :width="600"
            :visible="visible"
            @cancel="handleCancel"
            :placement="'left'"
            :footer="false"
            unmountOnClose
            :drawer-style="{ borderRadius: '15px' }"
        >
          <template #title>每日一题</template>
          <div
              style="
              display: flex;
              justify-content: center;
              align-items: center;
              margin: 10px auto 15px;
              border-radius: 10px;
            "
          >
            <a-space direction="vertical">
              <a-list
                  style="margin-bottom: 25px"
                  :data="dataList"
                  :hoverable="true"
                  :pagination-props="{
                  bufferSize: 3,
                  showJumper: true,
                  showPageSize: true,
                  showTotal: true,
                  pageSizeOptions: customPageSizeOptions,
                  pageSize: searchParams.pageSize,
                  current: searchParams.current,
                  total,
                }"
                  @page-change="onPageChange"
                  @page-size-change="onPageSizeChange"
              >
                <template #item="{ item }">
                  <a-list-item>
                    <a-list-item-meta>
                      <template #description>
                        <div
                            style="
                            height: 18px;
                            display: flex;
                            align-items: center;
                          "
                        >
                          <div style="width: 480px; display: flex">
                            <a-link
                                style="color: #262626"
                                @click="onClick(item.id)"
                            >{{ item.title }}
                            </a-link>
                          </div>
                          <div style="width: 30px; display: flex">
                            <span
                                v-if="item.difficulty === 1"
                                style="color: #00af9b"
                            >
                              简单
                            </span>
                            <span
                                v-else-if="item.difficulty === 3"
                                style="color: #ff2d55"
                            >
                              中等
                            </span>
                            <span
                                v-else-if="item.difficulty === 2"
                                style="color: #ffb800"
                            >
                              困难
                            </span>
                          </div>
                        </div>
                      </template>
                    </a-list-item-meta>
                  </a-list-item>
                </template>
              </a-list>
            </a-space>
          </div>
        </a-drawer>
        <a-button>
          <icon-left/>
        </a-button>
        <a-button>
          <icon-right/>
        </a-button>
      </div>
      <div
          style="
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        "
      >
        <button @click="doRun" :class="{ runButton: true }">
          <icon-run size="18" color="#686868" style="margin-right: 7px"/>
          <span style="color: #1a1a1a">运行</span>
        </button>
        <button
            @click="doSubmit"
            :class="{
            submitButton: true,
          }"
        >
          <icon-submit size="22" color="#02b128" style="margin-right: 7px"/>
          <span style="color: #02b128">提交</span>
        </button>
      </div>
      <div
          style="
          height: 100%;
          margin-bottom: 5px;
          margin-right: 35px;
          display: flex;
          justify-content: flex-end;
          align-items: center;
        "
      >
        <div
            class="icon-css-small"
            @mouseover="smallColor = 'black'"
            @mouseout="smallColor = '#737373'"
        >
          <icon-small-bell
              size="20"
              :color="smallColor"
              style="stroke: currentColor; stroke-width: 15px"
          />
        </div>
        <div
            class="icon-css"
            @mouseover="color = 'black'"
            @mouseout="color = '#737373'"
        >
          <icon-flame
              size="20"
              :color="color"
              style="stroke: currentColor; stroke-width: 15px"
          />
          <span
              style="
              font-weight: bold;
              margin-left: 5px;
              margin-right: 5px;
              font-size: 16px;
            "
          >{{ submitNumber }}</span
          >
        </div>
        <div>
          <a-trigger :popup-translate="[-140, 15]" trigger="hover">
            <a-avatar :size="30">
              <img v-if="userAvatar" alt="avatar" :src="userAvatar"/>
              <img
                  v-else
                  alt="avatar"
                  src="https://himg.bdimg.com/sys/portraitn/item/03cde88aa5e69cabe59682e58fa3e59abce7b396df8f"
              />
            </a-avatar>
            <template #content>
              <SetCenter/>
            </template>
          </a-trigger>
        </div>
      </div>
    </div>
    <div>
      <a-split
          :style="{
          height: '95vh',
          width: '100%',
        }"
          :min="50"
          :max="1869"
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

          </div>
        </template>
        <template #second>
          <div style="overflow: hidden">
            <a-split
                direction="vertical"
                :style="{ height: '94vh' }"
                :min="41"
                :max="858"
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
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref, watch, watchEffect} from "vue";
import message from "@arco-design/web-vue/es/message";
import CodeEditor from "@/components/CodeEditor.vue";
import {
  QuestionControllerService,

  QuestionQueryRequest,
  QuestionSubmitAddRequest,
  QuestionSubmitControllerService,

} from "../../../generated";
import {useRoute, useRouter} from "vue-router";
import {useStore} from "vuex";
// import NoteViewPage from "@/components/NoteViewPage.vue";
// import AnswerViewPage from "@/components/AnswerViewPage.vue";
// import QuestionViewPage from "@/components/QuestionViewPage.vue";
// import IconCutOffRule from "@/icon/icon-cut-off-rule.vue";
// import IconTestCase from "@/icon/icon-test-case.vue";
// import IconTestResult from "@/icon/icon-test-result.vue";
// import IconRun from "@/icon/icon-run.vue";
// import IconFlame from "@/icon/icon-flame.vue";
// import IconSmallBell from "@/icon/icon-small-bell.vue";
// import SetCenter from "@/components/SetCenter.vue";
// import IconSubmit from "@/icon/icon-submit.vue";

const route = useRoute();
const store = useStore();

const customPageSizeOptions = ref([30, 40, 50]);

const divHeight = ref(500);

const showNum = ref(1);

const listNum = ref();

const userAvatar = ref(store.state.user?.loginUser?.userAvatar);

// 第一个面板是否全屏
const layout_first_full_screen = ref(false);

// 第二个面板是否全屏
const layout_second_first_full_screen = ref(false);

// 第三个面板是否全屏
const layout_second_second_full_screen = ref(false);

// 第二面板分割大小
const secondSize = ref(0.68);
// 第一面板分割大小
const firstSize = ref(0.5);

// 是否已经运行
const isRun = ref(false);

// 默认标签页
const selectedTab = ref("description");

const color = ref("#737373");
const smallColor = ref("#737373");
const submitNumber = ref(0);

const isShow = ref(true);
const switchDisplay = (num: number) => {
  showNum.value = num;
  isShow.value = !isShow.value;
};

const indexNumber = ref(0);
const indexNum = ref(0);

const close = ref(true);

const switchTags = (index: any) => {
  indexNumber.value = index;
  indexNum.value = index;
};

const inputDate = ref([]);

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

const deleteTags = (index: any) => {
  if (inputDate.value.length === 1) {
    close.value = !close.value;
  }
  inputDate.value.splice(index, 1);
};

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
const changeCode = (value: string) => {
  form.value.code = value;
};

// 当前代码行数
const line = ref();
const changeLine = (value: string) => {
  line.value = value;
};

// 当前代码列数
const column = ref();
const changeColumn = (value: string) => {
  column.value = value;
};

const questionId = ref();

// 切换页面
const changeTab = (tab: string) => {
  selectedTab.value = tab;
  router.push({
    path: `/view/question/${questionId.value}/${tab}`,
  });
};

const router = useRouter();
const goToHomePage = () => {
  window.location.href = "/problemset"; // 跳转到另一个页面
};

const buttonStyle = ref({backgroundColor: "#f0f0f0"});

const handleMouseOver = () => {
  buttonStyle.value.backgroundColor = "#E2E2E2";
};

const handleMouseLeave = () => {
  buttonStyle.value.backgroundColor = "#f0f0f0";
};

const visible = ref(false);

const handleClick = () => {
  visible.value = true;
};
const handleCancel = () => {
  visible.value = false;
};

const searchParams = ref<QuestionQueryRequest>({
  pageSize: 50,
  current: 1,
});

const onPageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    current: page,
  };
};
const onPageSizeChange = (pageSize: number) => {
  searchParams.value = {
    ...searchParams.value,
    pageSize: pageSize,
  };
};
const question = ref();

const dataList = ref([]);
const total = ref(0);

const inputList = ref([0]);
const inputListName = ref([""]);
// 数据
const loadData = async () => {
  //抽屉数据
  // const res = await QuestionControllerService.listQuestionVoByPageUsingPost(
  //     searchParams.value
  // );
  // if (res.code === 0) {
  //   dataList.value = res.data.records;
  //   total.value = res.data.total;
  // } else {
  //   message.error("加载失败：" + res.message);
  // }
  // // 题目数据
  // const questionRes = await QuestionControllerService.getQuestionVoByIdUsingGet(
  //     question.value.id
  // );
  // if (questionRes.code === 0) {
  //   question.value = questionRes.data;
  //   inputList.value = question.value.input;
  //   inputListName.value = question.value.inputListName;
  //   listNum.value = question.value.inputListName[0][1];
  // } else {
  //   message.error("加载失败，" + questionRes.message);
  // }
  // // 初始点赞状态
  // const likeRes =
  //     await QuestionThumbControllerService.getQuestionThumbStatusUsingGet(
  //         question.value.id
  //     );
  // if (likeRes.code === 0) {
  //   isLike.value = likeRes.data;
  // } else {
  //   message.error("点赞状态失败：" + likeRes.message);
  // }
  // // 初始收藏状态
  // const collectRes =
  //     await QuestionFavourControllerService.getQuestionFavourStatusUsingGet(
  //         question.value.id
  //     );
  // if (collectRes.code === 0) {
  //   isCollect.value = collectRes.data;
  // } else {
  //   message.error("收藏状态失败：" + collectRes.message);
  // }
};

// 点赞
const isLike = ref();
const onLikeChange = async () => {
  // const res = await QuestionThumbControllerService.doQuestionThumbUsingPost({
  //   questionId: question.value.id,
  // });
  // if (res.code === 0) {
  //   question.value.thumbNum += res.data === 1 ? 1 : -1;
  //   isLike.value = res.data === 1 ? 1 : -1;
  // } else {
  //   message.error("点赞失败：" + res.message);
  // }
};

/**
 * 收藏
 * @param postId
 */

const isCollect = ref();
const onStarChange = async () => {
  // const res = await QuestionFavourControllerService.doQuestionFavourUsingPost({
  //   questionId: question.value.id,
  // });
  // if (res.code === 0) {
  //   isCollect.value = res.data === 1 ? 1 : -1;
  // } else {
  //   message.error("收藏失败：" + res.message);
  // }
};

const form = ref<QuestionSubmitAddRequest>({
  language: "java",
});

// 还原到默认的代码模板

const isInitialise = ref(false);

const showInitialise = () => {
  isInitialise.value = !isInitialise.value;
};
// 删除本地存储
const initialise = ref(false);

const removeFromLocalStorage = () => {
  const id = route.params.id as string;
  localStorage.removeItem(id);
  initialise.value = true;
};

// 格式化代码
const formatting = ref(false);

const formatCode = () => {
  formatting.value = true;
};

const onClick = (id: any) => {
  router.push({
    path: `/view/question/${id}/description`,
  });
  visible.value = false;
};

/**
 * 提交代码
 */
const doSubmit = async () => {
  if (!question.value?.id) {
    return;
  }
  const res = await QuestionSubmitControllerService.doQuestionSubmitUsingPost({
    ...form.value,
    questionId: question.value.id,
  });
  if (res.code === 0) {
    const questionSubmitId = res.data;
    await router.push({
      params: {
        id: questionId.value,
        category: "submissions",
        questionSubmitId: questionSubmitId,
      },
    });
    message.success("提交成功");
  } else {
    message.error("提交失败," + res.message);
  }
};

/**
 * 运行代码
 */
const runResults = ref();
// 预计输出
const actualOutput = ref([]);
// 实际输出
const expectedOutput = ref([]);

// 运作状态
const runStatus = ref(0);

const isRotate = ref(false);
const doRun = async () => {
  if (!question.value?.id) {
    return;
  }
  isRotate.value = true;
  // const res = await QuestionSubmitControllerService.doQuestionRunUsingPost({
  //   ...form.value,
  //   inputList: inputList.value as any,
  //   questionId: question.value.id,
  // });
  // if (res.code === 0) {
  //   runResults.value = res.data;
  //   actualOutput.value = res.data.actualOutput;
  //   expectedOutput.value = res.data.expectedOutput;
  //   runStatus.value = res.data.status;
  //   showNum.value = 2;
  //   isRun.value = true;
  //   if (secondSize.value >= 0.96) {
  //     secondSize.value = 0.5;
  //   }
  //   isRotate.value = false;
  //   message.success("运行成功");
  // } else {
  //   message.error("提交失败," + res.message);
  // }
};

/**
 * 监听 searchParams 变量，改变是触发页面的更新加载
 */
watchEffect(() => {
  questionId.value = route.params.id;
  selectedTab.value = route.params.category as any;
  const newId = route.params.id;
  question.value = {
    id: newId,
  } as never;
  loadData();
});

// 监听 secondSize 的变化，并将其存储在缓存中
watch(secondSize, (newValue) => {
  localStorage.setItem("secondSize", newValue.toString());
});

// 监听 secondSize 的变化，并将其存储在缓存中
watch(firstSize, (newValue) => {
  localStorage.setItem("firstSize", newValue.toString());
});

const cachedSecondSizeSize = ref();
const cachedFirstSizeSizeSize = ref();
/**
 * 页面加载时，请求数据
 */
onMounted(() => {
  // 第二面板的分割大小从本地获取
  cachedSecondSizeSize.value = localStorage.getItem("secondSize");
  if (cachedSecondSizeSize.value) {
    secondSize.value = parseFloat(cachedSecondSizeSize.value);
    currentSecondSize.value = secondSize.value;
  }
  // 第一面板的分割大小从本地获取
  cachedFirstSizeSizeSize.value = localStorage.getItem("firstSize");
  if (cachedFirstSizeSizeSize.value) {
    firstSize.value = parseFloat(cachedFirstSizeSizeSize.value);
    currentFirstSize.value = firstSize.value;
  }
  loadData();
});
</script>

<style>
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
}

.arrow-cursor::after {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 2px;
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
