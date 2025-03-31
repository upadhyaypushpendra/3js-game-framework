import * as THREE from "three";
import { TJSGame } from "../core";

export interface GameObject {
  /**
   * The game object name
   * This is used to identify the game object in the game.
   */
  name: string;
  /**
   * The is reference to TJSGame object
   */
  game: TJSGame;

  /**
   * * Optional mesh, geometry, and material properties
   * These are optional and can be used to create a mesh, geometry, and material for the game object.
   */
  mesh?: THREE.Mesh;
  geometry?: THREE.BufferGeometry;
  material?: THREE.Material | THREE.Material[];

  /**
   * Called on the game start, before the first frame, mesh is added to the scene
   */
  start(): void;

  /**
   * Called on every frame
   * @param dt - The delta time since the last frame
   */
  update(dt: number): void;

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
