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
   * Initial Camera Position, defaults to (5,0,0)
   */
  position?: Vector3;
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
  camera?: CameraOptions;
  scene?: SceneOptions;
  lights?: LightsOptions;
};

export default TGameOptions;
