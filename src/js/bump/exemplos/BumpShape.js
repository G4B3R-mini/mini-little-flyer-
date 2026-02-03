import { BumpPhysicLib } from "./AmmoInstance/BumpAmmoLib";
import { BumpVector3 } from "./BumpVector3";
import { IBumpShape } from "./IBumpManager";
import { BumpPhysicVector3 } from "./main/object/BumpPhysicVector3.1";

export class BumpShape extends IBumpShape {
  /**
   *
   * @param {BumpShapeManager} shapeManager
   */
  constructor(shapeManager, vec) {
    super();
    this.shape = shapeManager;
    this.mash = null;
    this.vec = vec;
  }
  /**
   *
   * @param {BumpPhysicLib} physicLib
   * @param {BumpPhysicVector3} vec
   */
  create(physicLib, vec = new BumpPhysicVector3(new BumpVector3(5, 0.5, 5))) {
    this.shape.create(physicLib, this.vec);
  }
  get() {
    return this.shape.get();
  }
}

export class BumpShapeManager {
  /**
   *
   * @param {BumpShapeObject} shapeObject
   */
  constructor(shapeObject) {
    this.shape = shapeObject;
  }
  /**
   *
   * @param {BumpPhysicLib} physicLib
   * @param {BumpPhysicVector3} vec
   */
  create(physicLib, vec = new BumpPhysicVector3(new BumpVector3(5, 0.5, 5))) {
    this.shape.create(physicLib, vec.create(physicLib));
  }
  get() {
    return this.shape.get();
  }
}

export class BumpShapeObject {
  constructor() {
    this.shape = null;
  }
  /**
   *
   * @param {BumpPhysicLib} physicLib
   * @param {BumpPhysicVector3} physicVector3
   */
  create(physicLib, physicVector3) {
    const physic = physicLib.get();
    this.shape = new physic.btBoxShape(physicVector3);
  }
  get() {
    return this.shape;
  }
}
