import * as THREE from "three";
import { IPlugin } from "../ScreenThrejs/IPlugin";
import { IAppendObject, IGroup } from "../../threejs/contract/IGroup";
import { SphereFactory } from "./cloud/SphereFactory";
import { CloudFactory } from "./cloud/cloudFactory";

export class CloudGroup extends IGroup {
  constructor(append = new AppendCloud()) {
    super();
    this.group = new THREE.Group();
    this.append = append;
  }
  add(cloudMesh) {
    this.append.add(this, cloudMesh);
  }
  get() {
    return this.group;
  }
}

export class AppendCloud extends IAppendObject {
  add(cloudGroup, cloudMesh) {
    cloudGroup.get().add(cloudMesh.get());
  }
}



export class ForEach {
  forEach(callback, array) {
    for (const item of array){
      callback(item)
    }
  }
}

export class CloudPosition {
  setPosition(
    cloud
  ) {
      cloud.position.x += cloud.userData.speed;
      if (cloud.position.x > 25) {
        cloud.position.x = -25;
      }
  }
}
export class CloudUpdater {
  constructor( cloudPosition = new CloudPosition()) {
    this.cloudPosition = cloudPosition;
  }
  update( clouds) {
    for (const cloud of clouds){
      this.cloudPosition.setPosition(cloud);
    }
  }
}


export class Clouds {
  constructor(
    list = new Array(),
    group = new CloudGroup(),
    cloudFactory = new CloudFactory(),
    cloudUpdater = new CloudUpdater(),
  ) {
    this.clouds = list;
    this.cloudFactory = cloudFactory;
    this.cloudGroup = group;
    this.scene = new THREE.Group();
    this.cloudUpdater = cloudUpdater;
    this.create();
  }

  create() {
    // Criar nuvens
    const clouds = this.cloudFactory.create();
    this.clouds = clouds.lista;
    this.scene.add(clouds.group);
  }

  update() {
    this.cloudUpdater.update(this.clouds);
  }
  get() {
    return this.scene;
  }
}

export class CloudPlugin extends IPlugin {
  constructor(clouds = new Clouds()) {
    super(clouds.get());
    this.cloudsManager = clouds;
  }

  update(time) {
    this.cloudsManager.update(time);
  }
}
