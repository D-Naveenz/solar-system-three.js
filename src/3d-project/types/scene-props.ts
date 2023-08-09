import type { ColorRepresentation } from 'three'
import type {
  CameraProperties,
  LightProperties,
  OrbitControlProperties,
  RendererProperties
} from './object-props'

interface SceneProperties {
  scene?: {
    color: ColorRepresentation
  }
  renderer?: RendererProperties
  controls: {
    orbitControls?: OrbitControlProperties
  }
  mainCamera: CameraProperties
  mainLight?: LightProperties
  postProcessing?: {
    bloom?: {
      strength: number
      radius: number
      threshold: number
    }
  }
}

export type { SceneProperties }
