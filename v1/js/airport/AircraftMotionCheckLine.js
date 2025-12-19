import * as THREE from "three";
import { Object3DInterface } from "../_Pattherns/Object3DInterface.js";




class AircraftMotionCheckLine {
constructor(maxLines=8){
    this.items = []
    this.maxLines = maxLines
}
create(){
    for (let i = 0; i < this.maxLines; i++) {

    }
}
}





class AircraftMotionCheckLineItem extends Object3DInterface {
constructor(lineWidth,lineLength ){
      const lineGeometry = new THREE.BoxGeometry(
        lineWidth,
        3,
        lineLength
      );
      const lineMaterial = new THREE.MeshStandardMaterial({
        color: 0xffff,
        transparent: true,
        opacity: 0.02
      });
      lineMaterial.opacity = 0.05;
      const line = new THREE.Mesh(lineGeometry, lineMaterial);

      // Posiciona cada linha com base no espaçamento configurado
   //   line.position.set(0, -1.9, -10 + i * this.settings.lineSpacing);
      this.object3D = line
     // this.scene.add(line);
    
}
getObject() {
   return this.object3D
}

}