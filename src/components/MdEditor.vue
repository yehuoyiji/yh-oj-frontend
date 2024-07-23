<template>
  <Editor :mode="mode" :value="value" :plugins="plugins" @change="handleChange"></Editor>
</template>

<script setup lang="ts">
import {Editor, Viewer} from "@bytemd/vue-next";
import {ref} from "vue";
import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight";
const plugins = [
    gfm(),
    highlight()
]
interface Props {
  value: string;
  mode?:string;
  handleChange: (v: string) => void;
}

const props = withDefaults(defineProps<Props>(), {
  value: () => "",
  mode: () => "split",
  handleChange:(v: string) => {
    console.log(v)
  }
})

</script>

<style >
.bytemd-toolbar-icon.bytemd-tippy.bytemd-tippy-right:last-child {
  display: none;
}
</style>