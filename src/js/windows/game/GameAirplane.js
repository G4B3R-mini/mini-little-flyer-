import { AirplanePlugin } from "../../world/Airplane/Airplane";
import { IEngineAirplanePosition, Vector3 } from "../../world/Airplane/contract/IEngineAirplanePosition";

import {
  EngineAirplane,

} from "../../world/Airplane/EngineAirplane";
import { CartoonPlaneModel } from "../../world/Airplane/Model";
import { GameAirplaneAnimation } from "./GameAirplaneAnimation";
import * as THREE from "three";

export class GameAirplanePlugin extends AirplanePlugin {
  constructor(manager = new GameAirplane(new CartoonPlaneModel())) {
    super(manager);
    this.manager = manager;

    this.manager.create();
  }

  update(delta,camera) {
    this.manager.update(delta,camera)
    super.update(delta,camera);
  }
  keyDOWN(key) {
    this.manager.keyDOWN(key);
  }
  keyUP(key) {
    this.manager.keyUP(key);
  }
}

export class GameAirplane extends EngineAirplane {
  constructor(
    model = new CartoonPlaneModel(),
    animation = new GameAirplaneAnimation(),
    airplanePosition = new GameAirplanePosition(),
    airplaneCamera = new AirplaneCamera()
  ) {
    super(model, animation, airplanePosition);
    this.airplaneCamera = airplaneCamera;
  }
  create() {
    super.create();
    this.setPosition();
  }
/**
 * 
 * @returns {THREE.Vector3}
 */
  getPosition() {
    return this.model.get().position;
  }
  getRotation() {
    return this.model.get().rotation;
  }
  update(delta, camera) {
if(camera)   this.airplaneCamera.update(this.model.get(),camera)
    super.update(delta, camera);
  }

    keyDOWN(key) {
    this.animation.keyDOWN(key);
  }
  keyUP(key) {
    this.animation.keyUP(key);
  }
}


export class AirplaneCamera {
  update(airplane, camera) {

 const relativeCameraOffset = new THREE.Vector3(0, 4, -3);
 
    const cameraOffset = relativeCameraOffset
      .applyMatrix4(airplane.matrixWorld);

    camera.position.lerp(cameraOffset, 0.1);
    camera.lookAt(airplane.position);
  }
}

export class GameAirplanePosition extends IEngineAirplanePosition {

  set(model, vec= new  Vector3(5, -1.3, 4), ) {
    const airplane = model.get();
  //  airplane.rotation.x = Math.PI / 10;
    airplane.rotation.y = Math.PI;
       airplane.rotation.x = 7 * (Math.PI / 180);
    airplane.castShadow = true;
    airplane.position.z = 4;
    airplane.position.y = 0;
  }
}
