import { Log } from "../Log.js";

import { Group } from "../threejs/implementation/group.js"; 
import { ModelLoaderAdapter } from "./loaders.js";

import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";





export class IModel {
  create() {
    throw new Error("Method 'load' not implemented");
  }
  get() {
    throw new Error("Method 'get' not implemented");
  }
}


export class CartoonPlaneModel extends IModel {
  constructor(manager = new CartoonPlaneManager()) {
    super();
    this.manager = manager;
  }
  create() {
    this.manager.load((m) => {});
  }
  get() {
    return this.manager.get();
  }
}

export class CartoonPlaneManager {
  constructor(
    loader = new CartoonPlaneloader(),
    resolver = new PromiseResolve(),
    groupManager = new GroupManager()
  ) {
    this.loader = loader;
    this.resolver = resolver;
    this.groupManager = groupManager;
  }
  load(finish) {
    const promise = this.loader.load();
    this.resolver.resolve(promise, (m) => {
      this.add(m);
    });
  }
  add(obj) {
    this.groupManager.add(obj);
  }
  get() {
    return this.groupManager.get();
  }
}

export class GroupManager {
  constructor(group = new Group()) {
    this.group = group;
  }
  add(object) {
    this.group.add(object.scene);
  }
  get() {
    return this.group.get();
  }
}

export class CartoonPlaneloader {
  constructor(loader = new ModelLoaderAdapter(new GLTFLoader())) {
    this.loader = loader;
  }

  load() {
    return this.loader.loadAsync("../../models/cartoon_plane.glb");
  }
}

export class PromiseResolve {
  resolve(promise, finish) {
    promise.then((result) => {
      finish(result);
    });
  }
}
