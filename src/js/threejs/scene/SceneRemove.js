import * as THREE from "three";

/**
 * Classe responsável por remover objetos da cena.
 */
export class SceneRemove {
  removeFromScene(scene, object) {
    if (scene && object instanceof THREE.Object3D) {
      scene.remove(object);
    }
  }
}
