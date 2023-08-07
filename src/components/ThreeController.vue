<script setup lang="ts">
import { onBeforeMount, onMounted, ref } from 'vue'
import { SceneController } from '@/3d-project/scene-controller'
import type { SceneProperties } from '@/3d-project/types/scene-props'
import { AmbientLight, PointLight } from 'three'
import { createParticles } from '@/3d-project/components/particles'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

// Data
const heightCutoff = ref(0)

function createGameObjects(controller: SceneController) {
  // ambient light
  let ambientLight = new AmbientLight(0xffffff, 2)
  ambientLight.position.set(0, 0, 0)
  controller.dir.add('ambientLight', { object3D: ambientLight })

  // point light
  let pointLight = new PointLight(0xffffff, 2)
  pointLight.position.set(0, 0, 0)
  controller.dir.add('pointLight', { object3D: pointLight })

  // particles
  const particles = createParticles(5000, './assets/textures/star.png', './assets/textures/star_alpha.png')
  controller.dir.add('particles', { object3D: particles })

  // load saturn model
  const loader = new GLTFLoader()
  loader.load(
    './assets/models/saturn/saturn.gltf',
    (gltf) => {
      const saturn = gltf.scene
      saturn.scale.set(0.5, 0.5, 0.5)
      saturn.position.set(0, 0, 0)
      controller.dir.add('saturn', { object3D: saturn })
    },
    undefined,
    (error) => {
      console.error(error)
    }
  )
}

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
      const world = new SceneController(props)
      // Start the animation loop
      world.animationLoop.start()

      // Create the game objects
      createGameObjects(world)

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
