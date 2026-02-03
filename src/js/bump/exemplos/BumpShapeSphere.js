import { BumpShape } from "./BumpShape";

export class BumpShapeSphere extends BumpShape {
  constructor(physicLib, radius = 1) {
    super();
    this.physicLib = physicLib;
    this.radius = radius;
    this.shape = new this.physicLib.Ammo.btSphereShape(radius);
  }
}
