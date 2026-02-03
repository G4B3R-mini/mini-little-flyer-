export class BumpRigidBodyFactory {
  /**
   *
   * @param {IBumpObjectRigidBody} objectRigidBody
 
   */
  constructor(objectRigidBody) {
    this.objectRigidBody = objectRigidBody;
  }
  /**
   *
   * @param {BumpPhysicLib} physicLib
   * @param {BumpRigidBodyConstructionInfo} rbInfo
   * @returns {BumpObjectRigidBody}
   */
  create(physicLib, rbInfo) {
    return this.objectRigidBody.create(physicLib, rbInfo);
  }
}
