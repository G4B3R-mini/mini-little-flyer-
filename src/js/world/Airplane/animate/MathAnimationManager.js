import { MathAnimation } from "./MathAnimation.js";
import { MathAnimationX, MathAnimationY, MathAnimationZ } from "../MathPosition.js";

export class MathAnimationManager {
  constructor(
    math = new MathAnimation(),
    mathRotationY = new MathAnimationY(),
    rotationZ = new MathAnimationZ(),
    rotationX = new MathAnimationX()
  ) {
    this.math = math;
    this.mathRotationY = mathRotationY;
    this.rotationZ = rotationZ;
    this.rotationX = rotationX;
  }
  setY(time) {
    return this.mathRotationY.set(this.math, time);
  }
  setZ(time) {
    return this.rotationZ.set(this.math, time);
  }
  setX(time) {
    return this.rotationX.set(this.math, time);
  }
}
