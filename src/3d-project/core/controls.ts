import type { PerspectiveCamera, WebGLRenderer } from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import type { OrbitControlProperties } from '../types/object-props'

export function createControls(
  camera: PerspectiveCamera,
  renderer: WebGLRenderer,
  props: OrbitControlProperties
) {
  const controls = new OrbitControls(camera, renderer.domElement)
  if (props.damping) {
    controls.enableDamping = true
    controls.dampingFactor = props.damping.dampingFactor
  }

  // controls.screenSpacePanning = false
  controls.minDistance = props.distance.min
  controls.maxDistance = props.distance.max
  controls.maxPolarAngle = Math.PI / props.distance.polarAngleDevisor
  return controls
}
