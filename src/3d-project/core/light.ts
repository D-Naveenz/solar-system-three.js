import { DirectionalLight, DirectionalLightHelper } from "three"
import type { LightProperties } from "../types/object-props"

export function createLight(props: LightProperties) {
  const light = new DirectionalLight(props.color, props.intensity)
  const lightHelper = new DirectionalLightHelper(light, props.size)
  light.position.set(props.position.x, props.position.y, props.position.z)

  return { light, lightHelper }
}