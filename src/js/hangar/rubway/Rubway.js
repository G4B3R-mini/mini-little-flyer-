import { Position, PositionManager } from "../../threejs/position.js";
import { Rubway3D } from "./Rubway3D .js";

export class Rubway {
  constructor(settings = {}, positionManager = new PositionManager()) {
    this.positionManager = positionManager;

    this.manager = new Rubway3D(settings);
    const pos = settings.position;
    console.log(pos)
    this.position(pos.x, pos.y, pos.z);
  }

  position(x, y, z) {
    this.positionManager.setPosition(this.manager, new Position(x, y, z));
  }
  get() {
    console.log(this.manager);
    return this.manager.get();
  }
}