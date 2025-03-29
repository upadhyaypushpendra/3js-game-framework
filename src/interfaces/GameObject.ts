import * as THREE from "three";
import { TJSGame } from "../core";
import { GameObjectInitOptions } from "../types";

export interface GameObject {
  /**
   * The game object name
   * This is used to identify the game object in the game.
   */
  name?: string;
  /**
   * The is reference to TJSGame object
   */
  game: TJSGame;
  /**
   * * Optional initialization options
   * These are optional and can be used to create a mesh, geometry, and material for the game object.
   */
  initOptions?: GameObjectInitOptions;

  /**
   * * Optional mesh, geometry, and material properties
   * These are optional and can be used to create a mesh, geometry, and material for the game object.
   */
  mesh?: THREE.Mesh;
  geometry?: THREE.BufferGeometry;
  material?: THREE.Material | THREE.Material[];

  /**
   * Called on the game start, before the first frame
   * Do all the initialization here
   * @param game - The game instance
   * @param initOptions - Optional initialization options
   */
  start(game: TJSGame): void;
  /**
   * Called every frame
   * Do all the game logic here
   */
  update(): void;

  /**
   * Called when the game is ends
   */
  end(): void;

  /**
   * Implement to check collisions with any provided Mesh
   */
  isCollidingWithMesh?(mesh: THREE.Mesh): boolean;

  /**
   * Implement to check collisions with any provided Mesh of GameObject
   */
  isCollidingWithGameObject?(gameObject: GameObject): boolean;
}
