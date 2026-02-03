import { BumpShape } from "./BumpShape";

export class BumpShapeBox extends BumpShape {
  constructor(physicLib, sx = 1, sy = 1, sz = 1) {
    super();
    this.physicLib = physicLib;
    this.sx = sx;
    this.sy = sy;
    this.sz = sz;
    this.shape = new this.physicLib.Ammo.btBoxShape(
      new this.physicLib.Ammo.btVector3(sx / 2, sy / 2, sz / 2)
    );
  }
}
