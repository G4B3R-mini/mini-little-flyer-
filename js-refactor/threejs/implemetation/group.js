import * as THREE from "three";
import { IGroup } from "./IGroup.js";


export class Group  extends IGroup{
  constructor(append = new AppendObject()) {
    super()
    this.group = new THREE.Group();
    this.append = append;
  }
  add(object) {
    this.append.add(this.group, object);
  }
  get() {
    return this.group;
  }
}

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