import { Log } from "../Log.js";
import { IPlugin } from "../ScreenThrejs/IPlugin.js";
import { AirplaneAnimation } from "./animate/AirplaneAnimation.js";
import { MathAnimation } from "./animate/MathAnimation.js";
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
