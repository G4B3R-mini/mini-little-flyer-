import { Log } from "../Log.js";
import { IPlugin } from "../ScreenThrejs/IPlugin.js";
import { CartoonPlaneModel } from "./Model.js";

export class AirplanePlugin extends IPlugin {
  constructor(manager = new Airplane(new CartoonPlaneModel())) {
    super(manager.get());
    this.manager = manager;
    this.manager.create();
  }

  update(delta) {
    this.manager.update(delta);
  }
}

/**
 * @param {}
 */
export class Airplane {
  constructor(
    model = new CartoonPlaneModel(),
    animation = new AirplaneAnimation()
  ) {
    this.model = model;
    this.animation = animation;
  }
  get() {
    return this.model.get();
  }
  create() {
    this.model.create();
  }
  update(delta) {
    const model = this.model.get();

    if (!model) return;
    this.animation.update(model, delta);
  }
}

export class IAnimation {
  update() {
    throw new Error("Method 'update' not implemented");
  }
}

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
export class MathAnimationManager {
  constructor(
    math = new MathAnimation(),
    mathRotationY = new MathRotationY(),
    rotationZ = new MathRotationZ(),
    rotationX = new MathRotationX()
  ) {
    this.math = math;
    this.mathRotationY = mathRotationY;
    this.rotationZ = rotationZ;
    this.rotationX = rotationX;
  }
  setY(time) {
  return  this.mathRotationY.set(this.math, time);
  }
  setZ(time) {
   return this.rotationZ.set(this.math, time);
  }
  setX(time) {
   return this.rotationX.set(this.math, time);
  }
}
export class RotationMananger {
  set(x,y,z, model){
  model.position.y = y
   model.position.x =x
    model.position.z =z
  }
}
export class MathRotationX {
  set(math, time) {
  return    math.sin(time, 1.2, 0.03);
  }
}

export class MathRotationY {
  set(math, time) {
  return  math.sin(time, 2, 0.2);
  }
}

export class MathRotationZ {
  set(math, time) {
  return  math.sin(time, 1.5, 0.05);
  }
}
export class MathAnimation {
  sin(time, tu, tr) {
    
    return Math.sin(time * tu) * tr;
  }
}
export class Timer {
  constructor() {
    this.time = 0;
  }
  update(delta) {
    this.time += delta;
  }
  get() {
    return this.time;
  }
}
