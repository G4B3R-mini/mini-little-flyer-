import { PerspectiveCamera } from "../../threejs/PerspectiveCamera.js";


export class GameCamera {
  constructor(    camera = new PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )) {

    this.camera = camera;
    this.camera.setposition(0, 2, 8.1);
    this.camera.setLookAt(0, 0, 0);
  }

  get() {
    return this.camera.get();
  }
  resizeHandler() {
    if (!this.camera.get()) return;
    this.camera.get().aspect = window.innerWidth / window.innerHeight;
    this.camera.get().updateProjectionMatrix();
  }
  
}
