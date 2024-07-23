<template>
  <div id="example">
    <md-editor :value="mdValue" :handle-change="onMdChange"></md-editor>
    <code-editor :value="codeValue" :handle-change="onCodeChange"></code-editor>

  </div>
</template>

<script lang="ts" setup>
import {defineComponent, ref} from 'vue';

import MdEditor from "@/components/MdEditor.vue";
import CodeEditor from "@/components/CodeEditor.vue";

const codeValue = ref();
const mdValue = ref();

const onCodeChange =(v:string) => {
  codeValue.value = v
}
const onMdChange =(v:string) => {
  mdValue.value = v
}


</script>
