<template>
  <Viewer :value="value" :plugins="plugins" ></Viewer>
</template>

<script setup lang="ts">
import { Viewer} from "@bytemd/vue-next";
import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight";
const plugins = [
    gfm(),
    highlight()
]
interface Props {
  value: string;
}

const props = withDefaults(defineProps<Props>(), {
  value: () => "",
})

</script>

<style >
</style>