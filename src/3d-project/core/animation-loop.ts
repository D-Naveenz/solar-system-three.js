import { Clock, WebGLRenderer } from 'three'
import type { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'

// const clock = new Clock()

class AnimationLoop {
  private renderer: WebGLRenderer
  private composer: EffectComposer

  animations: (() => void)[]

  constructor(renderer: WebGLRenderer, composer: EffectComposer) {
    this.renderer = renderer
    this.composer = composer
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
      this.composer.render()
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
