import { IPlugin } from "../ScreenThrejs/IPlugin.js";

export class SmoothAnimationPlugin extends IPlugin {
  constructor() {
    super([]);
    this.camera = null;
  }
  setCamera(camera) {
    this.camera = camera;
  }
  update(time) {
    this.camera.position.y = 2 + Math.sin(time * 0.5) * 0.3;
    this.camera.lookAt(0, 0, 0);
  }
}
