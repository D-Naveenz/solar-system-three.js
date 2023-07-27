import type { DirectionalLight, DirectionalLightHelper, Object3D } from "three"

/**
 * Camera properties of the PersperctiveCamera class
 * @property {number} fov - FOV = Field Of View
 * @property {number} aspect - Aspect ratio
 * @property {number} near - Near clipping plane
 * @property {number} far - Far clipping plane
 */
interface CameraProperties {
  fov: number
  aspect: number
  near: number
  far: number
}

interface LightObject {
  light: DirectionalLight
  helper: DirectionalLightHelper
}

interface UpdatableObject {
  object: Object3D
  animation: (delta: number) => void | undefined
}

export type { CameraProperties, LightObject, UpdatableObject }
