import { Clock, PerspectiveCamera, Scene, WebGLRenderer } from "three"
import type { UpdatableObject } from "./types"

const clock = new Clock()

class AnimationLoop {
  private camera: PerspectiveCamera
  private scene: Scene
  private renderer: WebGLRenderer

  updatables: UpdatableObject[]

  constructor(camera: PerspectiveCamera, scene: Scene, renderer: WebGLRenderer) {
    this.camera = camera
    this.scene = scene
    this.renderer = renderer
    this.updatables = []
  }

  private animateObjects() {
    const delta = clock.getDelta()
    for (const object of this.updatables) {
      if (object.animation !== undefined) {
        object.animation(delta)
      }
    }
  }

  start() {
    this.renderer.setAnimationLoop(() => {
      // Update objects using the delta time once per frame
      this.animateObjects();
      // Draw a single frame
      this.renderer.render(this.scene, this.camera)
    });
  }

  stop() {
    this.renderer.setAnimationLoop(null)
  }
}

export { AnimationLoop }