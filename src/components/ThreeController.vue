<script setup lang="ts">
import { onMounted } from 'vue'
import createTerrain from '@/3d-project/components/terrain'
import { SceneController } from '@/3d-project/scene-controller'

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

onMounted(() => {
  // get the size of the mounted-component div
  const mountedComponent = document.querySelector('#world-component')
  if (mountedComponent) {
    world.sizeDefenition = () => {
      return {
        width: mountedComponent.clientWidth,
        height: mountedComponent.clientHeight
      }
    }

    // Get the reference to the canvas element
    world.bind(mountedComponent)
  }

  world.adjustSize() // Set initial size on load.
})
</script>

<style scoped>
</style>
