
import { IAnimation } from "../../world/Airplane/animate/IAnimation";
import { AirplaneMove } from "./move/airplaneMove";


export class GameAirplaneAnimation extends IAnimation{
constructor(airplaneMove=new AirplaneMove()){
super();
this.airplaneMove=airplaneMove;
}

    update(model, delta) {
        this.airplaneMove.update(model, delta); 
    }
        keyDOWN(key) {
    this.airplaneMove.keyDOWN(key);
  }
  keyUP(key) {
    this.airplaneMove.keyUP(key);
  }
}