import type { PerspectiveCamera, WebGLRenderer } from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


export function createControls(camera: PerspectiveCamera, renderer: WebGLRenderer) {
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.05
  // controls.screenSpacePanning = false
  controls.minDistance = 1
  controls.maxDistance = 500
  controls.maxPolarAngle = Math.PI / 2
  return controls
}