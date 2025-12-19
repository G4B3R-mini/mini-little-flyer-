import * as THREE from "three";

/**
 * Classe responsável por gerenciar a cor de fundo da cena.
 */
export class SceneBackground {
  setBackgroundColor(scene, color = 0x87ceeb) {
    scene.background = new THREE.Color(color);
  }
}
