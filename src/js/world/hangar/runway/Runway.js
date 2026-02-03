import { Position, PositionManager } from "../../../threejs/position.js";
import { Runway3D } from "./Runway3D.js";

export class Runway {
  constructor(settings = {}, positionManager = new PositionManager()) {
    this.positionManager = positionManager;

    this.manager = new Runway3D(settings);
    const pos = settings.position;

    this.position(pos.x, pos.y, pos.z);
  }

  position(x, y, z) {
    this.positionManager.setPosition(this.manager, new Position(x, y, z));
  }
  get() {
    return this.manager.get();
  }
}