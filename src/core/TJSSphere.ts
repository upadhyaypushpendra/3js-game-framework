import * as THREE from "three";
import { GameObject } from "../interfaces";
import { TJSGame } from "./TJSGame";
import constants from "../constants";
import { TJSSphereOptions } from "../types";

export class TJSPSphere implements GameObject {
  name: string = "TJSSphere";
  game: TJSGame;
  mesh: THREE.Mesh;
  material: THREE.Material | THREE.Material[];
  geometry: THREE.BufferGeometry<THREE.NormalBufferAttributes>;

  /**
   * @param game - The game instance
   * @param options - Initialization options for the sphere (width, height, color)
   * @description Creates a sphere in the game scene with the specified width, height, and color.
   * If no options are provided, default values from constants are used.
   * The sphere is created with a double-sided material.
   */
  constructor(game: TJSGame, options: TJSSphereOptions = {}) {
    this.game = game;

    const defaultSphereOptions = constants.sphere;

    const radius = options?.radius || defaultSphereOptions.radius;
    const color = options?.color || defaultSphereOptions.color;

    // Create a sphere geometry and material
    this.geometry = new THREE.SphereGeometry(radius);
    this.material = options?.material || new THREE.MeshBasicMaterial({ color });

    // Create the mesh and add it to the scene
    this.mesh = new THREE.Mesh(this.geometry, this.material);
  }

  /**
   *
   * @description Creates a sphere in the game scene with the specified width, height, and color.
   */
  start(): void {
    if (this.game) {
      this.game.scene.add(this.mesh);
    } else {
      console.warn("game is undefined in:", this.name);
    }
  }

  update(dt: number): void {
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
  }
}
