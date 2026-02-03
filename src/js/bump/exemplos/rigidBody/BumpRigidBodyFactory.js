import { BumpObjectRigidBody, IBumpObjectRigidBody } from "./BumpObjectRigidBody";

export class BumpRigidBodyFactory {
  /**
   *
   * @param {IBumpObjectRigidBody} instance
   */
  constructor(instance) {
    this.instance = instance;
  }
  /**
   * 
   * @param {*} physicLib 
   * @param {*} rbInfo 
   * @returns {IBumpObjectRigidBody}
   */
  create(physicLib, rbInfo) {
    return this.instance.create(physicLib, rbInfo.get());
  }
}
