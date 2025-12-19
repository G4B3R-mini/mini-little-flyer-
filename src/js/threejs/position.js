export class Position {
  constructor(x, y, z) {
    this.vector3D = { x: x, y: y, z: z };
  }
  get() {
    return this.vector3D;
  }
}
export class PositionManager {
  setPosition(obj, position = new Position(0, 0, 0)) {
    if (!position) return;
    const P = position.get();
    obj.get().position.set(P.x, P.y, P.z);
  }
}