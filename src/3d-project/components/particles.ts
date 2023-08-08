import { BufferAttribute, BufferGeometry, Object3D, Points, PointsMaterial, TextureLoader } from "three"

export function createParticles(count: number, textureUrl: string, alphaUrl: string) {
  const container = new Object3D(); // Create a container for the particles
  const particleGeometry = new BufferGeometry
  const particleCount = count

  const positions = new Float32Array(particleCount * 3) // 3 vertices per particle
  // loop through each particle and set their random position
  for (let i = 0; i < particleCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 100 // random position between -50 and 50
  }

  particleGeometry.setAttribute('position', new BufferAttribute(positions, 3)) // 3 vertices per particle (x, y, z)

  const textureLoader = new TextureLoader()
  const particleTexture = textureLoader.load(textureUrl)
  const alphaTexture = textureLoader.load(alphaUrl)

  const particleMaterial = new PointsMaterial({
    map: particleTexture,
    transparent: true,
    alphaMap: alphaTexture,
    size: 0.15,
    sizeAttenuation: true, // make the particles smaller when they are further away
  })

  const particles = new Points(particleGeometry, particleMaterial)

  // Position particles in the container
  container.add(particles);

  return container
}