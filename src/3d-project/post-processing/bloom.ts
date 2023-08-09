import { Vector2 } from 'three'
import type { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import type { BloomProperties } from '../types/effect-props'

const pixelRatio = window.devicePixelRatio || 1; // Get the device's pixel ratio

export function addBloom(
  composer: EffectComposer,
  resolution: { width: number; height: number },
  properties: BloomProperties
) {
  console.log('Adding post-processing effect: Bloom')
  
  const bloomPass = new UnrealBloomPass(
    new Vector2(resolution.width * pixelRatio, resolution.height * pixelRatio),
    properties.strength,
    properties.radius,
    properties.threshold
  )
  composer.addPass(bloomPass)
}
