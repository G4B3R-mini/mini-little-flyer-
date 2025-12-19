import * as THREE from "three";
import * as MODULES from "./screen_fron_trheejs.js";
import { RotationObject } from "modules/RotationObject.js";

export class ScreenThreejs extends MODULES.ScreenThreejs {
  constructor(
    nameId,
    father,
    callback = () => {},
    tag = "div",
    styleDisplay = "block"
  ) {
    super(nameId, father, callback, tag, styleDisplay);
    this.rotation();
  }
  rotation() {
    new RotationObject(
      null,
      (x, y) => {
        const sensibilidade = 0.002;
        this.camera.rotation.x += y * sensibilidade; // sobe/desce
        this.camera.rotation.y += x * sensibilidade; // gira pro lado
        this.camera.lookAt(this.airplane.position);
      },
      0.1
    );
  }
}
