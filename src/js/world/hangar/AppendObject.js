import { IAppendObject } from "../../threejs/contract/IGroup.js";
import * as THREE from "three";

export class AppendObject extends IAppendObject {
  add(obj_father, object) {
    if (!obj_father) return;
    if (Array.isArray(object)) {
      for (const obj of object) {
        this.add(obj_father, obj);
      }
      return;
    }
    if (object instanceof THREE.Object3D) {
      obj_father.add(object);
    }
  }
}
