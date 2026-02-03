import { AmmoAdapter } from "./AmmoAdapter";
import { AmmoBodyFactory } from "./BumpAmmoFactorys/AmmoBodyFactory";
import { AmmoMathFactory } from "./BumpAmmoFactorys/AmmoMathFactory";
import { AmmoShapeFactory } from "./BumpAmmoFactorys/AmmoShapeFactory";
import { AmmoWorldFactory } from "./BumpAmmoFactorys/AmmoWorldFactory";
import { BumpPhysicLib } from "./BumpAmmoLib";

export class AmmoUtils {
  constructor(adapter) {
    this.ammo = adapter.ammo;
  }
  /**
   * Converte um objeto Ammo para um tipo específico
   * @param {*} object - Objeto a ser convertido
   * @param {*} toType - Tipo de destino (ex: Ammo.btRigidBody)
   * @returns {*} Objeto convertido para o tipo especificado
   */
  castObject(object, toType) {
    return this.ammo.castObject(object, toType);
  }
}

/**
 * Facade para simplificar o acesso às funcionalidades do Ammo.js (Bullet Physics).
 * Fornece métodos convenientes para criar e manipular objetos físicos.
 * @class BumpAmmoFacade
 *
 * @example
 * import { BumpPhysicLib } from "./AmmoInstance/BumpAmmoLib";
 * import { BumpAmmoFacade } from "./AmmoInstance/BumpAmmoFacade";
 *
 * // Inicializa a biblioteca física
 * const physicLib = new BumpPhysicLib();
 *
 * // Cria a fachada do Ammo
 * const ammoFacade = new BumpAmmoFacade(physicLib);
 *
 * // Agora você pode usar ammoFacade.math, ammoFacade.shape, ammoFacade.body, ammoFacade.world e ammoFacade.utils
 *
 * @example
 * // Criando um vetor 3D
 * const vector = ammoFacade.math.vector3(1, 2, 3);
 *
 * // Criando uma forma de caixa
 * const boxShape = ammoFacade.shape.boxShape(vector);
 */
export class BumpAmmoFacade {
  /**
   * Cria uma nova instância do BumpAmmoFacade
   * @param {BumpPhysicLib} lib - Instância da biblioteca Ammo carregada
   */
  constructor(lib) {
    this.adapter = new AmmoAdapter(lib);
    this.math = new AmmoMathFactory(this.adapter);
    this.shape = new AmmoShapeFactory(this.adapter);
    this.body = new AmmoBodyFactory(this.adapter);
    this.world = new AmmoWorldFactory(this.adapter);
    this.utils = new AmmoUtils(this.adapter);
  }
}

export class AmmoFactoryExtendable {
  constructor(adapter) {
    this.ammo = adapter.ammo;
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
