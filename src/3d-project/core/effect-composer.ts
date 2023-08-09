import type { PerspectiveCamera, Scene, WebGLRenderer } from "three";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";

export function createComposer(scene: Scene, camera: PerspectiveCamera, renderer: WebGLRenderer, resolution?: { width: number; height: number },) {
  const renderScene = new RenderPass(scene, camera)
  const composer = new EffectComposer(renderer)
  if (resolution) {
    composer.setSize( resolution.width, resolution.height ); // to fix the composer getting pixelated
  }
  
  composer.addPass(renderScene)
  
  return composer
}