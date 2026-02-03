

export class AmmoGhostFactory {
  constructor(adapter) {
    this.ammo = adapter.ammo;
  }

  ghostObject(shape) {
    const ghost = new this.ammo.btGhostObject();
    ghost.setCollisionShape(shape);
    return ghost;
  }
}

