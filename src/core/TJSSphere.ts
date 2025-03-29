import * as THREE from "three";
import { GameObject } from "../interfaces";
import { TJSGame } from "./TJSGame";
import constants from "../constants";
import { TJSSphereInitOptions } from "../types";

export class TJSPShere implements GameObject {
  game: TJSGame;
  initOptions?: Record<string, any>;
  mesh?: THREE.Mesh;
  material?: THREE.Material | THREE.Material[] | undefined;
  geometry?: THREE.BufferGeometry<THREE.NormalBufferAttributes> | undefined;

  /**
   * @param game - The game instance
   * @param initOptions - Initialization options for the sphere (width, height, color)
   * @description Creates a sphere in the game scene with the specified width, height, and color.
   * If no options are provided, default values from constants are used.
   * The sphere is created with a double-sided material.
   */
  constructor(game: TJSGame, initOptions?: TJSSphereInitOptions) {
    this.game = game;
    this.initOptions = initOptions || {};
  }

  /**
   *
   * @param game - The game instance
   * @description Creates a sphere in the game scene with the specified width, height, and color.
   */
  start(game: TJSGame): void {
    this.game = game;
    const defaultSphereOptions = constants.sphere;

    const radius = this.initOptions?.width || defaultSphereOptions.radius;
    const color = this.initOptions?.color || defaultSphereOptions.color;

    // Create a sphere geometry and material
    this.geometry = new THREE.SphereGeometry(radius);
    this.material = new THREE.MeshBasicMaterial({ color });

    // Create the mesh and add it to the scene
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.rotation.x = -Math.PI / 2; // Rotate to make it horizontal
    this.game.scene.add(this.mesh);
  }

  update(): void {
    // Method not implemented.
  }

  end(): void {
    if (this.mesh) {
      this.game.scene.remove(this.mesh);
      this.mesh.geometry.dispose();
      if (Array.isArray(this.mesh.material)) {
        this.mesh.material.forEach((material) => {
          (material as THREE.Material).dispose();
        });
      } else {
        (this.mesh.material as THREE.Material).dispose();
      }
    }
    this.mesh = undefined;
  }
}
