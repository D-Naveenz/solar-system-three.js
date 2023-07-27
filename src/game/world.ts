import {
  PerspectiveCamera,
  type ColorRepresentation,
  Scene,
  Color,
  WebGLRenderer,
  DirectionalLight,
  DirectionalLightHelper,
  Vector3,
  Object3D
} from 'three'
import type { LightObject, UpdatableObject } from './core/types'
import { AnimationLoop } from './core/animation_loop'
import { createCamera } from './core/camera'

class World {
  private updatables: UpdatableObject[]
  private cameras: { [key: string]: PerspectiveCamera }
  private lights: { [key: string]: LightObject }

  scene: Scene
  renderer: WebGLRenderer
  active_camera: PerspectiveCamera
  animationLoop: AnimationLoop

  constructor() {
    // Initialize properties
    this.updatables = []
    this.cameras = {}
    this.lights = {}

    // Create the main camera set it as the active camera
    const main_camera = createCamera({
      fov: 90,
      aspect: 1,
      near: 0.1,
      far: 100
    })
    this.addCamera('main', { object: main_camera })
    this.active_camera = main_camera

    // Create the scene
    this.scene = this.createScene()

    // Create the renderer
    this.renderer = this.createRenderer()

    // Create the animation loop
    this.animationLoop = new AnimationLoop(this.active_camera, this.scene, this.renderer)
    this.animationLoop.updatables = this.updatables  // reference the updatables array

    // Create the main light
    const main_light = this.createLight('main', 'white', new Vector3(0, 0, 5)).light
    this.scene.add(main_light)

    // Setup the resizer
    this.adjustSize() // Set initial size on load.
    window.addEventListener('resize', () => {
      // Set the size again if a resize occurs.
      this.adjustSize()
      // Perform any custom actions.
      this.onResize()
    })
  }

  private adjustSize() {
    // changes the camera aspect ratio when the function is called
    this.active_camera.aspect = window.innerWidth / window.innerHeight
    this.active_camera.updateProjectionMatrix()
    // todo: add a comment here
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.setPixelRatio(window.devicePixelRatio)
  }

  private onResize() {
    this.render()
  }

  private addUpdatable(object: UpdatableObject) {
    this.updatables.push(object)
  }

  private removeUpdatable(object: UpdatableObject) {
    const index = this.updatables.indexOf(object)
    if (index > -1) {
      this.updatables.splice(index, 1)
    }
  }

  setContainer(container: Element) {
    container.append(this.renderer.domElement)
  }

  getCamera(name?: string) {
    if (name) {
      return this.cameras[name]
    } else {
      return this.cameras['main']
    }
  }

  addCamera(name: string, camera: UpdatableObject) {
    // Push camera to cameras object
    this.cameras[name] = <PerspectiveCamera>camera.object

    // Add camera as a updatable object
    this.addUpdatable(camera)
  }

  getScene() {
    return this.scene
  }

  createScene(color?: ColorRepresentation) {
    const scene = new Scene()
    if (color) {
      scene.background = new Color(color)
    }

    return scene
  }

  getRenderer() {
    return this.renderer
  }

  createRenderer() {
    const renderer = new WebGLRenderer({ antialias: true })

    // Turn on the physically correct lighting model.
    //renderer.physicallyCorrectLights = true;

    return renderer
  }

  render() {
    // Draw a single frame
    this.renderer.render(this.scene, this.active_camera)
  }

  getLight(name?: string) {
    if (name) {
      return this.lights[name]
    } else {
      return this.lights['main']
    }
  }

  createLight(name: string, color: ColorRepresentation, position: Vector3) {
    const light = new DirectionalLight(color, 4)
    const lightHelper = new DirectionalLightHelper(light, 0)
    // light.position.set(0, 0, 5)
    light.position.copy(position)

    // Push light to the lights object
    this.lights[name] = { light, helper: lightHelper }

    return { light, lightHelper }
  }

  addObject(Object: Object3D) {
    this.scene.add(Object)
  }
}

export { World }
