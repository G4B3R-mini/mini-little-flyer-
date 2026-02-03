export class AmmoMathFactory {
  constructor(adapter) {

    this.ammo = adapter.ammo;
  }
  /**
   * Cria um vetor 3D para representar posições, velocidades ou direções
   * @param {number} x - Componente X do vetor (padrão: 0)
   * @param {number} y - Componente Y do vetor (padrão: 0)
   * @param {number} z - Componente Z do vetor (padrão: 0)
   * @returns {Ammo.btVector3} Vetor 3D do Bullet Physics
   */
  vector3(x = 0, y = 0, z = 0) {
    return new this.ammo.btVector3(x, y, z);
  }

  /**
   * Cria uma transformação (posição e rotação) para objetos físicos
   * @returns {Ammo.btTransform} Objeto de transformação do Bullet Physics
   */
  transform() {

    return new this.ammo.btTransform();
  }
  quaternion(x = 0, y = 0, z = 0, w = 1) {
    return new this.ammo.btQuaternion(x, y, z, w);
  }
}
