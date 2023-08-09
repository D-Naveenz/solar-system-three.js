import { PerspectiveCamera, Vector3 } from "three"
import type { CameraProperties } from "../types/object-props"

function createCamera(properties: CameraProperties) {
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

/**
 * Disposable animation that moves the camera from the initial position to the target position
 * @param camera 
 * @param duration - Animation duration in seconds
 * @param initialPosition 
 * @param targetPosition 
 * @returns 
 */
function moveCameraAnimation(camera: PerspectiveCamera, startTime: number, duration: number, initialPosition: Vector3, targetPosition: Vector3) {
  const elapsed = (Date.now() - startTime) / 1000; // Elapsed time in seconds

  if (elapsed >= duration) {
    // Animation is complete
    camera.position.copy(targetPosition);
    return false; // Animation finished, remove it from the loop
  }

  // Interpolate the camera position
  const progress = elapsed / duration;
  const interpolatedPosition = new Vector3().lerpVectors(initialPosition, targetPosition, progress);
  camera.position.copy(interpolatedPosition);

  // Check if the camera has reached the target position
  const distanceToTarget = camera.position.distanceTo(targetPosition);
  if (distanceToTarget < 0.01) {
    camera.position.copy(targetPosition); // Set the final position
    return false; // Animation finished, remove it from the loop
  }

  return true; // Animation still in progress
}

export { createCamera, moveCameraAnimation }