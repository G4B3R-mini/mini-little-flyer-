import * as THREE from "three"; 

export class IEngineAirplanePosition {
  /**
   * @param {CartoonPlaneModel} model
 * @param {THREE.Vector3} vec
 */
  set(model, vec) {
    throw new Error("Error: Method 'set' not implemented");
  }
}

export class Vector3 {
  constructor(x = 0, y = 0, z = 0) {
    this.setPosition = new THREE.Vector3(x, y, z);
  }
}