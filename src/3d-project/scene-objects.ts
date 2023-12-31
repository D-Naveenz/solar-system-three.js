import {
  AmbientLight,
  CubeTextureLoader,
  Plane,
  PlaneHelper,
  PointLight,
  Raycaster,
  Vector2,
  Vector3
} from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { createParticles } from './components/particles'
import type { SceneController } from './scene-controller'
import type { Object3D } from 'three/src/Three.js'
import { moveCameraAnimation } from './core/camera'
import type GUI from 'lil-gui'
// import { createSaturn } from "./components/saturn"

export function createGameObjects(controller: SceneController, gui: GUI) {
  const camera = controller.getCamera()
  const gltfLoader = new GLTFLoader()

  // ambient light
  const ambientLight = new AmbientLight(0xffffff, 1)
  ambientLight.position.set(0, 0, 0)
  controller.dir.add('ambientLight', { object3D: ambientLight })

  // point light
  const pointLight = new PointLight(0xffffff, 1)
  pointLight.position.set(0, 0, 0)
  controller.dir.add('pointLight', { object3D: pointLight })

  // particles
  const particles = createParticles(
    5000,
    './assets/textures/star.png',
    './assets/textures/star_alpha.png'
  )

  // Add the particles to the scene
  controller.dir.add('particles', {
    object3D: particles
  })

  // Define your initial clipping plane
  const initialNormal = new Vector3(0, 0, -1)
  const initialConstant = -camera.near * 20
  const clippingPlane = new Plane(initialNormal, initialConstant)

  // Create a PlaneHelper using the clipping plane and a size
  const planeHelper = new PlaneHelper(clippingPlane, 5, 0xff0000) // The last argument is the color of the lines

  // // Add the PlaneHelper to the scene
  controller.dir.add('planeHelper', {
    object3D: planeHelper,
    animation: () => {
      // Get the camera's direction vector
      const cameraDirection = new Vector3()
      camera.getWorldDirection(cameraDirection)

      // Set the calculated vector as the new normal vector of the plane
      clippingPlane.normal.copy(cameraDirection)

      // Update the PlaneHelper's rotation to match the camera's rotation
      planeHelper.rotation.copy(camera.rotation)
    }
  })

  // // Set up the clipping properties for the particles
  particles.material.clippingPlanes = [clippingPlane]
  particles.material.clipIntersection = true

  // const myObject = {
  //   myBoolean: true,
  //   myFunction: function () {},
  //   myString: 'lil-gui',
  //   myNumber: 1
  // }

  // gui.add(myObject, 'myBoolean') // Checkbox
  // gui.add(myObject, 'myFunction') // Button
  // gui.add(myObject, 'myString') // Text Field
  // gui.add(myObject, 'myNumber') // Number Field

  // skybox
  const skybox = new CubeTextureLoader().load([
    './assets/textures/skybox/right.jpg',
    './assets/textures/skybox/left.jpg',
    './assets/textures/skybox/up.jpg',
    './assets/textures/skybox/down.jpg',
    './assets/textures/skybox/front.jpg',
    './assets/textures/skybox/back.jpg'
  ])
  controller.getScene().background = skybox

  // load sun model
  gltfLoader.load(
    './assets/models/sun/sun.gltf',
    (gltf) => {
      const sun = gltf.scene
      sun.scale.set(0.1, 0.1, 0.1)
      sun.position.set(0, 0, 0)
      sun.matrixWorldNeedsUpdate = true
      // Attach the planetName as userData
      sun.userData.planetName = 'sun'

      controller.dir.add('sun', { object3D: sun })
    },
    undefined,
    (error) => {
      console.error(error)
    }
  )

  // load mercury model
  gltfLoader.load(
    './assets/models/mercury/mercury.gltf',
    (gltf) => {
      const mercury = gltf.scene
      mercury.scale.set(0.1, 0.1, 0.1)
      mercury.position.set(0, 0, 20)
      // Attach the planetName as userData
      mercury.userData.planetName = 'mercury'

      controller.dir.add('mercury', { object3D: mercury })
    },
    undefined,
    (error) => {
      console.error(error)
    }
  )

  // load venus model
  gltfLoader.load(
    './assets/models/venus/venus.gltf',
    (gltf) => {
      const venus = gltf.scene
      venus.scale.set(0.1, 0.1, 0.1)
      venus.position.set(0, 0, 21)
      // Attach the planetName as userData
      venus.userData.planetName = 'venus'

      controller.dir.add('venus', { object3D: venus })
    },
    undefined,
    (error) => {
      console.error(error)
    }
  )

  // load earth model
  gltfLoader.load(
    './assets/models/earth/earth.gltf',
    (gltf) => {
      const earth = gltf.scene
      earth.scale.set(0.15, 0.15, 0.15)
      earth.position.set(0, 0, 23)
      // Attach the planetName as userData
      earth.userData.planetName = 'earth'

      controller.dir.add('earth', { object3D: earth })
    },
    undefined,
    (error) => {
      console.error(error)
    }
  )

  // load mars model
  gltfLoader.load(
    './assets/models/mars/mars.gltf',
    (gltf) => {
      const mars = gltf.scene
      mars.scale.set(0.2, 0.2, 0.2)
      mars.position.set(0, 0, 28)
      // Attach the planetName as userData
      mars.userData.planetName = 'mars'

      controller.dir.add('mars', { object3D: mars })
    },
    undefined,
    (error) => {
      console.error(error)
    }
  )

  // load jupiter model
  gltfLoader.load(
    './assets/models/jupiter/jupiter.gltf',
    (gltf) => {
      const jupiter = gltf.scene
      jupiter.scale.set(0.1, 0.1, 0.1)
      jupiter.position.set(0, 0, 33)
      // Attach the planetName as userData
      jupiter.userData.planetName = 'jupiter'

      controller.dir.add('jupiter', { object3D: jupiter })
    },
    undefined,
    (error) => {
      console.error(error)
    }
  )

  // load saturn model
  gltfLoader.load(
    './assets/models/saturn/saturn.gltf',
    (gltf) => {
      const saturn = gltf.scene
      saturn.scale.set(0.1, 0.1, 0.1)
      saturn.position.set(0, 0, 42)
      saturn.rotation.z = Math.PI / -32
      // Attach the planetName as userData
      saturn.userData.planetName = 'saturn'

      controller.dir.add('saturn', { object3D: saturn })
    },
    undefined,
    (error) => {
      console.error(error)
    }
  )

  // load custom saturn model
  // const saturn = createSaturn()
  // saturn.position.set(0, 0, -20)
  // saturn.rotation.z = Math.PI / -32
  // saturn.scale.set(0.5, 0.5, 0.5)
  // controller.dir.add('saturn', { object3D: saturn })

  // load uranus model
  gltfLoader.load(
    './assets/models/uranus/uranus.gltf',
    (gltf) => {
      const uranus = gltf.scene
      uranus.scale.set(0.1, 0.1, 0.1)
      uranus.position.set(0, 0, 50)
      // Attach the planetName as userData
      uranus.userData.planetName = 'uranus'

      controller.dir.add('uranus', { object3D: uranus })
    },
    undefined,
    (error) => {
      console.error(error)
    }
  )

  // load neptune model
  gltfLoader.load(
    './assets/models/neptune/neptune.gltf',
    (gltf) => {
      const neptune = gltf.scene
      neptune.scale.set(0.1, 0.1, 0.1)
      neptune.position.set(0, 0, 60)
      // Attach the planetName as userData
      neptune.userData.planetName = 'neptune'

      controller.dir.add('neptune', { object3D: neptune })
    },
    undefined,
    (error) => {
      console.error(error)
    }
  )

  // Create a planetOrbit object to store orbit information
  const planetOrbit = {
    mercury: { radius: 20, speed: 0.01 },
    venus: { radius: 21, speed: 0.008 },
    earth: { radius: 23, speed: 0.006 },
    mars: { radius: 28, speed: 0.004 },
    jupiter: { radius: 33, speed: 0.002 },
    saturn: { radius: 42, speed: 0.001 },
    uranus: { radius: 50, speed: 0.0008 },
    neptune: { radius: 60, speed: 0.0006 }
  }

  // Add an animation loop to update the planet positions
  controller.animationLoop.addAnimation(() => {
    // Update planet positions and rotations
    const time = Date.now() * 0.001 // Convert to seconds

    for (const planetName in planetOrbit) {
      if (controller.dir.has(planetName)) {
        const planetObject = controller.dir.get(planetName).object3D
        const { radius, speed } = planetOrbit[planetName]

        // Calculate new position based on orbit
        const posX = radius * Math.cos(time * speed)
        const posZ = radius * Math.sin(time * speed)

        // Update planet position
        planetObject.position.set(posX, 0, posZ)

        // Rotate planet around its own axis
        if (planetName === 'saturn') {
          // Get the local axis vectors
          const saturnUp = new Vector3()
          const saturnRight = new Vector3()
          const saturnForward = new Vector3()

          planetObject.matrixWorld.extractBasis(saturnRight, saturnUp, saturnForward)
          // Adjust the rotation speed and axis as needed
          planetObject.rotateOnAxis(saturnUp, 0.005) // Adjust the rotation speed as needed
        } else {
          // Rotate other planets around its own axis
          planetObject.rotation.y += 0.005 // Adjust the rotation speed as needed
        }
      }
    }
  })

  // Add an mouse click event to move camera to the clicked planet
  const canvas = controller.getRenderer().domElement
  canvas.addEventListener('click', (event) => {
    // calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components
    const mouse = new Vector2()
    mouse.x = (event.clientX / canvas.clientWidth) * 2 - 1
    mouse.y = -(event.clientY / canvas.clientHeight) * 2 + 1

    // update the picking ray with the camera and mouse position
    const raycaster = new Raycaster()
    raycaster.setFromCamera(mouse, camera)

    // find intersects with objects in the scene
    const intersects = raycaster.intersectObjects(controller.getScene().children, true)
    // check if there is any planet is clicked
    for (const intersect of intersects) {
      const clickedObj = intersect.object
      const planetName = getPlanetName(clickedObj)

      if (planetName) {
        console.log('planet selected: ', planetName)
        // move camera closer and look the clicked object
        const planet = controller.dir.get(planetName).object3D
        const distance = 10
        const looAtOffset = new Vector3(0, 0, 0)

        const targetPosition = planet.position.clone().add(looAtOffset)
        const cameraPosition = targetPosition.clone().add(new Vector3(0, 0, distance))

        // set camera position and look at the clicked object
        // camera.position.copy(cameraPosition)
        const timer = Date.now()
        controller.animationLoop.addDisposableAnimation(() =>
          moveCameraAnimation(camera, timer, 2.0, camera.position, cameraPosition)
        )
        camera.lookAt(targetPosition)

        // break the loop after handling the click
        break
      }
    }
  })
}

function getPlanetName(planet: Object3D | null) {
  if (!planet) return null

  if (planet.userData.planetName) {
    return planet.userData.planetName
  }

  return getPlanetName(planet.parent)
}
