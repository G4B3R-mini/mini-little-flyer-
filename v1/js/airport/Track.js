import * as THREE from "three";
import { Base } from "js/core/base.js";





/**
 * Classe Track
 *
 * Cria uma pista (runway) com marcações de linha no centro.
 * Permite configurar dimensões e proporções através do parâmetro `settings`.
 *
 * @param {Object} settings - Configurações de proporções e dimensões.
 * @param {number} settings.runwayWidth - Largura da pista.
 * @param {number} settings.runwayHeight - Altura da pista.
 * @param {number} settings.runwayLength - Comprimento da pista.
 * @param {number} settings.lineWidth - Largura das linhas centrais.
 * @param {number} settings.lineHeight - Altura das linhas.
 * @param {number} settings.lineLength - Comprimento das linhas.
 * @param {number} settings.lineSpacing - Espaçamento entre linhas.
 */
export class Track extends Base {
  constructor(settings = {}) {
    super("Track");

    // Configurações padrão
    this.settings = Object.assign(
      {
        runwayWidth: 3,
        runwayHeight: 0.2,
        runwayLength: 20,
        lineWidth: 0.3,
        lineHeight: 0.21,
        lineLength: 1.5,
        lineSpacing: 2.5
      },
      settings
    );

    this.__init();
  }

  __init() {
    this.log("init");

    // Grupo principal da pista
    this.scene = new THREE.Group();

    // === Criação da pista principal ===
    const runwayGeometry = new THREE.BoxGeometry(
      this.settings.runwayWidth,
      this.settings.runwayHeight,
      this.settings.runwayLength
    );
    const runwayMaterial = new THREE.MeshStandardMaterial({
      color: 0x404040,
      roughness: 0.8
    });
    const runway = new THREE.Mesh(runwayGeometry, runwayMaterial);
    runway.position.set(0, -2, -5); // posição da pista
    runway.receiveShadow = true;
    this.scene.add(runway);

    // === Criação das linhas amarelas centrais ===
    for (let i = 0; i < 8; i++) {
      const lineGeometry = new THREE.BoxGeometry(
        this.settings.lineWidth,
        this.settings.lineHeight,
        this.settings.lineLength
      );
      const lineMaterial = new THREE.MeshStandardMaterial({
        color: 0xffff00
      });
      const line = new THREE.Mesh(lineGeometry, lineMaterial);

      // Posiciona cada linha com base no espaçamento configurado
      line.position.set(0, -1.9, -10 + i * this.settings.lineSpacing);
      this.scene.add(line);
    }
    for (let i = 0; i < 8; i++) {
      const lineGeometry = new THREE.BoxGeometry(
        this.settings.lineWidth,
        3,
        this.settings.lineLength
      );
      const lineMaterial = new THREE.MeshStandardMaterial({
        color: 0xffff,
        transparent: true,
        opacity: 0.02
      });
      lineMaterial.opacity = 0.05;
      const line = new THREE.Mesh(lineGeometry, lineMaterial);

      // Posiciona cada linha com base no espaçamento configurado
      line.position.set(0, -1.9, -10 + i * this.settings.lineSpacing);
      this.scene.add(line);
    }
  }

  /**
   * Define manualmente o grupo da cena.
   * @param {THREE.Group} scene
   * @returns {Track}
   */
  setScene(scene) {
    this.scene = scene;
    return this;
  }

  /**
   * Retorna a cena atual (THREE.Group)
   * @returns {THREE.Group}
   */
  getScene() {
    return this.scene;
  }

  /**
   * Clona a pista atual e retorna uma nova instância.
   * @returns {TrackClone}
   */
  clone() {
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
