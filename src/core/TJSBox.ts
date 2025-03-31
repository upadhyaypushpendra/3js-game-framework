import * as THREE from "three";
import { GameObject } from "../interfaces";
import { TJSGame } from "./TJSGame";
import constants from "../constants";
import { TJSBoxOptions } from "../types";

export class TJSBox implements GameObject {
  name: string = "TJSBox";
  game: TJSGame;
  mesh: THREE.Mesh;
  material: THREE.Material | THREE.Material[] | undefined;
  geometry: THREE.BufferGeometry<THREE.NormalBufferAttributes> | undefined;

  /**
   * @param game - The game instance
   * @param options - Initial options for the box (width, height, depth, color)
   * @description Creates a box in the game scene with the specified width, height, and color.
   * If no options are provided, default values from constants are used.
   */
  constructor(game: TJSGame, options: TJSBoxOptions = {}) {
    this.game = game;

    const defaultBoxOptions = constants.box;

    const width = options?.width || defaultBoxOptions.width;
    const height = options?.height || defaultBoxOptions.height;
    const depth = options?.depth || defaultBoxOptions.depth;
    const color = options?.color || defaultBoxOptions.color;

    // Create box geometry
    this.geometry = new THREE.BoxGeometry(width, height, depth);

    // Create basic material
    this.material = new THREE.MeshBasicMaterial({ color });

    // Create the mesh and add it to the scene
    this.mesh = new THREE.Mesh(this.geometry, this.material);
  }

  /**
   *
   * @description Creates a box in the game scene with the specified width, height, and color.
   */
  start(): void {
    if (this.game) {
      this.game.scene.add(this.mesh);
    } else {
      console.warn("game is undefined in:", this.name);
    }
  }

  update(dt: number): void {
    // Update logic can be added here if needed
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
