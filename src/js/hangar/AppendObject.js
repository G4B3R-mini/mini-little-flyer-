import { IAppendObject } from "../threejs/implementation/IGroup.js";
import * as THREE from "three";

export class AppendObject extends IAppendObject {
  add(obj_father, object) {
    if (!obj_father) return;
    if (Array.isArray(object)) {
      object.forEach((obj) => this.add(obj));
      return;
    }
    if (object instanceof THREE.Object3D) {
      obj_father.add(object);
    }
  }
}