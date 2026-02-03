import { IBumpRigidBodyColisionFlags } from "./IBumpRigidBodyColisionFlags";

/**
 * No flag
 */

export class BumpRigidBodyColisionFlagsNone extends IBumpRigidBodyColisionFlags {
  /**
   * @returns {number}
   */
  static get value() {
    return 0;
  }
}
