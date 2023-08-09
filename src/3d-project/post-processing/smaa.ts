import type { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { SMAAPass } from 'three/examples/jsm/postprocessing/SMAAPass.js'

const pixelRatio = window.devicePixelRatio || 1; // Get the device's pixel ratio

export function addSMAA(
  composer: EffectComposer,
  resolution: { width: number; height: number },
) {
  console.log('Adding post-processing effect: SSMA')
  
  const smaaPass = new SMAAPass(resolution.width * pixelRatio, resolution.height * pixelRatio)
  composer.addPass(smaaPass)
}