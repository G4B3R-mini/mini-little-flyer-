// Importa a classe base
import { ScreenThreejs } from "./screen_fron_trheejs.js";
import * as THREE from "three";
import Move from "modules/move.mobile.js";
import { JoyStick } from "modules/Joy.esm.js";
export class Game extends ScreenThreejs {
  constructor(father, track, tag = "div", styleDisplay = "block") {
    super("game", father, tag, styleDisplay);

    // Propriedades da classe
    this.move = new Move(0.1);
   // console.log(this.move);
    this.track = track;
    this.animCallback = null;
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.airplane = null;
    this.clouds = [];
    this.stars = [];
    this.time = 0;
    this.__init();
  }
  __init() {
    this.__addCanvas();
    this.__createEnvironment();
    this.__createAirplane();
  }
  __startAnimation() {
    const animate = () => {
      this.time += 0.016;

      // Animar avião (movimento suave de voo)
      if (this.airplane) {
        this.move.updateZ(this.airplane);
      }

      this.camera.lookAt(0, 0, 0);
    };
    super.__startAnimation(animate);
  }
  __createEnvironment() {
    this.track.scene.position.z -= 10;
    this.scene.add(this.track.scene);
  }
  setAirplane(object) {
    this.removeFromScene(this.airplane);
    this.addToScene(object);

    object.rotation.y = Math.PI;
    this.airplane = object;
    this.airplane.position.y = -1;
    this.airplane.position.z = 3;
  }
  __addControls() {
    this.getJoy().element.style.display = "block";
    new JoyStick(this.getJoy().name, {}, stickData => {
      this.move.joyUpdate(stickData.x, stickData.y);
    });
  }
  create() {
    super.create();
    this.__addControls();
  }
  getJoy() {
    return { name: "joy", element: document.getElementById("joy") };
  }
  destroy() {
    this.getJoy().element.style.display = "none";
    super.destroy();
  }
}
