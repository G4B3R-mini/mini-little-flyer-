import { BumpRigidBodyColisionFlagsNoContactResponse } from "./BumpRigidBodyColisionFlagsNoContactResponse";
import { BumpRigidBodyColisionFlagsNone } from "./BumpRigidBodyColisionFlagsNone";
import { BumpRigidBodyColisionFlagsStaticObject } from "./BumpRigidBodyColisionFlagsStaticObject";
import { IBumpRigidBodyColisionFlags } from "./IBumpRigidBodyColisionFlags";

export class BumpRigidBodyColisionFlags {
  /**
   * @returns {IBumpRigidBodyColisionFlags}
   */
  static get CF_NO_CONTACT_RESPONSE() {
    return BumpRigidBodyColisionFlagsNoContactResponse;
  }

  /**
   * @returns {IBumpRigidBodyColisionFlags}
   */
  static get CF_NONE() {
    return BumpRigidBodyColisionFlagsNone;
  }

  /**
   * @returns {IBumpRigidBodyColisionFlags}
   */
  static get CF_STATIC_OBJECT() {
    return BumpRigidBodyColisionFlagsStaticObject;
  }
}
