import { AmbientLight, DirectionalLight } from "../threejs/DirectionLight.js";
import { Scene } from "../threejs/scene/Scene.js";

export class GameScene {
  constructor() {
    this.scene = new Scene();
  }
  create() {
    this.scene.setFog(0x87ceeb, 10, 50);
    this.scene.setBackgroundColor(0x87ceeb);
    const color = 0xffffff;
    const amb = new AmbientLight(color, 0.6);
    const dLigth = new DirectionalLight(color, 0.7);
    console.log([amb.get(), dLigth.get()]);
    this.add([amb.get(), dLigth.get()]);
  }
  get() {
    return this.scene.get();
  }
  add(obj) {
    this.scene.addToScene(obj);
  }
}
