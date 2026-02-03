import * as THREE from "three";
import { IGeometry } from "../../../threejs/contract/IGeometry";
import { IMaterial } from "../../../threejs/contract/IMaterial";
import { IMesh } from "../../../threejs/contract/IMesh";

export class SphereGeometry extends IGeometry {
  constructor(radius = 1, widthSegments = 8, heightSegments = 8) {
    super();
    this.geometry = new THREE.SphereGeometry(
      radius,
      widthSegments,
      heightSegments
    );
  }
  get() {
    return this.geometry;
  }
}

export class SphereMesh extends IMesh {
  constructor(
    geometry = new SphereGeometry(),
    material = new SphereMaterial()
  ) {
    super();

    this.mesh = new THREE.Mesh(geometry.get(), material.get());
  }
  get() {
    return this.mesh;
  }
}

export class SphereMaterial extends IMaterial {
  constructor(
    color = 0xffffff,
    roughness = 1,
    transparent = true,
    opacity = 0.8
  ) {
    super();
    this.cloudMaterial = new THREE.MeshStandardMaterial({
      color: color,
      roughness: roughness,
      transparent: transparent,
      opacity: opacity,
    });
  }
  get() {
    return this.cloudMaterial;
  }
}
