import { PerspectiveCamera } from "three"

export function createCamera() {
  const camera = new PerspectiveCamera(
    35,   // FOV = Field Of View
    1,    // Aspect ratio (dummy value)
    0.1,  // Near clipping plane
    100   // Far clipping plane
  )

  // Move the camera back so we can view the scene
  camera.position.set(0, 0, 10)
  // camera.tick = (delta) => {};

  return camera
}