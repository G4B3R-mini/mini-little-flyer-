import Ammo from "../ammo/ammo-es";
import { IBumpPhysicLib } from "./IBumpPhysicLib";

export class BumpPhysicLib extends IBumpPhysicLib {
  #ammo = null;

  async load() {
    this.#ammo = await Ammo();
    
  }

  get _() {
    if (!this.#ammo) throw new Error("Ammo não carregado");
    return this.#ammo;
  }
}
