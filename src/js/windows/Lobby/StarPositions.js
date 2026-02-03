import * as THREE from "three";
import { IPlugin } from "../ScreenThrejs/IPlugin";

import { IMaterial } from "../../threejs/contract/IMaterial";
import { IGeometry } from "../../threejs/contract/IGeometry";
import { IMesh } from "../../threejs/contract/IMesh";
import { Group } from "../../threejs/group";


export class StarMaterial extends IMaterial{
  constructor(color = 0xffffff, size = 0.1, transparent = true, opacity = 0.6) {
    super();
    this.starMaterial = new THREE.PointsMaterial({
      color: color,
      size: size,
      transparent: transparent,
      opacity: opacity,
    });
  }
  get() {
    return this.starMaterial;
  }
}
export class StarGeometry extends IGeometry{
  constructor(starpositionst = new StarPositions()) {
    super();
    this.starGeometry = new THREE.BufferGeometry();
    this.starPositions = starpositionst;
  }
  get() {
    return this.starGeometry;
  }
  setAttributes(starPositions = new GenerateStarPositions().generate()) {
    this.starPositions.setAttributes(this.starGeometry, starPositions);
  }
}

export class GenerateStarPositions {
  generate() {
    const starPositions = [];

    for (let i = 0; i < 200; i++) {
      starPositions.push(
        Math.random() * 100 - 50,
        Math.random() * 50,
        Math.random() * 100 - 80
      );
    }
    return starPositions;
  }
}
/**
 *
 */
export class StarPositions {
  setAttributes(
    starGeometry,
    starPositions = new GenerateStarPositions().generate()
  ) {
    starGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(starPositions, 3)
    );
  }
}
export class StarsFactory {
  constructor() {}
}

export class StarField  extends IMesh{
  constructor(material, geometry) {
    super();
    this.starField = new THREE.Points(geometry.get(), material.get());
  }
  get() {
    return this.starField;
  }
}

export class StarsOrchestrator {
  constructor(
    group = new Group(),
    geometry = new StarGeometry(),
    material = new StarMaterial(),
    generateStarPositions = new  GenerateStarPositions()
  ) {
    this.scene = group;
    this.geometry = geometry;
    this.material = material;
    this.generateStarPositions = generateStarPositions;
    this.create();
  }
  create() {
    const starGeometry = this.geometry;
    const starPositions = this.generateStarPositions.generate();
    starGeometry.setAttributes(starPositions);
    const starMaterial = this.material;
    const starField = new StarField(starMaterial, starGeometry);
    this.scene.add(starField.get());
  }
  update() {}
  get() {
    return this.scene.get();
  }
}
export class StarsPlugin extends IPlugin {
  constructor(stars = new StarsOrchestrator()) {
    super(stars.get());
    this.stars = stars;
  }
  update(time) {
    this.stars.update(time);
  }
}
