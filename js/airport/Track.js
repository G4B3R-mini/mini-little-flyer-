import * as THREE from "three";
import { Base } from "js/core/base.js";

export class Track extends Base {
  constructor() {
    super();
    this.__init();
  }
  __init() {
    this.log("Track");
    this.scene = new THREE.Group();
    // Criar pista/plataforma
    const runwayGeometry = new THREE.BoxGeometry(3, 0.2, 20);
    const runwayMaterial = new THREE.MeshStandardMaterial({
      color: 0x404040,
      roughness: 0.8
    });
    const runway = new THREE.Mesh(runwayGeometry, runwayMaterial);
    runway.position.set(0, -2, -5);
    runway.receiveShadow = true;
    this.scene.add(runway);
    for (let i = 0; i < 8; i++) {
      const lineGeometry = new THREE.BoxGeometry(0.3, 0.21, 1.5);
      const lineMaterial = new THREE.MeshStandardMaterial({
        color: 0xffff00
      });
      const line = new THREE.Mesh(lineGeometry, lineMaterial);
      line.position.set(0, -1.9, -10 + i * 2.5);
      this.scene.add(line);
    }
  }
  setScene(scene) {
    this.scene = scene;
    return this;
  }
  getScene() {
    this.scene;
  }
  clone() {
    // return new Track().setScene(this.scene.clone());
    return new TrackClone(this.scene.clone());
  }
}

export class TrackClone extends Track {
  constructor(scene) {
    super();
    this.scene = scene;
  }
  __init() {
    this.log("clone");
  }
}
