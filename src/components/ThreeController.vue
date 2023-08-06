<script setup lang="ts">
import { onMounted } from 'vue';
import createTerrain from '@/3d-project/components/terrain'
import { SceneController } from '@/3d-project/scene-controller'

function initScene() {
  // Get the reference to the canvas element
  const canvas = document.querySelector('#scene-3d')
  // Create an instance of 3D scene
  const world = new SceneController(canvas)
  // Start the animation loop
  world.animationLoop.start()

  let terrain = createTerrain({ color: 'green' })
  world.addObject(terrain)
}

onMounted(() => {
  initScene()
})
</script>

<template>
  <canvas id="scene-3d"></canvas>
</template>

<style scoped>
#scene-3d {
  width: 100vw;
  height: 100vh;

  position: fixed;
  left: 0;
  top: 0;
  z-index: -10;
}
</style>
