import * as THREE from "three";
import { GameObject } from "../interfaces";
import { TJSGame } from "./TJSGame";
import constants from "../constants";
import { TJSBoxInitOptions } from "../types";

export class TJSBox implements GameObject {
  name: string;
  game: TJSGame;
  initOptions?: Record<string, any>;
  mesh?: THREE.Mesh;
  material?: THREE.Material | THREE.Material[] | undefined;
  geometry?: THREE.BufferGeometry<THREE.NormalBufferAttributes> | undefined;

  /**
   * @param game - The game instance
   * @param initOptions - Initial options for the box (width, height, depth, color)
   * @description Creates a box in the game scene with the specified width, height, and color.
   * If no options are provided, default values from constants are used.
   */
  constructor(game: TJSGame, initOptions?: TJSBoxInitOptions) {
    this.game = game;
    this.initOptions = initOptions || {};
    this.name = "TJSBox" + Math.floor(Math.random() * 1000).toString();
  }

  /**
   *
   * @param game - The game instance
   * @description Creates a box in the game scene with the specified width, height, and color.
   */
  start(game: TJSGame): void {
    this.game = game;
    const defaultBoxOptions = constants.box;

    const width = this.initOptions?.width || defaultBoxOptions.width;
    const height = this.initOptions?.height || defaultBoxOptions.height;
    const depth = this.initOptions?.depth || defaultBoxOptions.depth;
    const color = this.initOptions?.color || defaultBoxOptions.color;

    // Create a box geometry and material
    this.geometry = new THREE.BoxGeometry(width, height, depth);
    this.material = new THREE.MeshBasicMaterial({ color });

    // Create the mesh and add it to the scene
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.game.scene.add(this.mesh);
  }

  update(): void {
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
    this.mesh = undefined;
  }
}
