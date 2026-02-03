export class IBumpObjectRigidBody{
  /**
   * 
   * @param {*} physicLib 
   * @param {*} rbInfo 
   * @returns {IBumpObjectRigidBody}
   */
  create(physicLib, rbInfo) {
    throw new Error("Method 'create(physicLib, rbInfo)' must be implemented.");
  }
  get() {
    throw new Error("Method 'get()' must be implemented.");
  }
}


export class BumpObjectRigidBody {
  constructor() {
    this.rigidBody = null;
  }
  create(physicLib, rbInfo) {
        const physic = physicLib.get();
    this.rigidBody = new physic.btRigidBody(rbInfo);
    return this;
  }
  get() {
    return this.rigidBody;
  }
}
