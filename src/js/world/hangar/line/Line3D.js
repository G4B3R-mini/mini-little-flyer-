import * as THREE from "three";

export class Line3D {
  constructor(settings = {}) {
    const lineGeometry = new THREE.BoxGeometry(
      settings.Width,
      settings.Height,
      settings.Length
    );
    const lineMaterial = new THREE.MeshStandardMaterial({
      color: settings.color,
    });
    this.line = new THREE.InstancedMesh(lineGeometry, lineMaterial, settings.count);
 
  }
  get() {
    return this.line;
  }
}