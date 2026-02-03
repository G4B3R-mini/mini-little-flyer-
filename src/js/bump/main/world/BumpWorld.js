import { BumpAmmoFacade } from "../../AmmoInstance/BumpAmmoFacade";
import { BumpPhysicLib } from "../../AmmoInstance/BumpAmmoLib";
import { IBumpWorld } from "../Interfaces/world";

export class BumpWorld extends IBumpWorld {
  /**
   *
   * @param {BumpAmmoFacade} bumpLib
   */
  constructor(bumpLib) {
    super();
    this.bumpLib = bumpLib;
    // Configuração Ammo.js
    const collisionConfiguration =
      bumpLib.world.defaultCollisionConfiguration();
    this.dispatcher = bumpLib.world.collisionDispatcher(collisionConfiguration);
    const overlappingPairCache = bumpLib.world.broadphaseInterface();
    const solver = bumpLib.world.sequentialImpulseConstraintSolver();
    const physicsWorld = bumpLib.world.discreteDynamicsWorld(
      this.dispatcher,
      overlappingPairCache,
      solver,
      collisionConfiguration
    );
    physicsWorld.setGravity(bumpLib.math.vector3(0, -9.8, 0));
    this.physicsWorld = physicsWorld;
    this.rigidBodies = [];
  }

  addRigidBody(body, mesh, mass=0) {
    this.physicsWorld.addRigidBody(body);
    if (mass > 0) this.rigidBodies.push({ body: body, mesh: mesh });
  }
  update(deltaTime) {
    this.physicsWorld.stepSimulation(deltaTime, 10);

    // Atualiza posições visuais
    for (let i = 0; i < this.rigidBodies.length; i++) {
      const obj = this.rigidBodies[i];
      const ms = obj.body.getMotionState();
      if (ms) {
        const transform = this.bumpLib.math.transform();
        ms.getWorldTransform(transform);
        const p = transform.getOrigin();
        const q = transform.getRotation();
        obj.mesh.position.set(p.x(), p.y(), p.z());
        obj.mesh.quaternion.set(q.x(), q.y(), q.z(), q.w());
      }
    }
  }
}
