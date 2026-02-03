import { BumpShape } from "../../BumpShape";
import { DefaultMotionState } from "../../main/object/DefaultMotionState.1";

export class BumpRigidBodyConstructionInfo {
  constructor() {
    this.rbInfo = null;
  }
  /**
   *
   * @param {*} physicLib
   * @param {*} mass
   * @param {BumpShape} shape
   * @param {*} localInertia
   * @param {*} transform
   * @returns {BumpRigidBodyConstructionInfo}
   */
  create(physicLib, mass = 0, shape, localInertia, transform, motionState) {
    const physic = physicLib.get();
    this.rbInfo = new physic.btRigidBodyConstructionInfo(
      mass,
      motionState.create(physicLib, transform).get(),
      shape.get(),
      localInertia.get()
    );
    return this;
  }
  get() {
    return this.rbInfo;
  }
}
