import type { DirectionalLight, DirectionalLightHelper, Object3D } from "three"
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

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
  position?: { x: number, y: number, z: number }
  lookAt?: { x: number, y: number, z: number }
}

interface LightObject {
  light: DirectionalLight
  helper: DirectionalLightHelper
}

interface UpdatableObject {
  object: Object3D | OrbitControls
  animation?: (delta: number) => void
}

export type { CameraProperties, LightObject, UpdatableObject }
