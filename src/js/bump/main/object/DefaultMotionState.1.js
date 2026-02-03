export class DefaultMotionState {
  constructor() {
    this.motionState = null;
  }
  /**
   *
   * @param {BumpPhysicLib} physicLib
   * @param {BumpTransform} transform
   * @returns {DefaultMotionState} instance
   */
  create(physicLib, transform) {
    const physic = physicLib.get();
    this.motionState = new physic.btDefaultMotionState(
      transform.get()
    );
    return this;
  }
  get() {
    return this.motionState;
  }
}



export class MotionFactory {
  /**
   *
   * @param {DefaultMotionState} instance
   */
  constructor(instance) {
    this.instance = instance;
  }
  /**
   * 
   * @param {*} physicLib 
   * @param {*} transform 
   * @returns {DefaultMotionState}
   */
  create(physicLib, transform) {
    return this.instance.create(physicLib, transform);
  }
}