export class AmmoWorldFactory {
  constructor(adapter) {
    this.ammo = adapter.ammo;
  }
  /**
   * Cria uma configuração de colisão padrão para o mundo físico
   * @returns {Ammo.btDefaultCollisionConfiguration} Configuração de colisão padrão
   */
  defaultCollisionConfiguration() {
    return new this.ammo.btDefaultCollisionConfiguration();
  }

  /**
   * Cria um dispatcher de colisão para processar eventos de colisão
   * @param {Ammo.btCollisionConfiguration} collisionConfiguration - Configuração de colisão
   * @returns {Ammo.btCollisionDispatcher} Dispatcher de colisão
   */
  collisionDispatcher(collisionConfiguration) {
    return new this.ammo.btCollisionDispatcher(collisionConfiguration);
  }

  /**
   * Cria uma interface broadphase para detecção de colisões em larga escala
   * @returns {Ammo.btDbvtBroadphase} Interface broadphase DBVT (Dynamic Bounding Volume Tree)
   */
  broadphaseInterface() {
    return new this.ammo.btDbvtBroadphase();
  }

  /**
   * Cria um solver de restrições de impulso sequencial
   * @returns {Ammo.btSequentialImpulseConstraintSolver} Solver de restrições
   */
  sequentialImpulseConstraintSolver() {
    return new this.ammo.btSequentialImpulseConstraintSolver();
  }

  /**
   * Cria um mundo de dinâmica discreto para simulação física
   * @param {Ammo.btDispatcher} dispatcher - Dispatcher de colisão
   * @param {Ammo.btBroadphaseInterface} broadphase - Interface broadphase
   * @param {Ammo.btConstraintSolver} solver - Solver de restrições
   * @param {Ammo.btCollisionConfiguration} collisionConfiguration - Configuração de colisão
   * @returns {Ammo.btDiscreteDynamicsWorld} Mundo de física discreto
   */
  discreteDynamicsWorld(
    dispatcher,
    broadphase,
    solver,
    collisionConfiguration
  ) {
    return new this.ammo.btDiscreteDynamicsWorld(
      dispatcher,
      broadphase,
      solver,
      collisionConfiguration
    );
  }
  addRigidBody(physicsWorld, body) {
    physicsWorld.addRigidBody(body);
  }
}
