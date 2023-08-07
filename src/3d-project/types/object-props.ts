import type { ColorRepresentation, DirectionalLight, DirectionalLightHelper } from 'three'

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
  position?: { x: number; y: number; z: number }
  lookAt?: { x: number; y: number; z: number }
}

/**
 * Light properties of the DirectionalLight class
 * @property {ColorRepresentation} color - Color of the light
 * @property {number} intensity - Intensity / brightness of the light
 * @property {number} size - Size of the light
 * @property {{ x: number, y: number, z: number }} position - Position of the light
 */
interface LightProperties {
  color: ColorRepresentation
  intensity: number
  size: number
  position: { x: number; y: number; z: number }
}

interface RendererProperties {
  antialias?: boolean
  alpha?: boolean
}

interface OrbitControlProperties {
  damping?: {
    dampingFactor: number
  }
  distance: {
    min: number
    max: number
    polarAngleDevisor: number
  }
}

interface LightObject {
  light: DirectionalLight
  helper: DirectionalLightHelper
}

export type {
  CameraProperties,
  LightProperties,
  RendererProperties,
  OrbitControlProperties,
  LightObject
}
