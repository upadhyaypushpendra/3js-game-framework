import { Vector3, Color } from "three";

export default {
  camera: {
    near: 0.1,
    far: 1000,
    fov: 75,
    position: [0, 5, 5],
  },
  scene: {
    background: new Color(0x87ceeb),
  },
  plane: {
    width: 10,
    height: 10,
    color: 0xffffff, // white
  },
  box: {
    width: 1,
    height: 1,
    depth: 1,
    color: 0xf5f5f5, // whitesmoke
  },
  sphere: {
    radius: 1,
    color: 0xf5f5f5, // whitesmoke
  },
};
