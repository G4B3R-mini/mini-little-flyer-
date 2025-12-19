

/*
      if (this.airplane) {
        this.airplane.position.y = Math.sin(this.time * 2) * 0.2;
        this.airplane.rotation.z = Math.sin(this.time * 1.5) * 0.05;
        this.airplane.rotation.x = Math.sin(this.time * 1.2) * 0.03;

        // Girar hélice
        const propeller = this.airplane.userData.propeller;
        if (propeller && propeller.userData.isActive) {
          propeller.rotation.x += 0.5;
        }

*/

export class Animation {
    setPosition(pos, model){
        model.position.set(pos.x,pos.y, pos.z)
    }
}