<script setup lang="ts">
import { onBeforeMount, onMounted, ref } from 'vue'
import { SceneController } from '@/3d-project/scene-controller'
import type { SceneProperties } from '@/3d-project/types/scene-props'
import { createGameObjects } from '@/3d-project/scene-objects'

// Data
const heightCutoff = ref(0)

onBeforeMount(() => {
  // get the height of the navbar
  const navbar = document.querySelector('.navbar')
  heightCutoff.value = navbar ? navbar.clientHeight : 0
})

onMounted(() => {
  // get data from the json file using fetch
  fetch('./assets/objects/3d-scene.json')
    .then((res) => {
      return res.json()
    })
    .then((props: SceneProperties) => {
      // Create an instance of 3D scene
      const world = new SceneController(() => {
        return {
          width: window.innerWidth,
          height: window.innerHeight - heightCutoff.value
        }
      }, props)

      // Start the animation loop
      world.animationLoop.start()

      // Create the game objects
      createGameObjects(world)

      // bind the canvas to the component
      const mountedComponent = document.querySelector('#world-component')
      if (mountedComponent) {
        world.bind(mountedComponent)
      }

      // Adjust the size of the canvas
      world.adjustSize()
    })
})
</script>

<template>
  <div
    id="world-component"
    :style="{ maxHeight: `calc(100vh - ${heightCutoff}px)`, top: heightCutoff }"
  >
    <!-- Threejs canvas is placed here -->
  </div>
</template>

<style scoped>
#world-component {
  width: 100%;
  height: 100%;

  position: fixed;
  left: 0;
}
</style>
@/3d-project/components/sphere_skybox
