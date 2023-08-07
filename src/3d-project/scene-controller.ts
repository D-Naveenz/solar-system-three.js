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
import type { LightObject } from './types/assemble'
import { AnimationLoop } from './core/animation-loop'
import { createCamera } from './core/camera'
import { createControls } from './core/controls'

class SceneController {
  private cameras: { [key: string]: PerspectiveCamera }
  private lights: { [key: string]: LightObject }

  scene: Scene
  renderer: WebGLRenderer
  active_camera: PerspectiveCamera
  animationLoop: AnimationLoop
  sizeDefenition: () => { width: number; height: number }

  constructor() {
    // Initialize properties
    this.cameras = {}
    this.lights = {}
    this.sizeDefenition = () => {
      return { width: window.innerWidth, height: window.innerHeight }
    }

    // Create the main camera set it as the active camera
    const main_camera = createCamera({
      fov: 90,
      aspect: 1,
      near: 0.1,
      far: 100
    })
    this.addCamera('main', main_camera)
    this.active_camera = main_camera

    // Create the scene
    this.scene = this.createScene()

    // Create the renderer
    this.renderer = this.createRenderer()

    // Create the animation loop
    this.animationLoop = new AnimationLoop(this.active_camera, this.scene, this.renderer)

    // Add orbit controls
    const controls = createControls(main_camera, this.renderer)
    // controls.update() must be called after any manual changes to the camera's transform
    controls.update()
    // Add controls to the animation loop
    this.animationLoop.addAnimation(() => {
      // required if controls.enableDamping or controls.autoRotate are set to true
      controls.update()
    })

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

  private onResize() {
    this.render()
  }

  bind(holder: Element | null) {
    if (holder) {
      holder.appendChild(this.renderer.domElement)
    }
  }
  
  adjustSize() {
    const canvasSize = this.sizeDefenition()
    // changes the camera aspect ratio when the function is called
    this.active_camera.aspect = canvasSize.width / canvasSize.height
    this.active_camera.updateProjectionMatrix()
    // todo: add a comment here
    this.renderer.setSize(canvasSize.width, canvasSize.height)
    this.renderer.setPixelRatio(window.devicePixelRatio)
  }

  getCamera(name?: string) {
    if (name) {
      return this.cameras[name]
    } else {
      return this.cameras['main']
    }
  }

  addCamera(name: string, camera: PerspectiveCamera) {
    // Push camera to cameras object
    this.cameras[name] = camera
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

export { SceneController }
