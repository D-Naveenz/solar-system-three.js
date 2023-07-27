import {
  Mesh,
  PlaneGeometry,
  TextureLoader,
  type ColorRepresentation,
  MeshPhongMaterial
} from 'three'

export default function createTerrain(props: { color: ColorRepresentation }) {
  const loader = new TextureLoader()
  const height = loader.load('../assets/textures/heightmap.jpg')

  const geometry = new PlaneGeometry(150, 150, 64, 64)
  const material = new MeshPhongMaterial({
    color: props.color,
    flatShading: true,
    displacementMap: height,
    displacementScale: 8
  })

  const terrain = new Mesh(geometry, material)
  terrain.position.set(0, 0, 0)
  terrain.rotation.x -= Math.PI * 0.35

  //let frame = 0

  return terrain
}
