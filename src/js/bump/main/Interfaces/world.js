export class IBumpWorld{}


export class IColisionConfig {
  dispatcher = null;
  /**
   * 
   * @param {BumpPhysicLib} physicLib 
   */
  create(physicLib) {
    throw new Error("Method not implemented.");
  }
  get() {
    throw new Error("Method not implemented.");
  }
}


export class IDispatcher {
  dispatcher = null;
  /**
   * 
   * @param {BumpPhysicLib} physicLib 
   * @param {IColisionConfig} colisionConfig 
   */
  create(physicLib, colisionConfig) {
    throw new Error("Method not implemented.");
  }
  get() {
    throw new Error("Method not implemented.");
  }
}