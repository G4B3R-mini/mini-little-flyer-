import { IAnimation } from "./IAnimation.js";
import { RotationMananger } from "../RotationMananger.js";
import { Timer } from "../Timer.js";
import { MathAnimationManager } from "./MathAnimationManager.js";

export class AirplaneAnimation extends IAnimation {
  constructor(time = new Timer(), mathAnimation = new MathAnimationManager(), rotationManager = new RotationMananger()) {
    super()
    this.time = time;
    this.mathAnimation = mathAnimation;
    this.rotationManager =rotationManager
  }
  update(model, delta) {
    this.time.update(delta);
const t = this.time.get()
  const y =  this.mathAnimation.setY(t);
   const z = this.mathAnimation.setZ(t);
   const x = this.mathAnimation.setX(t);
  this. rotationManager.set(x,y,z,model)
  }
}