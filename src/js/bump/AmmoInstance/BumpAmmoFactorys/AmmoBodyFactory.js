import { AmmoFacade } from "../../ammo/facades/AmmoFacade";





export class AmmoRigidBody extends AmmoFacade{
    constructor(ammo) {
        super(ammo);
    }
    get _() {
      return  this.ammo.btRigidBody;
    }
}

export class AmmoBodyFactory {
  constructor(adapter) {
    this.ammo = adapter.ammo;
    this.rigidBodyFacade =new AmmoRigidBody(this.ammo);
  }
  /**
   * Cria um corpo rígido (rigid body) para simulação física
   * @param {Ammo.btRigidBodyConstructionInfo} constructionInfo - Informações de construção do corpo rígido
   * @returns {Ammo.btRigidBody} Corpo rígido do Bullet Physics
   */
  rigidBody(constructionInfo) {
  //  return new this.ammo.btRigidBody(constructionInfo);

    return new this.rigidBodyFacade._(constructionInfo);
  }

  /**
   * Cria um estado de movimento padrão para um corpo rígido
   * @param {Ammo.btTransform} transform - Transformação inicial do objeto
   * @returns {Ammo.btDefaultMotionState} Estado de movimento padrão
   */
  motionState(transform) {
    return new this.ammo.btDefaultMotionState(transform);
  }
   /**
   * Cria informações de construção para um corpo rígido
   * @param {number} mass - Massa do objeto (0 para objetos estáticos)
   * @param {Ammo.btMotionState} motionState - Estado de movimento do objeto
   * @param {Ammo.btCollisionShape} colShape - Forma de colisão do objeto
   * @param {Ammo.btVector3} localInertia - Inércia local do objeto
   * @returns {Ammo.btRigidBodyConstructionInfo} Informações de construção do corpo rígido
   */
  rigidBodyConstructionInfo(mass, motionState, colShape, localInertia) {
    return new this.ammo.btRigidBodyConstructionInfo(
      mass,
      motionState,
      colShape,
      localInertia
    );
  }

}
