/*
  class ammo {
    hello(){
        console.log("hello ammo");
    }
    boaTarde(){
        console.log("boa tarde ammo");
    }
}

class factory {
    #ammoInstance = null;
    constructor(){
        this.#ammoInstance = new ammo();
    }
    get _(){
        return this.#ammoInstance;
    }   
}


const f = new factory();
const a = f.hello();
const b = f._.boaTarde();
*/


export class AmmoFactoryExtendable {
    name = null
  constructor(adapter) {
  
    this.ammo = adapter.ammo;
     // if (!this.name) throw new Error("Nome da extensão não definida");
  }
}

export class BumpAmmoFacadeExtends {
  /**
   *
   * @param {BumpAmmoFacade} facade
   * @param {BumpAmmoFacadeExtends} instance
   * @param {string} name
   */
  add(facade, instance, name) {
    facade[name] = instance;
  }
}

class exemploEnds extends AmmoFactoryExtendable {
    name = "exemple"
 constructor(adapter) {
    
     super(adapter);
     console.log(this.name);
 }  
}

class Exemple {
constructor() {
    this.adapter = { ammo: {} };
    this.extends = new BumpAmmoFacadeExtends();
}
}
const exempleInstance = new exemploEnds({ ammo: {} });
const exempleFacade = new Exemple();
exempleFacade.extends.add(exempleFacade, exempleInstance, exempleInstance.name);
console.log(exempleFacade.exemple);