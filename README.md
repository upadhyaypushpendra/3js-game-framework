# 3js-game-framework

3js-game-framework is a lightweight and flexible framework designed to streamline the creation of 3D games and interactive applications using Three.js. It provides an easy-to-use architecture for managing game objects, updating game states, and handling the animation loop. With built-in support for object management, dynamic updates, and a clear game lifecycle, this framework helps developers focus on creating engaging 3D experiences without the boilerplate setup.

Key features include:

- A TJSGame class for managing the game lifecycle (start, update, end).
- GameObject management with a consistent interface for custom objects.
- A built-in animation loop to ensure smooth, continuous updates, which can be disabled as well.
- Easy integration with Three.js for rendering 3D scenes and objects.
- Simple methods to add, update, and remove game objects dynamically.
- Basic extendable Game Objects like TJSBox, TJSPlane, TJSSphere.
- Typescript supported

Whether you're building a simple 3D game or a more complex interactive experience, 3js-game-framework provides a solid foundation to jumpstart your development.

# Usage

## Npm URL

```cli
https://www.npmjs.com/package/3js-game-framework
```

## Install

```bash
npm install 3js-game-framework
```

## Define your custom objects by implementing _GameObject_ Interface

```javascript
import * as THREE from "three";
import { TJSGame, GameObject } from "3js-game-framework";

export class MyCustomObject extends GameObject {
  game: TJSGame;
  mesh: THREE.Mesh;

  constructor(tjsgame: TJSGame) {
    this.tjsgame = game;
  }

  start(tjsgame: TJSGame) {
    this.game = tjsgame;
    const radiusTop = 0.2;
    const radiusBottom = 0.2;
    const height = 0.05; // Very thin to resemble a disk
    const radialSegments = 32;

    const geometry = new THREE.CylinderGeometry(
      radiusTop,
      radiusBottom,
      height,
      radialSegments
    );
    const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
    this.mesh = new THREE.Mesh(geometry, material);
  }

  update() {
    this.mesh?.rotateZ(0.01);
  }

  end() {
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

```

## Use the _TJSGame_ class to manage your game objects

```javascript
import * as THREE from "three";
import { TJSGame, TJSPlane } from "3js-game-framework";

class Game {
  tjsGame: TJSGame | null = null;

  constructor() {
    this.tjsGame = new TJSGame({
      camera: {
        position: [0, 10, 10],
        enableOrbitControls: true,
      },
    });
    this.tjsGame.camera.rotateX(-Math.PI / 4);

    this.tjsGame.addGameObject(new TJSPlane(this.tjsGame));
    this.tjsGame.addGameObject(new MyCustomObject(this.tjsGame));
  }
  start() {
    console.log("Game started!");
    this.tjsGame?.start();
  }
  stop() {
    console.log("Game stopped!");
  }
  reset() {
    console.log("Game reset!");
  }
}

const game = new Game();

// Start the game
game.start();
```
