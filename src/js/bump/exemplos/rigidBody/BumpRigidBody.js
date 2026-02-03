import { BumpPhysicLib } from "../../AmmoInstance/BumpAmmoLib";
import { BumpShape } from "../../BumpShape";
import { BumpTransform, BumpTransformFactory } from "../../BumpTransform";
import { BumpVector3 } from "../../BumpVector3";
import { IBumpRigidBody } from "../../IBumpManager";
import { BumpPhysicVector3 } from "../../main/object/BumpPhysicVector3.1";
import {
  DefaultMotionState,
  MotionFactory,
} from "../../main/object/DefaultMotionState.1";
import { BumpMass } from "./BumpMass";
import {
  BumpObjectRigidBody,
  IBumpObjectRigidBody,
} from "./BumpObjectRigidBody";
import { BumpRigidBodyConstructionInfo } from "./BumpRigidBodyConstructionInfo.1";
import { BumpRigidBodyFactory } from "./BumpRigidBodyFactory";
import { BumpRigidBodyInfoFactory } from "./BumpRigidBodyInfoFactory";
import { BumpRigidBodyColisionFlagManager } from "./flags/BumpRigidBodyColisionFlagManager";
import { IBumpRigidBodyColisionFlags } from "./flags/IBumpRigidBodyColisionFlags";
import { TransformFactory } from "./TransformFactory";

export class BumpRigidBody extends IBumpRigidBody {
  /**
   *
   * @param {BumpPhysicLib} physicLib
   * @param {BumpRigidBodyColisionFlagManager} flagManager
   * @param {*} mesh
   * @param {BumpShape} shape
   * @param {MotionFactory} motionStateFactory
   * @param {BumpMass} mass
   * @param {TransformFactory} transformFactory
   * @param {BumpBodyManager} bodyManager
   * @param {BumpPhysicVector3} vector3
   */
  constructor(
    physicLib,
    flagManager,
    mesh,
    shape,
    motionStateFactory,
    mass = new BumpMass(0),
    transformFactory,
    bodyManager,
    vector3 = new BumpPhysicVector3()
  ) {
    super();
    this.bodyManager = bodyManager;
    this.flagManager = flagManager;
    this.body = this.create(
      physicLib,

      mesh,
      shape,
      mass,
      transformFactory,
      motionStateFactory,
      bodyManager,
      vector3
    );
  }
  /**
   *
   * @param {BumpPhysicLib} physicLib
   * @param {*} mesh
   * @param {BumpShape} shape
   * @param {BumpMass} mass
   * @param {BumpTransform} transform
   * @param {MotionFactory} motionStateFactory
   * @param {BumpBodyManager} bodyManager
   * @param {BumpPhysicVector3} vector3
   * @returns {BumpObjectRigidBody}
   */
  create(
    physicLib,
    mesh,
    shape,
    mass,
    transformFactory,
    motionStateFactory,
    bodyManager,
    vector3 = new BumpPhysicVector3()
  ) {
    shape.create(physicLib);
    const transform = transformFactory.create(mesh, physicLib);
    const localInertia = vector3.create(physicLib, new BumpVector3(0, 0, 0));

    InertiaClaculator.calculate(mass, shape, localInertia);
    const motionState = motionStateFactory.create(physicLib, transform);
    return bodyManager.create(
      physicLib,
      mass,
      shape,
      localInertia,
      transform,
      motionState
    );
  }

  setColisionFlags(flag) {
    this.flagManager.setCollisionFlags(this.body, flag);
  }
}

export class BumpBodyManager {
  /**
   *
   * @param {BumpRigidBodyFactory} bodyFactory
   * @param {BumpRigidBodyInfoFactory} rbInfoFactory
   */
  constructor(bodyFactory, rbInfoFactory) {
    this.bodyFactory = bodyFactory;
    this.rbInfoFactory = rbInfoFactory;
  }
  /**
   *
   * @param {*} physicLib
   * @param {*} mass
   * @param {*} shape
   * @param {*} localInertia
   * @param {*} transform
   * @param {*} motionState
   * @returns {IBumpObjectRigidBody}
   */
  create(physicLib, mass, shape, localInertia, transform, motionState) {
    const brInfo = this.rbInfoFactory.create(
      physicLib,
      mass,
      shape,
      localInertia,
      transform,
      motionState
    );
    return this.bodyFactory.create(physicLib, brInfo);
  }
  /**
   *
   * @param {*} rigidBody
   * @param {} flag
   */
  setColisionFlags(rigidBody, flag) {
    rigidBody.setCollisionFlags(rigidBody.getCollisionFlags() | flag);
  }
}

export class InertiaClaculator {
  /**
   *
   * @param {BumpMass} mass
   * @param {*} shape
   * @param {*} localInertia
   * @returns
   */
  static calculate(mass, shape, localInertia) {
    mass.calculateLocalInertia(shape.get(), localInertia);
  }
}
