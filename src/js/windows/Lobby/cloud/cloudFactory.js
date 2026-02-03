
import { Group } from "../../../threejs/group";
import { SphereFactory } from "./SphereFactory";





export class CloudPosition {
  setPosition(
    cloud,
    x = Math.random() * 2 - 1,
    y = Math.random() * 0.5,
    z = Math.random() * 2 - 1
  ) {
  
    cloud.position.set(x, y, z);
  }
}
export class CloudsGeL {
  constructor(lista, group){
    this.group =group
    this.lista = lista
  }
}
export class CloudFactory {
  constructor(
    position = new CloudPosition(),
    sphereFactory= new SphereFactory()
  ) {

    this.position = position;
    this.sphereFactory= sphereFactory
  }
  /** 
   * @returns {CloudsGeL}
  */
  create(size=15, group=new Group()) {
    // Criar nuvens
    const clouds = []
    for (let i = 0; i < size; i++) {
      const cloud = this.sphereFactory.create().get();
      cloud.position.set(
        Math.random() * 40 - 20,
        Math.random() * 8 - 2,
        Math.random() * 40 - 30
      );
      cloud.userData.speed = Math.random() * 0.01 + 0.005;
      group.add(cloud)
      clouds.push(cloud)
  }
  return new CloudsGeL(clouds, group.get())

  }}
