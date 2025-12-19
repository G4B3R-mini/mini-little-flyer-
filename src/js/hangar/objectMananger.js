import { Position, PositionManager } from "../threejs/position";

export class ObjectManager {
  constructor(positionManager = new PositionManager()) {
    this.positionManager = positionManager;
  }
  setPosition(x, y, z) {
    this.positionManager.setPosition(this.line, new Position(x, y, z));
  }
}