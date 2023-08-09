import {
  PerspectiveCamera,
  type ColorRepresentation,
  Scene,
  Color,
  WebGLRenderer,
  DirectionalLight,
  AxesHelper,
  CineonToneMapping,
} from 'three'
import type {
  RendererProperties,
  SceneProperties
} from './types/assemble'
import { AnimationLoop } from './core/animation-loop'
import { createCamera } from './core/camera'
import { createControls } from './core/controls'
import { ObjectDirectory } from './core/object-dir'
import { createLight } from './core/light'
import { createComposer } from './core/effect-composer'
import { addBloom } from './post-processing/bloom'
import { addSMAA } from './post-processing/smaa'
import type { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'

class SceneController {
  private scene: Scene
  private renderer: WebGLRenderer
  private composer: EffectComposer

  active_camera: PerspectiveCamera
  animationLoop: AnimationLoop
  dir: ObjectDirectory
  sizeDefenition: () => { width: number; height: number }

  constructor(size: () => { width: number; height: number }, properties?: SceneProperties) {
    // Initialize properties
    this.sizeDefenition = size

    // Load properties
    let props: SceneProperties
    if (properties) props = properties
    else props = this.loadDefaultProps()

    // Create the main camera set it as the active camera
    const main_camera = createCamera(props.mainCamera)
    this.active_camera = main_camera

    // Create the scene
    this.scene = this.createScene(props.scene?.color)

    // Create the renderer
    this.renderer = this.createRenderer(props.renderer)

    // Create the composer for post processing
    this.composer = createComposer(this.scene, this.active_camera, this.renderer)

    // check if post processing is enabled
    if (props.postProcessing) {
      // Add post processing effects
      if (props.postProcessing.bloom) {
        // Add bloom effect
        addBloom(this.composer, this.sizeDefenition(), props.postProcessing.bloom)

        this.renderer.toneMapping = CineonToneMapping
        this.renderer.toneMappingExposure = 0.9
      }
    }

    // Adding ssmaa antialiasing
    addSMAA(this.composer, this.sizeDefenition())

    // Create the animation loop
    this.animationLoop = new AnimationLoop(this.active_camera, this.scene, this.renderer, this.composer)

    if (props.controls.orbitControls) {
      // Add orbit controls
      const controls = createControls(main_camera, this.renderer, props.controls.orbitControls)
      // controls.update() must be called after any manual changes to the camera's transform
      controls.update()
      // Add controls to the animation loop
      this.animationLoop.addAnimation(() => {
        // required if controls.enableDamping or controls.autoRotate are set to true
        controls.update()
      })
    }

    // Create the object directory
    this.dir = new ObjectDirectory(this.animationLoop, (object) => {
      this.scene.add(object)
    })
    this.dir.add('main_camera', { object3D: main_camera }, false) // Add the main camera to the directory

    if (props.mainLight) {
      // Create the main light
      const main_light = createLight(props.mainLight)
      this.dir.add('main_light', { object3D: main_light.light }) // Add the main light to the directory
      this.dir.add('main_light_helper', { object3D: main_light.lightHelper }, false) // Add the main light helper to the directory
    }

    // Setup the resizer
    this.adjustSize() // Set initial size on load.
    window.addEventListener('resize', () => {
      // Set the size again if a resize occurs.
      this.adjustSize()
      // Perform any custom actions.
      this.onResize()
    })

    const axesHelper = new AxesHelper( 20 );
    this.scene.add( axesHelper );
  }

  private onResize() {
    this.render()
  }

  private loadDefaultProps() {
    const props: SceneProperties = {
      renderer: {
        antialias: true
      },
      controls: {
        orbitControls: {
          damping: {
            dampingFactor: 0.05
          },
          distance: {
            min: 1,
            max: 500,
            polarAngleDevisor: 2
          }
        }
      },
      mainCamera: {
        fov: 90,
        aspect: 1,
        near: 0.1,
        far: 100
      },
      mainLight: {
        color: 'white',
        intensity: 4,
        size: 0,
        position: { x: 0, y: 0, z: 5 }
      }
    }

    return props
  }

  getCamera(name?: string) {
    if (!name) name = 'main_camera'
    return <PerspectiveCamera>this.dir.get(name).object3D
  }

  getLight(name?: string) {
    if (!name) name = 'main_light'
    return <DirectionalLight>this.dir.get(name).object3D
  }

  getObject(name: string) {
    return this.dir.get(name).object3D
  }

  getScene() {
    return this.scene
  }

  getRenderer() {
    return this.renderer
  }

  createScene(color?: ColorRepresentation) {
    const scene = new Scene()
    if (color) {
      scene.background = new Color(color)
    }

    return scene
  }

  createRenderer(properties?: RendererProperties) {
    const renderer = new WebGLRenderer(properties)
    renderer.localClippingEnabled = true // enable clipping

    return renderer
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
    this.composer.setSize(canvasSize.width, canvasSize.height)
    this.renderer.setPixelRatio(window.devicePixelRatio)
  }

  render() {
    // Draw a single frame
    this.renderer.render(this.scene, this.active_camera)
  }
}

export { SceneController }
