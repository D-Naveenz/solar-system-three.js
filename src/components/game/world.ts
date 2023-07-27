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
import type { CameraProperties, LightObject } from './types'

class World {
  cameras: { [key: string]: PerspectiveCamera }
  lights: { [key: string]: LightObject }
  scene: Scene
  renderer: WebGLRenderer
  active_camera: PerspectiveCamera

  constructor() {
    // Initialize properties
    this.cameras = {}
    this.lights = {}

    // Create the main camera
    this.createCamera('main', {
      fov: 90,
      aspect: 1,
      near: 0.1,
      far: 100
    })
    // set the active camera
    this.active_camera = this.cameras['main']

    // Create the scene
    this.scene = this.createScene()

    // Create the renderer
    this.renderer = this.createRenderer()

    // Add the renderer to the DOM
    // container.append(this.renderer.domElement)

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

  createCamera(name: string, properties: CameraProperties) {
    const camera = new PerspectiveCamera(
      properties.fov,
      properties.aspect,
      properties.near,
      properties.far
    )

    // Move the camera back so we can view the scene
    camera.position.set(0, 0, 10)
    camera.lookAt(0, 0, 0)
    // camera.tick = (delta) => {};

    // Push camera to cameras object
    this.cameras[name] = camera

    return camera
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

  startAnimationLoop(callback?: Function) {
    this.renderer.setAnimationLoop(() => {
      if (callback) {
        // Call the provided function once per frame
        callback()
      }

      this.render()
    })
  }

  stopAnimationLoop() {
    this.renderer.setAnimationLoop(null)
  }

  adjustSize() {
    // changes the camera aspect ratio when the function is called
    this.active_camera.aspect = window.innerWidth / window.innerHeight
    this.active_camera.updateProjectionMatrix()
    // todo: add a comment here
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.setPixelRatio(window.devicePixelRatio)
  }

  onResize() {
    this.render()
  }

  add(Object: Object3D) {
    this.scene.add(Object)
  }
}

export { World }
