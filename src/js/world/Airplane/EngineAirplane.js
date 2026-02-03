
import { Airplane } from "./Airplane";
import { AirplaneAnimation } from "./animate/AirplaneAnimation";
import { IEngineAirplanePosition } from "./contract/IEngineAirplanePosition";
import { CartoonPlaneModel } from "./Model";
import * as THREE from "three";


/**
 * @extends {Airplane} 
 * 
 */
export class EngineAirplane extends Airplane{
  /**
   * 
   * @param {CartoonPlaneModel} model classe do modelo
   * @param {AirplaneAnimation} animation 
   * @param {IEngineAirplanePosition } airplanePosition 
   */
  constructor(
    model = new CartoonPlaneModel(),
    animation = new AirplaneAnimation(),
    airplanePosition = new IEngineAirplanePosition()
  ) {
    super(model, animation);
    this.airplanePosition = airplanePosition;
  }
  /**
   * create the airplane
   */
  create() {
    super.create();
  }
  /**
   * sets the airplane position
   */
  setPosition(){
        this.airplanePosition.set(this.model); 
  }
}

