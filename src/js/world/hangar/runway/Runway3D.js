import * as THREE from "three";


export class Runway3D {
  constructor(settings) {
    // === Criação da pista principal ===
    const runwayGeometry = new THREE.BoxGeometry(
      settings.Width,
      settings.Height,
      settings.Length
    );
    const runwayMaterial = new THREE.MeshStandardMaterial({
      color: settings.color,
      roughness: settings.roughness,
    });
    this.runway = new THREE.Mesh(runwayGeometry, runwayMaterial);

    this.runway.receiveShadow = settings.receiveShadow;
  }
  get() {
    return this.runway;
  }
}
