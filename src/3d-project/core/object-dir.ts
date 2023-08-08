import type { Object3D } from "three"
import type { SceneObject } from "../types/object-props"
import type { AnimationLoop } from "./animation-loop"

export class ObjectDirectory {
  private objects: { [key: string]: SceneObject }

  animationLoop: AnimationLoop
  addCallback: (Object: Object3D) => void

  constructor(animLoop: AnimationLoop, addCallback: (Object: Object3D) => void) {
    // Initialize properties
    this.objects = {}
    this.animationLoop = animLoop
    this.addCallback = addCallback
  }

  add(key: string, object: SceneObject, addToScene = true) {
    this.objects[key] = object
    if (object.animation) {
      this.animationLoop.addAnimation(object.animation)
    }
    if (addToScene) {
      this.addCallback(object.object3D)
    }
  }

  get(key: string) {
    return this.objects[key]
  }

  remove(key: string) {
    // Remove the animation from the animation loop
    this.animationLoop.removeAnimation(this.objects[key].animation)
    // Remove the object from the scene
    delete this.objects[key]
  }

  has(key: string) {
    return this.objects[key] !== undefined
  }
}