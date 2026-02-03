import { BumpPhysicLib } from "../AmmoInstance/BumpAmmoLib";
import { BumpVector3 } from "../BumpVector3";

export class BumpGravity {
  /**
   *
   * @param {BumpPhysicLib} physicLib
   * @param {*} physicsWorld
   * @param {BumpVector3} v
   */
  set(physicLib, physicsWorld, v = new BumpVector3(0, -9.81, 0)) {
    const fisics = physicLib.get();
    physicsWorld.setGravity(new fisics.btVector3(v.x, v.y, v.z));
  }
}
