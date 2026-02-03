import { IAnimation } from "./IAnimation.js";
import { PositionManager } from "../positionManager.js";
import { Timer } from "../Timer.js";
import { MathAnimationManager } from "./MathAnimationManager.js";
import * as THREE from "three";

export class AirplaneAnimation extends IAnimation {
  /**
   * 
   * @param {Timer} time 
   * @param {MathAnimationManager} mathAnimation 
   * @param {PositionManager} positionanager 
   */
  constructor(time = new Timer(), mathAnimation = new MathAnimationManager(), positionanager = new PositionManager()) {
    super()
    this.time = time;
    this.mathAnimation = mathAnimation;
    this.positionanager =positionanager
  }
  /**
   * 
   * @param {THREE.Object3D} model 
   * @param {number} delta 
   */
  update(model, delta) {
    this.time.update(delta);
const t = this.time.get()
  const y =  this.mathAnimation.setY(t);
   const z = this.mathAnimation.setZ(t);
   const x = this.mathAnimation.setX(t);
  this. positionanager.set(x,y,z,model)
  }
}