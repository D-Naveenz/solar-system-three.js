<script setup lang="ts">
import ThreeController from "@/components/ThreeController.vue";
import { ref } from "vue";

const props = defineProps({
  navbarHeight: {
    type: Number,
    default: 0
  }
})

const heightCutoff = ref(props.navbarHeight)
</script>

<template>
  <div id="world-component" :style="{ maxHeight: `calc(100vh - ${heightCutoff}px)` }">
    <ThreeController />
  </div>
</template>

<style scoped>
#world-component {
  width: 100%;
}
</style>
