
import { SphereMaterial, SphereMesh, SphereGeometry } from "./Sphere";
import { Group } from "../../../threejs/group";

export class SphereFactory {
  constructor(
    cls_geometry = SphereGeometry,
    cls_mesh=  SphereMesh,
    material = new SphereMaterial(),
    position = new SpherePosition(),
  ) {
    this.cls_geometry = cls_geometry;
    this.cls_mesh =cls_mesh
    this.material = material;
    this.position = position;
  }
  create(size=5, group=new Group()) {

    
    for (let i = 0; i < size; i++) {
      const sphereGeometry = new this.cls_geometry()
      const sphere = new this.cls_mesh(sphereGeometry, this.material);
      this.position.setPosition(sphere.get())
      group.add(sphere.get());
    }

    return group;
  }
}

export class SpherePosition {
  setPosition(
    sphere,
    x = Math.random() * 2 - 1,
    y = Math.random() * 0.5,
    z = Math.random() * 2 - 1
  ) {
  
    sphere.position.set(x, y, z);
  }
}
