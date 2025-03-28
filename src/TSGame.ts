import * as THREE from "three";
import TGameOptions, {
  CameraOptions,
  LightsOptions,
  SceneOptions,
} from "./types/TGameOptions";
import GameObject from "./interfaces/GameObject";
import constants from "./constants";

export default class TSGame {
  camera!: THREE.Camera;
  scene!: THREE.Scene;
  renderer!: THREE.WebGLRenderer;
  gameObjects!: Set<GameObject>;
  SCREEN_WIDTH!: number;
  SCREEN_HEIGHT!: number;

  /**
   *
   * @param options - TGame Options
   */
  constructor(options: TGameOptions = {}) {
    this.gameObjects = new Set();
    this.setupScene(options.scene);
    this.setupCamera(options.camera);
    this.setupLights(options.lights);
  }

  setupScene(sceneOptions?: SceneOptions) {
    this.SCREEN_WIDTH = window.innerWidth;
    this.SCREEN_HEIGHT = window.innerHeight;

    this.scene = new THREE.Scene();

    this.scene.background =
      sceneOptions?.background || new THREE.Color(0x87ceeb);

    if (sceneOptions?.addAxisHelper) {
      const axesHelper = new THREE.AxesHelper(50);

      this.scene.add(axesHelper);
    }
  }

  setupCamera(cameraOptions?: CameraOptions) {
    this.camera = new THREE.PerspectiveCamera(
      cameraOptions?.fov || constants.camera.fov,
      window.innerWidth / window.innerHeight,
      cameraOptions?.near || constants.camera.near,
      cameraOptions?.far || constants.camera.far
    );

    // Set camera position
    const cameraPosition = cameraOptions?.position || constants.camera.position;

    this.camera.position.set(
      cameraPosition.x,
      cameraPosition.y,
      cameraPosition.z
    );
  }

  setupRenderer() {
    this.renderer = new THREE.WebGLRenderer();

    this.renderer.setSize(window.innerWidth, window.innerHeight);

    document?.body?.appendChild(this.renderer.domElement);
  }

  setupLights = (lightsOptions?: LightsOptions) => {
    if (!lightsOptions?.disableDefaults) {
      // Ambient light
      const ambientLight = new THREE.AmbientLight(0x404040); // soft white light
      this.scene.add(ambientLight);

      // Directional light
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(-5, 5, 10);
      directionalLight.castShadow = true;
      this.scene.add(directionalLight);
    }

    if (Array.isArray(lightsOptions?.lights)) {
      lightsOptions.lights.forEach((light) => this.scene.add(light));
    }
  };

  start() {
    for (let go of this.gameObjects) {
      go.start();
    }
  }

  addGameObject(gameObject: GameObject) {
    this.gameObjects.add(gameObject);
  }

  removeGameObject(gameObject: GameObject) {
    this.gameObjects.delete(gameObject);
  }

  update() {
    for (let go of this.gameObjects) {
      go.update();
    }
  }

  end() {}
}
