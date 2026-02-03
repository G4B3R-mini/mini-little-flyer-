import { ObjectTypeFactory } from "./SceneAppend.js";
import { SceneBackground } from "./SceneBackground.js";
import { SceneFog } from "./SceneFog.js";
import { SceneRemove } from "./SceneRemove.js";
import { SceneResourceCleaner } from "./SceneResourceCleaner.js";
import * as THREE from "three";

/**
 * Orquestrador responsável por gerenciar todas as operações da cena Three.js.
 * Utiliza composição para delegar responsabilidades a classes especializadas.
 */
export class SceneOrchestrator {
  constructor(
    fog = new SceneFog(),
    cleaner = new SceneResourceCleaner(),
    backgroundManager = new SceneBackground(),
    removeManager = new SceneRemove(),
    appendFactory = new ObjectTypeFactory()
  ) {
    this.scene = new THREE.Scene();
    this.backgroundManager = backgroundManager;

    this.cleaner = cleaner;
    this.removeManager = removeManager;

    this.fog = fog;

    this.appendFactory = appendFactory;
  }

  /**
   * Define neblina na cena.
   *
   * @param {number} [color=0x87ceeb] - Cor da neblina em formato hexadecimal
   * @param {number} [near=10] - Distância inicial onde a neblina começa
   * @param {number} [far=50] - Distância final onde a neblina termina
   */
  setFog(color = 0x87ceeb, near = 10, far = 50) {
    this.fog.setFog(this.scene, color, near, far);
  }

  /**
   * Adiciona um objeto ou array de objetos à cena.
   *
   * @param {THREE.Object3D|THREE.Object3D[]} object - Objeto ou array de objetos a adicionar
   */
  addToScene(object) {
    if (!this.scene) return;
    const scene_append = this.appendFactory.getObjectType(object);
    scene_append.appendToScene(this.scene, object);
  }

  /**
   * Define a cor de fundo da cena.
   *
   * @param {number} [color=0x87ceeb] - Cor de fundo em formato hexadecimal
   */
  setBackgroundColor(color = 0x87ceeb) {
    this.backgroundManager.setBackgroundColor(this.scene, color);
  }

  /**
   * Remove um objeto da cena.
   *
   * @param {THREE.Object3D} object - Objeto a remover
   */
  removeFromScene(object) {
    this.removeManager.removeFromScene(this.scene, object);
  }

  /**
   * Libera todos os recursos da cena (geometrias, materiais) e a limpa.
   */
  dispose() {
    if (!this.scene) return;
    // 1. Libera Geometrias/Materiais (usa this.scene)
    this.cleaner.disposeAllChild(this.scene);

    // 2. Remove objetos da hierarquia (usa this.scene)
    this.cleaner.removeAllChild(this.scene);

    // 3. Limpa referências (define this.scene = null)
    this.cleaner.clearScene(this.scene);

    // O objeto 'this.scene' em si se torna nulo APÓS o ResourceCleaner usá-lo
    this.scene = null;
  }

  /**
   * Retorna a instância da cena Three.js.
   *
   * @returns {THREE.Scene} A cena Three.js gerenciada
   */
  get() {
    return this.scene;
  }
}
