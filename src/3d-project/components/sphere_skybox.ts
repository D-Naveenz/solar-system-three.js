import { Mesh, SphereGeometry, MeshBasicMaterial, TextureLoader, BackSide } from 'three';

export function createStarrySkybox(textureUrl: string) {
  const textureLoader = new TextureLoader();
  const skyTexture = textureLoader.load(textureUrl);

  // Adjust the size and detail of the sphere as needed
  const skyboxGeometry = new SphereGeometry(1000, 32, 32);

  const skyMaterial = new MeshBasicMaterial({
    map: skyTexture,
    side: BackSide, // Show only the back faces of the sphere (inside faces)
  });

  const skybox = new Mesh(skyboxGeometry, skyMaterial);

  return skybox;
}

