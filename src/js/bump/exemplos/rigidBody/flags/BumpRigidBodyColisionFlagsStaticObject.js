import { IBumpRigidBodyColisionFlags } from "./IBumpRigidBodyColisionFlags";

/**
 * Static object flag
 */

export class BumpRigidBodyColisionFlagsStaticObject extends IBumpRigidBodyColisionFlags {
  /**
   * @returns {number}
   */
  static get value() {
    return 1;
  }
}
