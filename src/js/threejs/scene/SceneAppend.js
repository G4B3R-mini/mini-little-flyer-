import * as THREE from "three";

/**
 * Interface para tipos de objetos que podem ser adicionados à cena.
 */
export class ObjectTypeInterface {
  constructor() {}
  appendToScene(...args) {
    throw new Error("method 'appendToScene' not implemented");
  }
}

/**
 * Responsável por adicionar um único objeto Three.js à cena.
 */
export class SceneAppend extends ObjectTypeInterface {
  appendToScene(parent, child) {
    parent.add(child);
  }
}

/**
 * Responsável por adicionar múltiplos objetos (array) à cena.
 */
export class SceneAppendObjects extends SceneAppend {
  appendToScene(parent, object) {
    if (Array.isArray(object)) {
      for (const obj of object) {
        super.appendToScene(parent, obj); 
      }
    }
  }
}

/**
 * Factory para determinar a estratégia correta de adição à cena.
 */
export class ObjectTypeFactory {
  getObjectType(object) {
    if (Array.isArray(object)) {
      return new SceneAppendObjects();
    }
    if (object instanceof THREE.Object3D) {
      return new SceneAppend();
    }
    return null;
  }
}
