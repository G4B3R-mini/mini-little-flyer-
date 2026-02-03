import { IObjectThreejs } from "./contract/IObjectThreejs.js";
import * as THREE from "three";

export class DirectionalLight extends IObjectThreejs {
  constructor(color = 0xffffff, intencity = 0.6) {
    super();
    // const ambientLight = new THREE.AmbientLight(color, intencity);
    //   this.scene.add(ambientLight);

    this.directionalLight = new THREE.DirectionalLight(color, intencity);
    this.directionalLight.position.set(5, 10, 5);
    this.directionalLight.castShadow = true;
    this.directionalLight.shadow.mapSize.width = 2048;
    this.directionalLight.shadow.mapSize.height = 2048;
  }

  setPosition(x, y, z) {
    this.directionalLight.setPosition(x, y, z);
  }

  get() {
    return this.directionalLight;
  }
  addToScene(scene) {
    scene.add(this.directionalLight);
  }
}

export class Light extends IObjectThreejs {
  constructor(amb) {
    super();
    this.amb = amb;
  }
  shadow(state) {
    this.amb.castShadow = state;
  }
  get() {
    return this.amb;
  }
  addToScene(scene) {
    scene.add(this.amb);
  }
  setPosition(x, y, z) {
    this.amb.position.set(x, y, z);
  }
}

export class AmbientLight extends Light {
  constructor(color, intencity) {
    super(new THREE.AmbientLight(color, intencity));
    this.shadow(false);
  }

  get() {
    return this.amb;
  }
  addToScene(scene) {
    scene.add(this.amb);
  }
  setPosition(x, y, z) {
    this.amb.position.set(x, y, z);
  }
}

export class HemisphereLight extends Light {
  constructor() {
    super(new THREE.HemisphereLight(0xffffff, 0x444444));
    this.amb.position.set(0, 20, 0);
  }
}
