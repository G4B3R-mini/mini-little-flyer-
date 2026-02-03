import { EventResize, EventsManager } from "../src/js/events/eventsManager.js";
import { GameAirplanePlugin } from "../src/js/windows/game/GameAirplane.js";
import { Game } from "../src/js/windows/game/Game.js";

import { CloudPlugin } from "../src/js/windows/Lobby/cloud.js";
import { StarsPlugin } from "../src/js/windows/Lobby/StarPositions.js";

import { GameCamera } from "../src/js/windows/ScreenThrejs/GameCamera.js";

import { GameScene } from "../src/js/windows/ScreenThrejs/GameScene.js";
import { GameRendererParmClock } from "../src/js/windows/ScreenThrejs/ParmClock.js";
import { GameScreen } from "../src/js/windows/ScreenThrejs/ScreenThreejsGame.js";
import {
  GameTrackManager,
  GameTrackPlugin,
} from "../src/js/windows/game/GameTrack.js";

import { BumpPhysicLib } from "../src/js/bump//AmmoInstance/BumpAmmoLib";
import { BumpAmmoFacade } from "../src/js/bump/AmmoInstance/BumpAmmoFacade.js";
import { BumpWorld } from "../src/js/bump/main/world/BumpWorld.js";
import { IPlugin } from "../src/js/windows/ScreenThrejs/IPlugin.js";
import * as THREE from "three";
import { BumpAmmoTypes } from "../src/js/bump/AmmoInstance/BumpAmmoTypes.js";
import { BumpObjectMove } from "../src/js/bump/move/BumpObjectMove.js";
const AmmoLib = new BumpPhysicLib();
await AmmoLib.load();
const BumpLib = new BumpAmmoFacade(AmmoLib);
const bumpWorld = new BumpWorld(BumpLib);
const bumpTypes = new BumpAmmoTypes(AmmoLib);

const KEY = {
  W: 87,
  S: 83,
  A: 65,
  D: 68,
  Q: 81,
  C: 67,
};

const COLLISION_FLAGS = {
  NO_CONTACT_RESPONSE: 4,
};

const PHYSICS = {
  DISABLE_DEACTIVATION: 4,
};

const father = "screens";
const eventsManager = new EventsManager();
eventsManager.create();

const camera = new GameCamera();

const game_Screen = new Game(
  new GameScreen("game-screen", father),
  new GameScene(),
  new GameRendererParmClock(),
  camera,
);
const airplanePlugin = new GameAirplanePlugin();
const track = new GameTrackPlugin();
camera.camera.setLookAt(airplanePlugin.manager.getPosition());

const initPos = airplanePlugin.manager.getPosition().clone();
initPos.y += 1;
const initRot = airplanePlugin.manager.getRotation().clone();
const initQuat = airplanePlugin.manager.get().quaternion.clone();

game_Screen.create();
game_Screen.appendTo();
game_Screen.animate();
//game_Screen.appendPlugin(new CubePlugin());
game_Screen.appendPlugin(track);
game_Screen.appendPlugin(airplanePlugin);
game_Screen.appendPlugin(new CloudPlugin());
game_Screen.appendPlugin(new StarsPlugin());


/*
eventsManager.subscribe(
  new EventKeydown((v) => {
    console.log("Notifying observers of event:", v);
    airplanePlugin.keyDOWN(v.key);
  })
);
eventsManager.subscribe(
  new EventKeyUp((v) => {
    console.log("Notifying observers of event:", v);
    airplanePlugin.keyUP(v.key);
  })
);*/

/**
 * @class PhysicContext
 */
class PhysicContext {
  /**
   *
   * @param {BumpAmmoFacade} BumpLib
   * @param {BumpWorld} bumpWorld
   * @param {BumpAmmoTypes} bumpTypes
   */
  constructor(BumpLib, bumpWorld, bumpTypes) {
    this.BumpLib = BumpLib;

    this.bumpWorld = bumpWorld;
    this.bumpTypes = bumpTypes;
  }
}

class BumpColumnSensor {
  constructor(body, mash) {
    this.body = body;
    this.mash = mash;
  }
}

class ColumnSensores extends Array {
  constructor() {
    super();
  }

  push(body, mash) {
    const sensor = new BumpColumnSensor(body, mash);
    super.push(sensor);
  }
}

class GameEnginePlay {
  sensorBody = null;
  /**
   *
   * @param {GameTrackManager} manager
   * @param {object} settings
   * @param {PhysicContext} context
   */
  constructor(
    manager,
    context,
    settings = {
      columns: { opacity: 0, onColor: 0x00ff00, offColor: 0xff0000, count: 15 },
    },
  ) {
    this.columns = manager.columnEventManager;
    this.pista = manager.runwayFactory.runway;
    this.settings = settings;
    this.airplaneDistPercorerido = [];
    this.context = context;
    this.sensoresBodyItems = this.columnSensores(manager.columnEventManager);
  }
  airplaneBody(airplaneMesh) {
    const pos = airplaneMesh.position;
    const size = new THREE.Vector3(1, 1, 3);
    console.log(this.context.BumpLib.math.vector3(1, 2, 3));
    const transform = PhysicUtils.setInitPosition(
      airplaneMesh,
      pos,
      this.context.BumpLib,
    );
    const motionState = this.context.BumpLib.body.motionState(transform);
    const colShape = this.context.BumpLib.shape.boxShape(
      this.context.BumpLib.math.vector3(size.x / 2, size.y / 2, size.z / 2),
    );
    const localInertia = this.context.BumpLib.math.vector3(0, 0, 0);
    const mass = 1;
    colShape.calculateLocalInertia(mass, localInertia);
    const rbInfo = this.context.BumpLib.body.rigidBodyConstructionInfo(
      mass,
      motionState,
      colShape,
      localInertia,
    );
    const body = this.context.BumpLib.body.rigidBody(rbInfo);
    this.context.bumpWorld.addRigidBody(body, airplaneMesh, mass);
    return body;
  }
  columnSensores(columns) {
    /**
     * @childs {BumpColumnSensoe[]}
     */
    const columnSensores = new ColumnSensores();
    let sid = columns.lines.length;
    const size = new THREE.Vector3(0.3, 1.5, 1.5);
    const colShape =this.context.BumpLib.shape.boxShape(
      this.context.BumpLib.math.vector3(size.x / 2, size.y / 2, size.z / 2),
    );
    for (let itv of columns.lines) {
      itv.get().SID = sid;
      this.airplaneDistPercorerido[sid] = false;
      sid--;

      // if (columns.lines[columns.lines.length - 1].get() !== itv)

      itv = itv.get();
      const pos = itv.position;

      itv.material.opacity = 0.2;
      itv.material.color.set(0xff0000);

      const transform = this.context.BumpLib.math.transform();
      transform.setIdentity();
      transform.setOrigin(this.context.BumpLib.math.vector3(pos.x, pos.y, pos.z));
      const motionState = this.context.BumpLib.body.motionState(transform);

      const rbInfo = this.context.BumpLib.body.rigidBodyConstructionInfo(
        0,
        motionState,
        colShape,
        this.context.BumpLib.math.vector3(0, 0, 0),
      );
      const body = this.context.BumpLib.body.rigidBody(rbInfo);
      // FLAG MÁGICA: CF_NO_CONTACT_RESPONSE = 4
      // Isso faz o objeto ser um "fantasma" que detecta colisão mas não impede movimento
      body.setCollisionFlags(body.getCollisionFlags() | 4);
      columnSensores.push(body, itv);
     this.context.bumpWorld.addRigidBody(body, itv, 0);
    }
    return columnSensores;
  }
  sensoresUpdate(BumpLib, bumpWorld, callback = (Sid) => {}) {
    let numManifolds =   this.context.bumpWorld.dispatcher.getNumManifolds();
    for (let i = 0; i < numManifolds; i++) {
      let manifold =   this.context.bumpWorld.dispatcher.getManifoldByIndexInternal(i);
      let rb0 = this.context.BumpLib.utils.castObject(
        manifold.getBody0(),
        bumpTypes.RigidBody,
      );
      let rb1 = this.context.BumpLib.utils.castObject(
        manifold.getBody1(),
        bumpTypes.RigidBody,
      );
      for (const sensorItem of this.sensoresBodyItems) {
        if (rb0 === sensorItem.body || rb1 === sensorItem.body) {
          if (manifold.getNumContacts() > 0) {
            sensorItem.mash.material.color.set(0x00ff00);
            // trocar settimeout por timestamp: start  - end == 2000
            setTimeout(() => {
              this.airplaneDistPercorerido[sensorItem.mash.SID] = false;
              sensorItem.mash.material.color.set(0xff0000);
            }, 3000);
            if (this.airplaneDistPercorerido[sensorItem.mash.SID] != true) {
              callback(sensorItem.mash.SID);
            }
            this.airplaneDistPercorerido[sensorItem.mash.SID] = true;
          }
        }
      }
    }
  }
  pistaBody(pistaMesh) {
    const pos = pistaMesh.position;
    const size = new THREE.Vector3(3, 0.2, 35);

    const transform = this.context.BumpLib.math.transform();
    transform.setIdentity();
    transform.setOrigin(this.context.BumpLib.math.vector3(pos.x, pos.y, pos.z));
    const motionState = this.context.BumpLib.body.motionState(transform);
    const colShape = this.context.BumpLib.shape.boxShape(
      this.context.BumpLib.math.vector3(size.x / 2, size.y / 2, size.z / 2),
    );
    const rbInfo = this.context.BumpLib.body.rigidBodyConstructionInfo(
      0,
      motionState,
      colShape,
      this.context.BumpLib.math.vector3(0, 0, 0),
    );
    const body = this.context.BumpLib.body.rigidBody(rbInfo);
   this.context.bumpWorld.addRigidBody(body, pistaMesh, 0);
    return body;
  }
}
const context = new PhysicContext(BumpLib, bumpWorld, bumpTypes);
const gameEnginePlay = new GameEnginePlay(track.manager, context);
const columns = track.manager.columnEventManager;
const pista = track.manager.runwayFactory.runway;

// FLAG MÁGICA: CF_NO_CONTACT_RESPONSE = 4
// Isso faz o objeto ser um "fantasma" que detecta colisão mas não impede movimento
//body.setCollisionFlags(body.getCollisionFlags() | 4);

//bumpWorld.addRigidBody(body, itv, 0);
//sensorBody = body; // Referência para checagem posterior



export class PhysicUtils {
  static defaultRoatation(quat, transform, BumpLib) {
    // 2. Define a Rotação (Crucial para não resetar)
    transform.setRotation(
      BumpLib.math.quaternion(quat.x, quat.y, quat.z, quat.w),
    );
  }
  /**
   *
   * @param {*} airplaneMesh
   * @param {*} pos
   * @param {PhysicContext} context
   * @returns
   */
  static setInitPosition(airplaneMesh, pos, BumpLib) {
    const transform = BumpLib.math.transform();
    transform.setIdentity();
    transform.setOrigin(BumpLib.math.vector3(pos.x, pos.y, pos.z));
    const quat = airplaneMesh.quaternion;
    PhysicUtils.defaultRoatation(quat, transform, BumpLib);
    return transform;
  }
}

const airplaneMesh = airplanePlugin.manager.get();
let airplaneBody = gameEnginePlay.airplaneBody(airplaneMesh, context);

let pistaShape = gameEnginePlay.pistaBody(pista.get());

class GameBumpPhysicPlugin extends IPlugin {
  constructor(bumpWorld, airplaneMove, gameEnginePlay) {
    super({});
    this.bumpWorld = bumpWorld;
    this.airplaneMove = airplaneMove;
    this.gameEnginePlay = gameEnginePlay;
  }

  update(delta) {
    //

    this.bumpWorld.update(delta);
    this.airplaneMove.update(delta);
    this.gameEnginePlay.sensoresUpdate(BumpLib, bumpWorld, (Sid) => {
      this.airplaneMove.updateTimeMovement(Sid);
    });
  }
}

let ballObject = null;
let moveDirection = {
  left: 0,
  right: 0,
  forward: 0,
  back: 0,
  up: 0,
  down: 0,
  fly_forward: 0,
};
const STATE = { DISABLE_DEACTIVATION: 4 };
function setupEventHandlers() {
  window.addEventListener("keydown", handleKeyDown, false);
  window.addEventListener("keyup", handleKeyUp, false);
}

const moveVector = BumpLib.math.vector3(0, 0, 0);

function handleKey(event, isKeyDown = 0) {
  let keyCode = event.keyCode;

  switch (keyCode) {
    case KEY.W: //W: FORWARD
      moveDirection.forward = isKeyDown;

      break;

    case KEY.S: //S: BACK
      moveDirection.back = isKeyDown;
      break;

    case KEY.A: //A: LEFT
      moveDirection.left = isKeyDown;
      break;

    case KEY.D: //D: RIGHT
      moveDirection.right = isKeyDown;
      break;
    case KEY.Q: //Q: UP
      moveDirection.fly_forward = isKeyDown;
      break;
  }
}

function handleKeyDown(event) {
  handleKey(event, 1);
}

function handleKeyUp(event) {
  handleKey(event, 0);
  if (event.keyCode === 67) {
    //C: TOGGLE MOTOR
    if (motor.isCombustivel) motor.ligado = !motor.ligado;
  }
}
setupEventHandlers();
let forward = null;
const motor = { ligado: false, isCombustivel: true };
// ==============================================================================
//  ======================================================================================
export class AirplaneMove {
  constructor(airplaneBody, moveDirection, motor, moveVector) {
    this.airplaneBody = airplaneBody;
    this.moveDirection = moveDirection;
    this.motor = motor;
    this.moveVector = moveVector;
    this.speed = 8;
    this.forward = null;
    this.done = false;
    this.times = {};
  }
  update(delta) {
    if (!this.done) this.updateFromHangar(delta);
    else this.flyUpdate(delta);
    this.caindo();
  }
  updateTimeMovement(SID) {
    if (!this.times[SID]) {
      this.times[SID] = Date.now();
      console.log(this.times);
    }
    if (SID === columns.lines.length - 1) {
      const startTime = this.times[2];
      console.log("startTime", startTime);
      console.log("endTime", this.times[SID]);
      const endTime = this.times[SID - 1];
      const totalTime = (endTime - startTime) / 1000; // em segundos
      console.log(`Tempo total para percorrer a pista: ${totalTime} segundos`);
      if (!this.done && totalTime > 0 && totalTime < 2.51) {
        this.done = true;
      }

      this.times = {};
    }
  }

  flyUpdate(delta) {
    console.log("Flying...");
    // Lógica de voo aqui
    let transform = this.airplaneBody.getWorldTransform();
    let quaternion = transform.getRotation();
    if (this.moveDirection.forward && this.motor.ligado) {
      //this.moveVector.setValue(0, 0, -this.speed); // 9.8 forca contraria a gravidade
      this.moveVector.setY(-this.speed);
      this.forward = this.getForwardVector({
        quat: quaternion,
        vecY: 1,
        vecZ: 1,
      });
    } else if (this.moveDirection.back && this.motor.ligado) {
      this.moveVector.setY(this.speed);
      this.forward = this.getForwardVector({ quat: quaternion, vecY: -1 });
    } else {
      this.moveVector.setY(0);
      this.forward = new THREE.Vector3(0, 0, 0);
    }

    this.aplyVelocity();
  }
  aplyVelocity() {
    if (
      (this.moveDirection.forward || this.moveDirection.back) &&
      this.motor.ligado
    ) {
      // 1. Pegue a rotação atual do avião (Quaternion)
      /*
      let transform = airplaneBody.getWorldTransform();
      let quaternion = transform.getRotation();
*/

      // 2. Calcule a direção "FRENTE" baseada na rotação
      // (Exemplo simplificado: transformando um vetor 0,0,1 pela rotação do avião)

      // 3. Defina a velocidade na direção que ele aponta
      let speed = 20;
      let velocity = BumpLib.math.vector3(
        this.forward.x * speed,
        this.forward.y,
        this.forward.z * this.speed,
      );
      this.airplaneBody.setLinearVelocity(velocity);
      // Importante: Se o corpo estiver "dormindo" (parado), você precisa acordá-lo
      this.airplaneBody.activate();
    }
  }
  caindo() {
    if (airplaneMesh.position.y < -10) {
      motor.ligado = false;
      motor.isCombustivel = false;
      const Ammo = AmmoLib._;
      // Teleporta de volta para a posição inicial
      // window.location.reload(); // gambiarra para resetar a fisica

      let ntransform = airplaneBody.getWorldTransform();
      let nPosition = initPos.clone();

      const position = BumpLib.math.vector3(
        nPosition.x,
        nPosition.y,
        nPosition.z,
      );

      BumpObjectMove.teleportBody(Ammo, airplaneBody, position, ntransform);

      airplaneBody.setActivationState(4); // DISABLE_DEACTIVATION
      // trocar por timestamp ------------------------------------------------------------------------------------------------------
      setTimeout(() => {
        const fakeMash = {
          quaternion: initQuat,
          position: initPos,
        };
        const initTransform = PhysicUtils.setInitPosition(
          fakeMash,
          initPos,
          BumpLib,
        );
        airplaneBody.setWorldTransform(initTransform);
        airplaneBody.getMotionState().setWorldTransform(initTransform);

        // Sincronize o mesh visual com o corpo físico
        const origin = initTransform.getOrigin();
        const rotation = initTransform.getRotation();
        airplaneMesh.position.set(origin.x(), origin.y(), origin.z());
        airplaneMesh.quaternion.set(
          rotation.x(),
          rotation.y(),
          rotation.z(),
          rotation.w(),
        );

        // Supondo que airplaneBody é seu rigidBody
        let transform = airplaneBody.getWorldTransform();
        let logorigin = transform.getOrigin();
        let pos = {
          x: logorigin.x(),
          y: logorigin.y(),
          z: logorigin.z(),
        };
        //console.log(airplaneBody.getCollisionFlags() ) // 0
        motor.isCombustivel = true;
      }, 400);
      // add timestemp to done
      this.done = false;
    }
  }
  updateFromHangar(delta) {
    //  console.log("moveDirection", airplanePlugin.manager.get().position);
    // 1. Pegue a rotação atual do avião (Quaternion)
    let transform = this.airplaneBody.getWorldTransform();
    let quaternion = transform.getRotation();
    if (this.moveDirection.forward && this.motor.ligado) {
      //this.moveVector.setValue(0, 0, -this.speed); // 9.8 forca contraria a gravidade
      this.moveVector.setY(-this.speed);
      this.forward = this.getForwardVector({ quat: quaternion, vecZ: 1 });
    } else if (this.moveDirection.back && this.motor.ligado) {
      this.moveVector.setY(this.speed);
      this.forward = this.getForwardVector({ quat: quaternion, vecZ: -1 });
    } else {
      this.moveVector.setY(0);
      this.forward = new THREE.Vector3(0, 0, 0);
    }
    // Aplica a velocidade ao corpo
    this.aplyVelocity();
  }
  getForwardVector({ quat, vecX = 0, vecY = 0, vecZ = -1 }) {
    return new THREE.Vector3(vecX, vecY, vecZ).applyQuaternion(
      new THREE.Quaternion(quat.x(), quat.y(), quat.z(), quat.w()),
    );
  }
}
const airplaneMove = new AirplaneMove(
  airplaneBody,
  moveDirection,
  motor,
  moveVector,
);
const bumpPlugin = new GameBumpPhysicPlugin(
  bumpWorld,
  airplaneMove,
  gameEnginePlay,
);
game_Screen.appendPlugin(bumpPlugin);
/*
eventsManager.subscribe(
  new EventKeydown((v) => {
    console.log("Notifying observers of event:", v);
    airplaneMove.keyDOWN(v.key);
  })
);
eventsManager.subscribe(
  new EventKeyUp((v) => {
    console.log("Notifying observers of event:", v);
    airplaneMove.keyUP(v.key);
  })
);
*/
