export class BumpAmmoTypes {
  constructor(lib) {
    this.ammo = lib._;
  }

  get Vector3() {
    return this.ammo.btVector3;
  }

  get Transform() {
    return this.ammo.btTransform;
  }

  get RigidBody() {
    return this.ammo.btRigidBody;
  }
}
