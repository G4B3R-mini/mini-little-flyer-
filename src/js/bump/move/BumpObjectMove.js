import Ammo from "ammojs-typed";

/**
 * Classe para manipular o movimento de objetos rígidos no BumpLib.
 * 
 * Kinematic Bodies: Se você quer mover um objeto manualmente (como uma plataforma móvel que ignora a gravidade mas empurra o jogador), configure-o como Kinematic:

J* @example

const CF_KINEMATIC_OBJECT = 2;
rigidBody.setCollisionFlags(rigidBody.getCollisionFlags() | CF_KINEMATIC_OBJECT);
rigidBody.setActivationState(4); // DISABLE_DEACTIVATION
 */
export class BumpObjectMove {
  /**
   * Define a velocidade linear do corpo rígido.
   * Usando Velocidade (Recomendado para Personagens/Veículos)
   * @param {Ammo.RigidBody} objectBody
   * @param {Ammo.btVector3} velocity
   *
   * @example
   * // Define a velocidade linear de um corpo rígido para (10, 0, 0)
   * const velocity = BumpLib.math.vector3(10, 0, 0);
   * bumpObjectMove.setLinearVelocity(objectBody, velocity);
   */
 static setLinearVelocity(objectBody, velocity) {
    objectBody.setLinearVelocity(velocity);
  }
  /**
   * Define a velocidade angular do corpo rígido.
   * simplificando rotações.
   * Usando Velocidade Angular (Recomendado para Personagens/Veículos)
   * @param {Ammo.RigidBody} objectBody
   * @param {Ammo.btVector3} velocity
   */
  static setAngularVelocity(objectBody, velocity) {
    objectBody.setAngularVelocity(velocity);
  }
  /**
   * Ativa o corpo rigidbody, possibilitando que ele reaja a forças e colisões.
   * @param {Ammo.RigidBody} objectBody
   */
  static activateBody(objectBody) {
    objectBody.activate();
  }

  /**
   *  Aplica uma força central ao corpo rígido.
   * Aplica uma força contínua (como um motor).
   * @param {Ammo.RigidBody} objectBody
   * @param {Ammo.btVector3} force  forca a ser aplicada
   * @param {Ammo.btVector3} relativePos centro de aplicação da força, sentro do objeto geralmente é (0,0,0)
   */
  static ApplyForce(objectBody, force, relativePos) {
    objectBody.applyImpulse(force, relativePos);
  }
/**
 * Aplica uma força instantânea (como um tiro ou um pulo).
   * @param {Ammo.RigidBody} objectBody
   * @param {Ammo.btVector3} force  forca a ser aplicada
   * @param {Ammo.btVector3} relativePos centro de aplicação da força, sentro do objeto geralmente é (0,0,0)
   */
  static ApplyImpulse(objectBody, force, relativePos) {
    objectBody.applyImpulse(force, relativePos);
  }

  /**
   *    Teleporta o corpo rígido para uma nova posição.
   * @param {*} Ammo
   * @param {*} objectBody
   * @param {*} position
   * @param {*} transform
   * @example
   *
   * const position = new Ammo.btVector3(x, y, z)
   * let transform = new Ammo.btTransform();
   *
   *
  * ## example 2:
   * 
   * let transform = new Ammo.btTransform();transform.setIdentity();
   *   ransform.setOrigin(new Ammo.btVector3(x, y, z));
   * // Aplica o novo posicionamento
   * rigidBody.setWorldTransform(transform);
   * // Zera as velocidades para o objeto não "chegar voando" na nova posição
   * rigidBody.setLinearVelocity(new Ammo.btVector3(0, 0, 0));
   * rigidBody.setAngularVelocity(new Ammo.btVector3(0, 0, 0));
   */
  static teleportBody(Ammo, objectBody, position, transform) {
    //
    transform.setIdentity();  // reseta a rotacao e posicao
    transform.setOrigin(position);

    // Aplica o novo posicionamento
    objectBody.setWorldTransform(transform);

    // Zera as velocidades para o objeto não "chegar voando" na nova posição
    objectBody.setLinearVelocity(new Ammo.btVector3(0, 0, 0));
    objectBody.setAngularVelocity(new Ammo.btVector3(0, 0, 0));
  }
}



export class BumpKinematicMove {
    /**
     *  Configura o corpo rígido para ignorar a gravidade e ser movido manualmente.
     * @param {*} objectBody 
     */
    gravityIgnore(objectBody) {
    const CF_KINEMATIC_OBJECT = 2;
    objectBody.setCollisionFlags(objectBody.getCollisionFlags() | CF_KINEMATIC_OBJECT);
    objectBody.setActivationState(4); // DISABLE_DEACTIVATION
  }
  /**
   *  Configura o corpo rígido para ser afetado pela gravidade novamente.
   * @param {*} objectBody 
   */
  gravityEnable(objectBody) {
    const CF_KINEMATIC_OBJECT = 2;
    objectBody.setCollisionFlags(objectBody.getCollisionFlags() & ~CF_KINEMATIC_OBJECT);
    objectBody.setActivationState(1); // ACTIVE_TAG
  }

}