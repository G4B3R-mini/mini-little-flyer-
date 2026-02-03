/**
 * Responsável por descartar geometrias de objetos Three.js.
 */
export class GeometryDisposer {
  disposeGeometry(geometry) {
    if (geometry) geometry.dispose();
  }
}

/**
 * Responsável por remover objetos da hierarquia.
 */
export class HierarchyRemover {
  removeFromHierarchy(object, removeFunc) {
    if (object.parent) removeFunc(object);
  }
}

/**
 * Responsável por percorrer a cena e executar callbacks.
 */
export class SceneTraverser {
  traverseScene(scene, callback) {
    if (!scene) return;
    scene.traverse((object) => {
      callback(object);
    });
  }
}

/**
 * Responsável por descartar geometrias e materiais de todos os objetos filhos.
 */
export class ResourceCleanerChild {
  disposeAllChild(scene, traverser, geometryDisposer) {
    if (!scene) return;
    traverser.traverseScene(scene, (object) => {
      if (object.geometry) geometryDisposer.disposeGeometry(object.geometry);

      if (object.material) {
        if (Array.isArray(object.material)) {
         
          for (const material of object.material) {
            material.dispose();
          }
        } else {
          object.material.dispose();
        }
      }
    });
  }
}

/**
 * Responsável por remover todos os objetos filhos da cena.
 */
export class RemoveAllChild {
  removeAllChild(scene, traverser, remove) {
    const toRemove = [];
    traverser.traverseScene(scene, (obj) => {
      if (obj !== scene) toRemove.push(obj);
    });
    for (const obj of toRemove){
      remove(obj);  
    }
  }
}

/**
 * Responsável por limpar referências da cena.
 */
export class ClearScene {
  clearScene(scene) {
    scene.fog = null;
    scene.background = null;
    scene = null;
  }
}

/**
 * Responsável por remover um objeto de seu pai.
 */
export class Remove {
  remove(obj) {
    if (obj.parent) obj.parent.remove(obj);
  }
}

/**
 * Classe principal para gerenciar a limpeza de recursos da cena.
 */
export class SceneResourceCleaner {
  constructor(
    child = new RemoveAllChild(),
    removeAll = new ResourceCleanerChild(),
    cleaner = new ClearScene(),
    remove = new Remove(),
    traverser = new SceneTraverser(),
    geometryDisposer = new GeometryDisposer(),
    hierarchyRemover = new HierarchyRemover()
  ) {
    this.child = child;
    this.removeAll = removeAll;
    this.cleaner = cleaner;
    this.remove = remove;
    this.traverser = traverser;
    this.geometryDisposer = geometryDisposer;
    this.hierarchyRemover = hierarchyRemover;
  }

  removeAllChild(scene) {
    this.removeAll.removeAllChild(scene, this.traverser, this.remove.remove);
  }

  clearScene(scene) {
    this.cleaner.clearScene(scene);
  }

  disposeAllChild(scene) {
    if (!scene) return;
    this.removeAll.disposeAllChild(
      scene,
      this.traverser,
      this.geometryDisposer
    );
  }
}
