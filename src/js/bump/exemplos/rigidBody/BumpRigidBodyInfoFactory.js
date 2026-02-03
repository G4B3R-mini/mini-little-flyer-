import { BumpPhysicLib } from "../../AmmoInstance/BumpAmmoLib";
import { BumpTransform } from "../../BumpTransform";
import { BumpPhysicVector3 } from "../../main/object/BumpPhysicVector3.1";
import { BumpMass } from "./BumpMass";
import { IBumpRigidBodyConstructionInfo } from "./IBumpRigidBodyConstructionInfo";

export class BumpRigidBodyInfoFactory {
  /**
   *
   * @param {IBumpRigidBodyConstructionInfo} instance
   */
  constructor(instance) {
    this.instance = instance;
  }
  /**
   *
   * @param {BumpPhysicLib} physicLib
   * @param {BumpMass} mass
   * @param {*} shape
   * @param {BumpPhysicVector3} localInertia
   * @param {BumpTransform} transform
   * @returns {IBumpRigidBodyConstructionInfo}
   */
  create(physicLib, mass, shape, localInertia, transform, motionState) {
    return this.instance.create(
      physicLib,
      mass,
      shape,
      localInertia,
      transform,
      motionState
    );
  }
}
