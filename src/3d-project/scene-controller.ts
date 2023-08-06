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
import type { LightObject, UpdatableObject } from './types/assemble'
import { AnimationLoop } from './core/animation-loop'
import { createCamera } from './core/camera'
import { createControls } from './core/controls'

class SceneController {
  private updatables: UpdatableObject[]
  private cameras: { [key: string]: PerspectiveCamera }
  private lights: { [key: string]: LightObject }
  private options: { [key: string]: any }

  scene: Scene
  renderer: WebGLRenderer
  active_camera: PerspectiveCamera
  animationLoop: AnimationLoop

  constructor(canvas: Element | HTMLElement | null, options?: { [key: string]: any }) {
    // Initialize properties
    this.updatables = []
    this.cameras = {}
    this.lights = {}
    this.options = options || {}

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
    this.renderer = this.createRenderer(canvas as HTMLCanvasElement)

    // Add orbit controls
    const controls = createControls(main_camera, this.renderer)
    this.addUpdatable({
      object: controls,
      animation: () => {
        // required if controls.enableDamping or controls.autoRotate are set to true
        controls.update()
      }
    })

    // controls.update() must be called after any manual changes to the camera's transform
    controls.update()

    // Create the animation loop
    this.animationLoop = new AnimationLoop(this.active_camera, this.scene, this.renderer)
    this.animationLoop.updatables = this.updatables // reference the updatables array

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
    // get cutoff size
    const cutoff = this.options['cutoff'] || 0
    const height_adjustment = window.innerHeight - (cutoff.top + cutoff.bottom)
    const width_adjustment = window.innerWidth - (cutoff.left + cutoff.right)

    // changes the camera aspect ratio when the function is called
    this.active_camera.aspect = width_adjustment / height_adjustment
    this.active_camera.updateProjectionMatrix()
    // todo: add a comment here
    this.renderer.setSize(width_adjustment, height_adjustment)
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

  createRenderer(canvas?: HTMLCanvasElement) {
    // using query selector returns null if the element is not found
    if (canvas === null) {
      throw new Error('Canvas element not found')
    }

    const renderer = new WebGLRenderer({ antialias: true, canvas })

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

export { SceneController }
