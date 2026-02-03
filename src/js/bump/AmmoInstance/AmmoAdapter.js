export class AmmoAdapter {
  constructor(lib) {
    if (!lib || !lib._) {
      throw new Error("BumpPhysicLib não inicializada");
    }
    this.ammo = lib._;
  }
}
