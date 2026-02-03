import { BumpAmmoFacade } from "../../AmmoInstance/BumpAmmoFacade";

export class BumpRigidBody {
  constructor(transformFac) {
    this.transformFactory = transformFac;
  }

  /**
   *
   * @param {*} pos
   * @param {*} size
   * @param {BumpAmmoFacade} physicLib
   * @param {*} mass
   * @param {*} flag
   * @returns
   */
  create(pos, size, physicLib, mass = 0, flag = null) {
    // Física
    const transform = this.transformFactory.create();
    //transform.setIdentity();
    //  transform.setOrigin(new physicLib.btVector3(pos.x, pos.y, pos.z));
    const motionState = new physicLib.btDefaultMotionState(transform);
    const colShape = new physicLib.btBoxShape(
      physicLib.vector3(size.x / 2, size.y / 2, size.z / 2)
    );
    const rbInfo = new physicLib.createRigidBodyConstructionInfo(
      mass,
      motionState,
      colShape,
      physicLib.vector3(0, 0, 0)
    );
    const body = physicLib.createRigidBody(rbInfo);

    // FLAG MÁGICA: CF_NO_CONTACT_RESPONSE = 4
    // Isso faz o objeto ser um "fantasma" que detecta colisão mas não impede movimento
    if (flag) body.setCollisionFlags(body.getCollisionFlags() | flag);
    return body;
  }
}

export class BumpVector3 {
  constructor(physicLib, x = 0, y = 0, z = 0) {
    this.vector = new physicLib.btVector3(x, y, z);
  }
  get() {
    return this.vector;
  }
}

export class BumpTransformFactory {
  constructor(physicLib, vector3) {
    this.physic = physicLib;
    this.vector3 = vector3;
  }
  create() {
    const transform = new this.physic.btTransform();
    transform.setIdentity();
    transform.setOrigin(this.vector3.get());
    return transform;
  }
}
