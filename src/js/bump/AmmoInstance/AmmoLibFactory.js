export class AmmoLibFactory {
  constructor(lib) {
    this.lib = lib;
  }

  /**
   * Retorna o CONSTRUTOR, não a instância
   * @param {string} ammoClass
   */
  getClass(ammoClass) {
    const AmmoCtor = this.lib._[ammoClass];

    if (!AmmoCtor) {
      throw new Error(`Classe Ammo inexistente: ${ammoClass}`);
    }

    return AmmoCtor;
  }

  /**
   * Cria instância (caso normal)
   */
  create(ammoClass, ...args) {
    const Ctor = this.getClass(ammoClass);
    return new Ctor(...args);
  }
}
