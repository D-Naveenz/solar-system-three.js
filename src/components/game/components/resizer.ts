import type { PerspectiveCamera, WebGLRenderer } from "three"

const setSize = (container: Element, camera: PerspectiveCamera, renderer: WebGLRenderer) => {
  // changes the camera aspect ratio when the function is called
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  // todo: add a comment here
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
}

class Resizer {
  constructor(container: Element, camera: PerspectiveCamera, renderer: WebGLRenderer) {
    // Set initial size on load.
    setSize(container, camera, renderer)
    
    window.addEventListener("resize", () => {
      // Set the size again if a resize occurs.
      setSize(container, camera, renderer)
      // Perform any custom actions.
      this.onResize()
    });
  }

  onResize() {
    // todo: add custom methods
  }
}

export { Resizer }