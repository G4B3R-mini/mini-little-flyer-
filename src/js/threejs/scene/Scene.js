import * as THREE from "three";
import { IThreejs } from "../implementation/IThreejs.js";
import { SceneOrchestrator } from "./SceneOrchestrator.js";

/**
 * Classe responsável por gerenciar a cena do Three.js.
 * Utiliza o padrão Facade para delegar operações ao SceneOrchestrator.
 *
 * @class Scene
 * @extends {IThreejs}
 */
export class Scene extends IThreejs {
  /**
   * Cria uma instância de Scene.
   *
   * @param {SceneOrchestrator} orchestrator - Orquestrador responsável pelas operações da cena
   */
  constructor(orchestrator = new SceneOrchestrator()) {
    super();

    this.orchestrator = orchestrator;
  }

  /**
   * Define neblina (fog) na cena.
   *
   * @param {number} [color=0x87ceeb] - Cor da neblina em formato hexadecimal
   * @param {number} [near=10] - Distância inicial onde a neblina começa
   * @param {number} [far=50] - Distância final onde a neblina termina
   */
  setFog(color = 0x87ceeb, near = 10, far = 50) {
    this.orchestrator.setFog(color, near, far);
  }

  /**
   * Adiciona um objeto ou array de objetos à cena.
   *
   * @param {THREE.Object3D|THREE.Object3D[]} object - Objeto ou array de objetos a adicionar
   */
  addToScene(object) {
    this.orchestrator.addToScene(object);
  }

  /**
   * Define a cor de fundo da cena.
   *
   * @param {number} [color=0x87ceeb] - Cor de fundo em formato hexadecimal
   */
  setBackgroundColor(color = 0x87ceeb) {
    this.orchestrator.setBackgroundColor(color);
  }

  /**
   * Remove um objeto da cena.
   *
   * @param {THREE.Object3D} object - Objeto a remover
   */
  removeFromScene(object) {
    this.orchestrator.removeFromScene(object);
  }

  /**
   * Libera todos os recursos da cena (geometrias, materiais) e a limpa.
   */
  dispose() {
    this.orchestrator.dispose();
  }

  /**
   * Retorna a instância da cena Three.js.
   *
   * @returns {THREE.Scene} A cena Three.js gerenciada
   */
  get() {
    return this.orchestrator.get();
  }
}
