import { AmbientLight, CubeTextureLoader, Plane, PlaneHelper, PointLight, Vector3 } from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"
import { createParticles } from "./components/particles"
import type { SceneController } from "./scene-controller"
import { createSaturn } from "./components/saturn"

export function createGameObjects(controller: SceneController) {
  const camera = controller.getCamera()

  // ambient light
  const ambientLight = new AmbientLight(0xffffff, 1)
  ambientLight.position.set(0, 0, 0)
  controller.dir.add('ambientLight', { object3D: ambientLight })

  // point light
  const pointLight = new PointLight(0xffffff, 1)
  pointLight.position.set(0, 0, 0)
  controller.dir.add('pointLight', { object3D: pointLight })

  // particles
  const particles = createParticles(
    5000,
    './assets/textures/star.png',
    './assets/textures/star_alpha.png'
  )

  // Add the particles to the scene
  controller.dir.add('particles', {
    object3D: particles
  })

  // Define your initial clipping plane
  const initialNormal = new Vector3(0, 0, -1)
  const initialConstant = -camera.near * 20
  const clippingPlane = new Plane(initialNormal, initialConstant)

  // Create a PlaneHelper using the clipping plane and a size
  const planeHelper = new PlaneHelper(clippingPlane, 10, 0xff0000) // The last argument is the color of the lines

  // Add the PlaneHelper to the scene
  controller.dir.add('planeHelper', {
    object3D: planeHelper,
    animation: () => {
      // Get the camera's direction vector
      const cameraDirection = new Vector3()
      camera.getWorldDirection(cameraDirection)

      // Set the calculated vector as the new normal vector of the plane
      clippingPlane.normal.copy(cameraDirection)

      // Update the PlaneHelper's rotation to match the camera's rotation
      planeHelper.rotation.copy(camera.rotation)
    }
  })

  // Set up the clipping properties for the particles
  particles.material.clippingPlanes = [clippingPlane]
  particles.material.clipIntersection = true

  // skybox
  const skybox = new CubeTextureLoader().load([
    './assets/textures/skybox/right.jpg',
    './assets/textures/skybox/left.jpg',
    './assets/textures/skybox/up.jpg',
    './assets/textures/skybox/down.jpg',
    './assets/textures/skybox/front.jpg',
    './assets/textures/skybox/back.jpg'
  ])
  controller.getScene().background = skybox

  // load saturn model
  const loader = new GLTFLoader()
  loader.load(
    './assets/models/saturn/saturn.gltf',
    (gltf) => {
      const saturn = gltf.scene
      saturn.scale.set(0.1, 0.1, 0.1)
      saturn.position.set(0, 0, 0)
      controller.dir.add('saturn', { object3D: saturn })
    },
    undefined,
    (error) => {
      console.error(error)
    }
  )

  const saturn = createSaturn()
  saturn.position.set(0, 0, -20)
  saturn.rotation.z = Math.PI / -32
  saturn.scale.set(0.5, 0.5, 0.5)
  controller.dir.add('saturn', { object3D: saturn })
}