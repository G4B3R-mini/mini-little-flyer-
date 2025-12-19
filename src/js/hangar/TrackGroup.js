import { IGroup } from "../threejs/implementation/IGroup.js";
import { AppendObject } from "./AppendObject.js";
import * as THREE from "three";

export class TrackGroup extends IGroup {
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