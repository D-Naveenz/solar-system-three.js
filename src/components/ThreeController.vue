<script setup lang="ts">
import { onMounted, ref } from 'vue'
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

  return world
}

onMounted(() => {
  // get the size of the mounted-component div
  const mountedComponent = <HTMLDivElement>document.querySelector('#mounted-components')
  if (mountedComponent) {
    // initialize the scene
    const world = initScene()

    world.sizeDefenition = () => {
      return {
        width: mountedComponent.offsetWidth,
        height: mountedComponent.offsetHeight
      }
    }
  }
})
</script>

<template>
  <canvas
    id="scene-3d"
  ></canvas>
</template>

<style scoped>
#scene-3d {
  position: fixed;
}
</style>
