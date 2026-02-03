
export class AmmoShapeFactory {
  constructor(adapter) {
    this.ammo = adapter.ammo;
  }

  /**
   * Cria uma forma de colisão em formato de esfera
   * @param {number} radius - Raio da esfera
   * @returns {Ammo.btSphereShape} Forma de esfera para colisão
   */
  sphereShape(radius) {
    return new this.ammo.btSphereShape(radius);
  }/**
   *  Cria uma forma de colisão em formato de caixa
   * @param {Ammo.btVector3} halfExtents 
   * @returns {Ammo.btBoxShape}
   */
  boxShape(halfExtents) {
    return new this.ammo.btBoxShape(halfExtents);
  }
}