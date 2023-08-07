<script setup lang="ts">
import { onBeforeMount, onMounted, ref } from 'vue'
import createTerrain from '@/3d-project/components/terrain'
import { SceneController } from '@/3d-project/scene-controller'

const heightCutoff = ref(0)

function initScene() {
  // Create an instance of 3D scene
  const world = new SceneController()
  // Start the animation loop
  world.animationLoop.start()

  let terrain = createTerrain({ color: 'green' })
  world.addObject(terrain)

  return world
}

// initialize the scene
const world = initScene()

onBeforeMount(() => {
  // get the height of the navbar
  const navbar = document.querySelector('.navbar')
  heightCutoff.value = navbar ? navbar.clientHeight : 0
})

onMounted(() => {
  world.sizeDefenition = () => {
    return {
      width: window.innerWidth,
      height: window.innerHeight - heightCutoff.value
    }
  }

  // bind the canvas to the component
  const mountedComponent = document.querySelector('#world-component')
  if (mountedComponent) {
    world.bind(mountedComponent)
  }

  // Adjust the size of the canvas
  world.adjustSize()
})
</script>

<template>
  <div id="world-component" :style="{ maxHeight: `calc(100vh - ${heightCutoff}px)`, top: heightCutoff }">
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
