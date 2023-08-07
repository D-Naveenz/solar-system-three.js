import { PerspectiveCamera } from "three"
import type { CameraProperties } from "../types/object-props"

export function createCamera(properties: CameraProperties) {
  const camera = new PerspectiveCamera(
    properties.fov,
    properties.aspect,
    properties.near,
    properties.far
  )

  // Move the camera back so we can view the scene
  let position = { x: 0, y: 5, z: 10 }
  let lookAt = { x: 0, y: 0, z: 0 }

  if (properties.position !== undefined) {
    position = properties.position
  }
  if (properties.lookAt !== undefined) {
    lookAt = properties.lookAt
  }
  
  camera.position.set(position.x, position.y, position.z)
  camera.lookAt(lookAt.x, lookAt.y, lookAt.z)

  return camera
}