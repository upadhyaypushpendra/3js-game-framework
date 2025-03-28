import { Vector3, Color } from "three";

export default {
  camera: {
    near: 0.1,
    far: 1000,
    fov: 75,
    position: new Vector3(0, 0, 5),
  },
  scene: {
    background: new Color(0x87ceeb),
  },
};
