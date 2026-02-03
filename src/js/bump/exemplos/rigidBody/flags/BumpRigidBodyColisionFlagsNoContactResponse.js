import { IBumpRigidBodyColisionFlags } from "./IBumpRigidBodyColisionFlags";

/**
 * No contact response flag
 */

export class BumpRigidBodyColisionFlagsNoContactResponse extends IBumpRigidBodyColisionFlags {
  /**
   * @returns {number}
   */
  static get value() {
    return 4;
  }
}
