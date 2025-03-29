import { Vector3, Light, Color } from "three";

export type CameraOptions = {
  /**
   * Default to 0.1
   */
  near?: number;
  /**
   * Default to 1000
   */
  far?: number;
  /**
   * Camera FOV, default to 75
   */
  fov?: number;
  /**
   * Initial Camera Position, defaults to [0, 5, 5]
   */
  position?: [number, number, number];

  /**
   * Initial Camera LookAt, defaults to [0, 0, 0]
   */
  enableOrbitControls?: boolean;
};

export type SceneOptions = {
  /**
   * Background color for the scene other than default
   */
  background?: Color;

  /**
   * Add AxisHelper
   */
  addAxisHelper?: boolean;
};

export type LightsOptions = {
  /**
   * Add explicit lights into the scene
   */
  lights?: Light[];
  /**
   * Disable default lights added into the scene.
   */
  disableDefaults?: boolean;
};

export type TGameOptions = {
  /**
   * Camera Options
   */
  camera?: CameraOptions;
  /**
   * Scene Options
   */
  scene?: SceneOptions;
  /**
   * Lights Options
   */
  lights?: LightsOptions;

  /**
   * Disable animation loop and write your own animation loop.
   * This is useful for performance optimization and when you want to use your own animation loop.
   */
  disableAnimationLoop?: boolean;
};

export type GameObjectInitOptions = Record<string, any>;

export type TJSPlaneInitOptions = {
  /**
   * Width of the plane, default is 10
   */
  width?: number;
  /**
   * Height of the plane, default is 10
   */
  height?: number;
  /**
   * Color of the plane, default is 0x00ff00 (green)
   */
  color?: number;
};

export type TJSBoxInitOptions = {
  /**
   * Width of the box, default is 1
   */
  width?: number;
  /**
   * Height of the box, default is 1
   */
  height?: number;
  /**
   * Depth of the box, default is 1
   */
  depth?: number;
  /**
   * Color of the box, default is 0xf5f5f5 (whitesmoke)
   */
  color?: number;
};

export type TJSSphereInitOptions = {};
