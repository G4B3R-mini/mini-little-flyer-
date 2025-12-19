import * as THREE from "three";

/**
 * Classe responsável por gerenciar neblina (fog) da cena.
 */
export class SceneFog {
  setFog(scene, color = 0x87ceeb, near = 10, far = 50) {
    scene.fog = new THREE.Fog(color, near, far);
  }
}
