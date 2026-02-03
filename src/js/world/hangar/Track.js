import { IPlugin } from "../../windows/ScreenThrejs/IPlugin.js";
import * as THREE from "three";


import { TrackManager } from "./TrackManager.js";

export class TrackPlugin extends IPlugin {
  constructor(manager = new TrackManager()) {
    super(manager.get());
    this.manager = manager;
    this.manager.create();
  }

  update(delta) {
    this.manager.update(delta);
  }
}
