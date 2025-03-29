import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import {
  TGameOptions,
  CameraOptions,
  LightsOptions,
  SceneOptions,
} from "../types";
import { GameObject } from "../interfaces";
import constants from "../constants";

export class TJSGame {
  camera!: THREE.Camera;
  scene!: THREE.Scene;
  renderer!: THREE.WebGLRenderer;
  gameObjects!: Set<GameObject>;
  SCREEN_WIDTH!: number;
  SCREEN_HEIGHT!: number;
  clock: THREE.Clock;
  controls!: OrbitControls;
  animationLoopEnabled: boolean = true;
  private gameObjectMap: Map<string, GameObject>;

  /**
   *
   * @param options - TGame Options
   */
  constructor(options: TGameOptions = {}) {
    this.gameObjects = new Set();
    this.clock = new THREE.Clock();
    this.animationLoopEnabled = options.disableAnimationLoop ? false : true;
    this.SCREEN_WIDTH = Math.floor(window.innerWidth);
    this.SCREEN_HEIGHT = Math.floor(window.innerHeight);
    this.gameObjectMap = new Map<string, GameObject>();

    this.setupScene(options.scene);
    this.setupLights(options.lights);
    this.setupRenderer();
    this.setupCamera(options.camera);
    this.addResizeListener();
    this.addRefreshListener();
  }

  /**
   * Add event listener to update the canvas if the page is reloaded
   */
  addRefreshListener() {
    window.addEventListener("DOMContentLoaded", () => {
      this.update();

      this.renderer.render(this.scene, this.camera);
    });
  }

  addResizeListener() {
    window.addEventListener("resize", () => {
      this.SCREEN_WIDTH = Math.floor(window.innerWidth);
      this.SCREEN_HEIGHT = Math.floor(window.innerHeight);

      //@ts-ignore
      this.camera.aspect = this.SCREEN_WIDTH / this.SCREEN_HEIGHT;
      //@ts-ignore
      this.camera.updateProjectionMatrix();

      this.renderer.setSize(this.SCREEN_WIDTH, this.SCREEN_HEIGHT);
    });
  }

  setupScene(sceneOptions?: SceneOptions) {
    this.scene = new THREE.Scene();

    this.scene.background =
      sceneOptions?.background || constants.scene.background;

    if (sceneOptions?.addAxisHelper) {
      const axesHelper = new THREE.AxesHelper(50);

      this.scene.add(axesHelper);
    }
  }

  setupCamera(cameraOptions?: CameraOptions) {
    const cameraDefaults = constants.camera;

    this.camera = new THREE.PerspectiveCamera(
      cameraOptions?.fov || cameraDefaults.fov,
      this.SCREEN_WIDTH / this.SCREEN_HEIGHT,
      cameraOptions?.near || cameraDefaults.near,
      cameraOptions?.far || cameraDefaults.far
    );

    // Set camera position
    const cameraPosition = cameraOptions?.position || cameraDefaults.position;

    this.camera.position.set(
      cameraPosition[0],
      cameraPosition[1],
      cameraPosition[2]
    );

    if (cameraOptions?.enableOrbitControls) {
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
      this.controls.dampingFactor = 0.25;
      this.controls.screenSpacePanning = false;
      this.controls.maxPolarAngle = Math.PI / 2;
      this.controls.update();
    }
  }

  setupRenderer() {
    this.renderer = new THREE.WebGLRenderer();

    this.renderer.setSize(this.SCREEN_WIDTH, this.SCREEN_HEIGHT);

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

  /**
   * Start the game and all game objects
   */
  start() {
    this.clock.start();
    for (let gameObject of this.gameObjects) {
      gameObject.start(this);
    }
    if (this.animationLoopEnabled) this.animate();
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));

    this.update();
  }

  /**
   * Add GameObject to the TSGame
   * @param gameObject - GameObject to be added to the game
   */
  addGameObject(gameObject: GameObject) {
    if (this.clock.running) gameObject.start(this);

    this.gameObjects.add(gameObject);
    let name = gameObject?.name || gameObject.constructor.name;

    if (this.gameObjectMap.has(name)) {
      name = `${name}-${Math.floor(Math.random() * 1000)}`;
      `GameObject with name ${gameObject.name} already exists. Generated new ${name}.`;
    }

    if (name !== gameObject.name) {
      console.warn();
      gameObject.name = name;
    }

    this.gameObjectMap.set(name, gameObject);
  }

  /**
   * Remove GameObject from the TSGame
   * @param gameObject - GameObject to be removed from the game
   */
  removeGameObject(gameObject: GameObject) {
    if (this.clock.running) gameObject.end();

    this.gameObjects.delete(gameObject);
  }

  getGameObject(name: string) {
    return this.gameObjectMap.get(name);
  }

  /**
   * To be invoked in animation loop, Update all game objects in TSGame
   */
  update() {
    for (let gameObject of this.gameObjects) {
      gameObject.update();
    }
    if (this.controls) this.controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true

    this.renderer.render(this.scene, this.camera);
  }

  /**
   * To be invoked when the game ends
   */
  end() {
    this.clock.stop();
  }
}
