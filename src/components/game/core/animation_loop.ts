import { Clock, PerspectiveCamera, Scene, WebGLRenderer } from "three"
import type { UpdatableObject } from "../types"

const clock = new Clock()

class AnimationLoop {
  camera: PerspectiveCamera
  scene: Scene
  renderer: WebGLRenderer
  updatables: UpdatableObject[]

  constructor(camera: PerspectiveCamera, scene: Scene, renderer: WebGLRenderer) {
    this.camera = camera
    this.scene = scene
    this.renderer = renderer
    this.updatables = []
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

  animateObjects() {
    const delta = clock.getDelta()
    for (const object of this.updatables) {
      if (object.animation !== undefined) {
        object.animation(delta)
      }
    }
  }

  addUpdatable(object: UpdatableObject) {
    this.updatables.push(object)
  }

  removeUpdatable(object: UpdatableObject) {
    const index = this.updatables.indexOf(object)
    if (index > -1) {
      this.updatables.splice(index, 1)
    }
  }
}

export { AnimationLoop }