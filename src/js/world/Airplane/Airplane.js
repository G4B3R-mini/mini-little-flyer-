
import { IPlugin } from "../../windows/ScreenThrejs/IPlugin.js";
import { AirplaneAnimation } from "./animate/AirplaneAnimation.js";

import { CartoonPlaneModel, IModel } from "./Model.js";

export class AirplanePlugin extends IPlugin {
  /**
   * 
   * @param {Airplane} manager 
   */
  constructor(manager = new Airplane(new CartoonPlaneModel())) {
    super(manager.get());
    this.manager = manager;
    this.manager.create();
  }
/**
 * 
 * @param {number} delta 
 */
  update(delta) {
    this.manager.update(delta);
  }
}

/**
 * @param {}
 */
export class Airplane {
  /**
   * 
   * @param {IModel} model 
   * @param {IAnimation} animation 
   */
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

  /**
   * 
   * @param {number} delta 
   * @returns 
   */
  update(delta) {
    const model = this.model.get();

    if (!model) return;
    this.animation.update(model, delta);
  }
}
