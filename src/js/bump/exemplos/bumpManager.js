import { BumpPhysicLib } from "../AmmoInstance/BumpAmmoLib";
import { BumpVector3 } from "../BumpVector3";
import {
  IBumpConfig,
  IBumpManager,
  IBumpObject,
  IBumpGhost,
  IBumpGhostLst,
  IBumpRigidBody,
  IBumpRigidBodyLst,
} from "../IBumpManager";
import { BumpTransform } from "../BumpTransform";
import { BumpWorld } from "./world/BumpWorld";

export class BumpManager extends IBumpManager {
  constructor(
    fhysicLib = new BumpPhysicLib(),
    world = new BumpWorld(),
    rigidBodyL = new BumpRigidBodyLst(),
    ghosts = new BumpGhostLst(),
    tmpTransform = new BumpTransform()
  ) {
    super();
    this.physicLib = fhysicLib;
    this.world = world;
    this.rigidBodyL = rigidBodyL;
    this.ghosts = ghosts;
    this.tmpTransform = tmpTransform;
  }
  async loadPhysicLib() {
    await this.physicLib.loadAmmo();
  }
  /**
   *
   * @param {BumpVector3} v
   */
  setGravity(v) {
    this.world.setGravity(this.physicLib, v);
  }
  createBody(size, mass = 0, pos, flag = null) {
    // Física
  }
}

export class BumpConfig extends IBumpConfig {}

export class BumpObject extends IBumpObject {}

export class BumpGhost extends IBumpGhost {}

export class BumpGhostLst extends IBumpGhostLst {}

export class BumpRigidBodyLst extends IBumpRigidBodyLst {
  /**
   *
   * @param {BumpRigidBodyObserver} observer
   */
  constructor(observer) {
    super();
    this.observer = observer;
  }
  /**
   *
   * @param {IBumpRigidBody} rigidBody
   */
  add(rigidBody) {
    if (this.observer) {
      this.observer.observe(rigidBody, rigidBody.mesh);
    }
  }
  notify() {
    if (this.observer) {
      this.observer.notify((rb, mash) => {
        rb.updateMeshFromRigidBody(mash);
      });
    }
  }
}

export class BumpRigidBodyObserver {
  constructor() {
    this.rigidBodies = [];
  }
  observe(rigidBody, mash) {
    this.rigidBodies.push({ rigidBody, mash });
  }

  /**
   *
   * @param {Function} callback
   * @example
   * notify( (rb, mash)=>{ ... })
   */
  notify(callback) {
    for (const { rigidBody, mash } of this.rigidBodies) {
      callback(rigidBody, mash);
    }
  }
}
