import { Clock, PerspectiveCamera, Scene, WebGLRenderer } from 'three'

const clock = new Clock()

class AnimationLoop {
  private camera: PerspectiveCamera
  private scene: Scene
  private renderer: WebGLRenderer

  animations: ((delta: number) => void)[]

  constructor(camera: PerspectiveCamera, scene: Scene, renderer: WebGLRenderer) {
    this.camera = camera
    this.scene = scene
    this.renderer = renderer
    this.animations = []
  }

  start() {
    this.renderer.setAnimationLoop(() => {
      // Update objects using the delta time once per frame
      const delta = clock.getDelta()
      for (const animation of this.animations) {
        animation(delta)
      }
      
      // Draw a single frame
      this.renderer.render(this.scene, this.camera)
    })
  }

  stop() {
    this.renderer.setAnimationLoop(null)
  }

  addAnimation(animation: (delta?: number) => void) {
    this.animations.push(animation)
  }

  removeAnimation(animation?: (delta: number) => void) {
    if (!animation) return
    
    const index = this.animations.indexOf(animation)
    if (index > -1) {
      this.animations.splice(index, 1)
    }
  }
}

export { AnimationLoop }
