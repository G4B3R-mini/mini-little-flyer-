import { Position, PositionManager } from "../../../threejs/position.js";
import { ColorManager } from "../ColorManager.js";
import { Line3D } from "./Line3D.js";
import { LineAnimation } from "./LineAnimation.js";
import { LineEvent } from "./LineEvent.js";

export class Line {
  constructor(
    settings = {},
    positionManager = new PositionManager(),
    eventManager = new LineEvent(),
    animationmanager = new LineAnimation(),
    colorManager = new ColorManager()
  ) {
    this.lineManager = new Line3D(settings);
    this.positionManager = positionManager;
    this.eventManager = eventManager;
    this.animationmanager = animationmanager;
    this.colorManager = colorManager;
  }
  get() {
    return this.lineManager.get();
  }
  setPosition(x, y, z) {
    this.positionManager.setPosition(this.lineManager, new Position(x, y, z));
    return this;
  }
  update(delta) {
    this.animationmanager.update((color) => {
      this.setColor(color);
    }, delta);
  }
  setColor(color) {
    this.colorManager.setColor(this.get(), color);
  }
}
