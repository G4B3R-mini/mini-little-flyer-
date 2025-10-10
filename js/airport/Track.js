import * as THREE from "three";

export  class Track {
  constructor() {
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
  getScene() {
    this.scene;
  }
}
