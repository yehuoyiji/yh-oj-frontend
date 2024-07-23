<template>
  <div class="drawer">
    <a-drawer :width="340" :visible="visible" @ok="handleOk" @cancel="handleCancel" unmountOnClose>
      <template #title>
        Title
      </template>
      <div>You can customize modal body text by the current situation. This modal will be closed immediately once you
        press the OK button.
      </div>
    </a-drawer>
  </div>
</template>

<script setup lang="ts">
import {ref, toRefs} from "vue";


const props = defineProps({
  //子组件接收父组件传递过来的值
  info: Boolean,
})
let visible = toRefs(props).info;
const {info} =toRefs(props)

const handleClick = () => {
  visible.value = true;
};
const handleOk = () => {
  visible.value = false;
};
const handleCancel = () => {
  visible.value = false;
}

</script>

<style scoped>

</style>