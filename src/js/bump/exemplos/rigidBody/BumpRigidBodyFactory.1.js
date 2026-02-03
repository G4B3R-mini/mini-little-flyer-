import { BumpTransform } from "../../BumpTransform";
import { BumpRigidBody } from "./BumpRigidBody";

export class BumpRigidBodyFactory {
  /**
   *
   * @param {BumpPhysicLib} physicLib
   * @param {*} mesh
   * @param {*} shape
   * @param {number} mass
   * @param {BumpTransform} transform
   * @returns {BumpRigidBody}
   */
  static create(
    physicLib,
    mesh,
    shape,
    mass = 0,
    transform = new BumpTransform()
  ) {
    return new BumpRigidBody(physicLib, mesh, shape, mass, transform);
  }
}
