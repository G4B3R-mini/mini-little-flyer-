import { IBumpRigidBodyColisionFlags } from "./IBumpRigidBodyColisionFlags";

export class BumpRigidBodyColisionFlagManager {
  /**
   *
   * @param {*} rigidBody
   * @param {IBumpRigidBodyColisionFlags} flag
   */
  setCollisionFlags(rigidBodyCls, flag) {
    const rigidBody = rigidBodyCls.get();
    rigidBody.setCollisionFlags(rigidBody.getCollisionFlags() | flag.value);
  }
}
