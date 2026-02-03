import { BumpPhysicLib } from "./AmmoInstance/BumpAmmoLib";
import { BumpVector3 } from "./BumpVector3";

/*
export class BumpTransform {
  tmpTransform = null;


  create(physicLib) {
    const physic = physicLib.get();
    this.tmpTransform = new physic.btTransform();

    return this;
  }
  get() {
    return this.tmpTransform;
  }
  getRotation() {
    return this.tmpTransform.getRotation();
  }
  getOrigin() {
    return this.tmpTransform.getOrigin();
  }
  setIdentity() {
    this.tmpTransform.setIdentity();
  }

  setOrigin(v = new BumpVector3(0, 0, 0), physicLib) {
    const physic = physicLib.get();
    this.tmpTransform.setOrigin(new physic.btVector3(v.x, v.y, v.z));
  }
}
*/

export class BumpTransform {
  #transform;

  constructor(btTransform) {
    this.#transform = btTransform;
  }

  get() {
    return this.#transform;
  }

  getRotation() {
    return this.#transform.getRotation();
  }

  getOrigin() {
    return this.#transform.getOrigin();
  }

  setIdentity() {
    this.#transform.setIdentity();
  }

  setOrigin(vector3) {
    this.#transform.setOrigin(vector3);
  }
}
export class BumpTransformFactory {
  constructor(physic) {
    this.physic = physic.get();
  }

  create(mesh) {
    const transform = new this.physic.btTransform();
    transform.setIdentity();

    transform.setOrigin(
      new this.physic.btVector3(
        mesh.position.x,
        mesh.position.y,
        mesh.position.z
      )
    );
    return new BumpTransform(transform);
  }
}
