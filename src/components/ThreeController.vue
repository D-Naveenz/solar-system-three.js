<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue'
import createTerrain from '@/3d-project/components/terrain'
import { SceneController } from '@/3d-project/scene-controller'

// props
const props = defineProps({
  upperCut: {
    type: Number,
    default: 0
  },
  lowerCut: {
    type: Number,
    default: 0
  },
  leftCut: {
    type: Number,
    default: 0
  },
  rightCut: {
    type: Number,
    default: 0
  }
})

// data
const cutoff = ref({
  top: 0,
  bottom: 0,
  left: 0,
  right: 0
})

function initScene(cutoff: Ref<{ top: number; bottom: number; left: number; right: number }>) {
  // Get the reference to the canvas element
  const canvas = document.querySelector('#scene-3d')
  // Create an instance of 3D scene
  const world = new SceneController(canvas, { cutoff: cutoff.value })
  // Start the animation loop
  world.animationLoop.start()

  let terrain = createTerrain({ color: 'green' })
  world.addObject(terrain)
}

onMounted(() => {
  cutoff.value = {
    top: props.upperCut,
    bottom: props.lowerCut,
    left: props.leftCut,
    right: props.rightCut
  }

  // initialize the scene
  initScene(cutoff)
})
</script>

<template>
  <canvas
    id="scene-3d"
    :style="{
      top: `${cutoff.top}px`,
      bottom: `${cutoff.bottom}px`,
      left: `${cutoff.left}px`,
      right: `${cutoff.right}px`
    }"
  ></canvas>
</template>

<style scoped>
#scene-3d {
  position: fixed;
  left: 0;
  top: 0;
}
</style>
