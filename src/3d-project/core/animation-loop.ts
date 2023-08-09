import { Clock, PerspectiveCamera, Scene, WebGLRenderer } from 'three'

// const clock = new Clock()

class AnimationLoop {
  private camera: PerspectiveCamera
  private scene: Scene
  private renderer: WebGLRenderer

  animations: (() => void)[]

  constructor(camera: PerspectiveCamera, scene: Scene, renderer: WebGLRenderer) {
    this.camera = camera
    this.scene = scene
    this.renderer = renderer
    this.animations = []
  }

  start() {
    this.renderer.setAnimationLoop(() => {
      // Update objects using the delta time once per frame
      // const delta = clock.getDelta()

      // process all loop animations
      for (const animation of this.animations) {
        animation()
      }
      
      // Draw a single frame
      this.renderer.render(this.scene, this.camera)
    })
  }

  stop() {
    this.renderer.setAnimationLoop(null)
  }

  addAnimation(animation: () => void) {
    this.animations.push(animation)
  }

  addDisposableAnimation(animation: () => boolean) {
    const disposableAnimation = () => {
      // if animation returns false, remove it from the loop
      if (!animation()) {
        this.removeAnimation(disposableAnimation)
      }
    }

    this.animations.push(disposableAnimation) 
  }

  removeAnimation(animation?: () => void) {
    if (!animation) return
    
    const index = this.animations.indexOf(animation)
    if (index > -1) {
      this.animations.splice(index, 1)
    }
  }
}

export { AnimationLoop }
