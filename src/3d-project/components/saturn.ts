import {
  DoubleSide,
  FrontSide,
  Mesh,
  MeshPhongMaterial,
  MeshStandardMaterial,
  Object3D,
  RingGeometry,
  SphereGeometry,
  TextureLoader,
  TorusGeometry,
  Vector3
} from 'three'

export function createSaturn() {
  const saturnObject = new Object3D()

  const saturnTexture = new TextureLoader().load('./assets/textures/saturn/8k_saturn.jpg')
  const saturnGeometry = new SphereGeometry(3, 32, 32)
  const saturnMaterial = new MeshStandardMaterial({
    map: saturnTexture,
    roughness: 0.54,
    metalness: 0
  })
  const saturn = new Mesh(saturnGeometry, saturnMaterial)
  saturn.position.set(0, 0, 0)

  // add saturn to saturnObject
  saturnObject.add(saturn)

  // crate saturn ring system
  const saturnRingTexture = new TextureLoader().load(
    './assets/textures/saturn/8k_saturn_ring_alpha-1.png'
  )
  saturnRingTexture.rotation = Math.PI / 2
  saturnRingTexture.needsUpdate = true

  //const saturnRingGeometry = new RingGeometry(4.2, 8, 30, 1)
  const saturnRingGeometry = new TorusGeometry(6, 2, 2, 100)
  // const uv = saturnRingGeometry.attributes.uv

  // for (let i = 0; i < uv.count; i++) {
  //   const angle = (i / uv.count) * Math.PI * 2 // Angle around the circle
  //   uv.setXY(i, Math.cos(angle) * 0.5 + 0.5, Math.sin(angle) * 0.5 + 0.5)
  // }

  const saturnRingMaterial = new MeshPhongMaterial({
    map: saturnRingTexture,
    color: 0xffffff,
    transparent: true,
    side: FrontSide
  })
  const saturnRing = new Mesh(saturnRingGeometry, saturnRingMaterial)
  saturnRing.rotation.x = Math.PI / 2
  saturnRing.position.set(0, 0, 0)
  // saturnRing.material.wireframe = true

  // add saturnRing to saturnObject
  saturnObject.add(saturnRing)

  return saturnObject
}
