import { IPlugin } from "./ScreenThrejs/IPlugin.js";
import * as THREE from "three";

export class CubePlugin extends IPlugin {
  constructor() {
    // Geometria do cubo
    const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);

    // Material neon com bordas brilhantes
    const material = new THREE.MeshBasicMaterial({
      color: 0x00ffff,
      wireframe: true,
      wireframeLinewidth: 2,
    });

    const cube = new THREE.Mesh(geometry, material);
    // Cubo interno menor para efeito de profundidade
    const innerGeometry = new THREE.BoxGeometry(1.2, 1.2, 1.2);
    const innerMaterial = new THREE.MeshBasicMaterial({
      color: 0xff00ff,
      wireframe: true,
    });
    const innerCube = new THREE.Mesh(innerGeometry, innerMaterial);
    cube.add(innerCube);
    cube.position.set(0, 2, 2);
    super(cube);
  }
  update() {
    if (!this.object) return;
    this.object.rotation.x += 0.02;
    this.object.rotation.y += 0.02;
  }
}
