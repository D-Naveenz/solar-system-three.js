<script setup lang="ts">
import createTerrain from '@/game/components/terrain';
import { World } from '@/game/world';
</script>

<template>
  <div id="scene-container">
    <!-- Three.js canvas will be inserted here -->
  </div>
</template>

<script lang="ts">
export default {
  methods: {
    initScene() {
      // Get a reference to the container element
      const container = document.querySelector('#scene-container')
      if (container) {
        // Create an instance of 3D scene
        const world = new World()
        world.setContainer(container)
        // Start the animation loop
        world.animationLoop.start()

        let terrain = createTerrain({ color: "green" })
        world.addObject(terrain)
      }
    }
  },
  mounted() {
    this.initScene()
  }
}
</script>

<style scoped>
#scene-container {
  width: 100vw;
  height: 100vh;
  
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: -10;
}
</style>
