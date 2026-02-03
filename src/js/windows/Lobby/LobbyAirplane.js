import { Airplane, AirplanePlugin } from "../../world/Airplane/Airplane";
import { AirplaneAnimation } from "../../world/Airplane/animate/AirplaneAnimation";
import { IEngineAirplanePosition } from "../../world/Airplane/contract/IEngineAirplanePosition";
import {  EngineAirplane } from "../../world/Airplane/EngineAirplane";
import { CartoonPlaneModel } from "../../world/Airplane/Model";

export class LobbyAirplanePlugin extends AirplanePlugin {
  constructor(manager = new LoobyAirplane(new CartoonPlaneModel())) {
    super(manager);
    this.manager = manager;

    this.manager.create();
  }

  update(delta) {
    super.update(delta);
  }
}

export class LoobyAirplane extends EngineAirplane{
  constructor(
    model = new CartoonPlaneModel(),
    animation = new AirplaneAnimation(),
    airplanePosition = new LobbyAirplanePosition()
  ) {
    super(model, animation, airplanePosition);

  }
  create() {
    super.create();
this.setPosition();
  }
  setPosition(){
       super.setPosition();
  }
}

export class LobbyAirplanePosition extends IEngineAirplanePosition {
  set(model) {
    const airplane = model.get();
    airplane.rotation.x = Math.PI / 14;
    airplane.castShadow = true;
    airplane.position.z = 4;
  }
}
