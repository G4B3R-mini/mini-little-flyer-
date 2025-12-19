import * as THREE from "three";
import { ICameraThreejs } from "./implementation/ICameraThreejs.js";
import { AngleX, AngleXYZ, AngleY, AngleZ } from "./angle.js";

export class PerspectiveCamera extends ICameraThreejs{
  constructor(
    near = 75,
    far = window.innerWidth / window.innerHeight,
    fov = 0.1,
    aspect = 1000,
    lookAtManager= new LookAt(),
    positionManager=new AngleXYZ(),
    positionXManager=new AngleX(),
    positionYManager=new AngleY(),
    positionZManager=new AngleZ()
  ) {
    super()
    // Configuração da câmera
    this.camera = new THREE.PerspectiveCamera(near, far, fov, aspect);
    this.lookAtManager=lookAtManager
    this.positionManager=positionManager
    this.positionXManager=positionXManager
    this.positionYManager=positionYManager
    this.positionZManager=positionZManager
  }
  setPositionX(x) {
    this.positionXManager.set(this.camera, x);
   }
   setPositionY(y) {
    this.positionYManager.set(this.camera, y);
   }
   setPositionZ(z) {
    this.positionZManager.set(this.camera, z);
   }
  setposition(x, y, z) {
    this.camera.position.set(x, y, z); //(0, 2, 8.1);
  }
  setLookAt(x, y, z) {
    this.lookAtManager.set(this.camera, x, y, z);
  }
  get(){
    return this.camera
  }
}

export class LookAt{
  set(camera, x, y, z){
    camera.lookAt(x, y, z);
  }
}
