import { ObjectBase } from "./ObjectBase.js";

export class Player extends ObjectBase {
  constructor() {
    super()
    this.pos = { x: 0, y: 0 };
  }
  create(ctx) {
    this.ctx = ctx;
    this.draw();
    return this;
  }
  draw() {
    super.draw( "#f0db4f")
  }
  update() {
    this.draw()
  }
}
