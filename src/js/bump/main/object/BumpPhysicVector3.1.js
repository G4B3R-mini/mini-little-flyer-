import { BumpVector3 } from "../BumpVector3";

export class BumpPhysicVector3 {
  /**
   * 
   * @param {BumpVector3 | null} vec 
   */
  constructor(vec) {
    this.vector = null;
    this.vec=vec
  }
  /**
   *
   * @param {BumpPhysicLib} physicLib
   * @param {BumpVector3 |  null} vec
   * @returns {any}
   */
  create(physicLib, vec = new BumpVector3(0, 0, 0)) {
    if (!vec) vec = this.vec
    
            const physic = physicLib.get();
    this.vector =  new physic.btVector3(vec.x, vec.y, vec.z);

    return this;
 
  }
  get() {
    return this.vector;
  }
}
